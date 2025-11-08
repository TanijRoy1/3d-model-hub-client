import React, { useEffect, useState } from "react";
import { FaEdit, FaDownload, FaClock, FaUserAlt, FaTag } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
import { Link, useParams } from "react-router";
import MyContainer from "../components/MyContainer";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ModelDetails = () => {
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [model, setModel] = useState({});
  const [modelLoading, setModelLoading] = useState(true);
  const { user } = useAuth();
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    axiosPublic.get(`/models/${id}`).then((data) => {
      setModel(data.data);
      setModelLoading(false);
    });
  }, [axiosPublic, id, refetch]);

  const handleDownload = () => {
    const newModel = {
      name: model.name,
      category: model.category,
      description: model.description,
      thumbnailUrl: model.thumbnailUrl,
      created_by: model.created_by,
      created_at: model.created_at,
      downloads: model.downloads,
      downloaded_by: user.email,
    };

    axiosSecure
      .post(`/downloads/${id}`, newModel)
      .then((data) => {
        // console.log("after downloaded", data.data);
        if (data.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Model has been Downloaded",
            showConfirmButton: false,
            timer: 1500,
          });
          setRefetch(!refetch);
        }
      });
  };

  const {
    _id,
    name,
    category,
    description,
    thumbnailUrl,
    created_by,
    created_at,
    downloads,
  } = model;

  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (modelLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <MyContainer className="py-10">
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-indigo-700 via-violet-700 to-blue-600 text-white rounded-2xl shadow-2xl overflow-hidden border border-indigo-400/30 transition-all duration-300 hover:shadow-indigo-500/20">
        <div className="relative">
          <img
            src={thumbnailUrl}
            alt={name}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          <Link
            to={`/updateModel/${_id}`}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300"
          >
            <FaEdit className="text-cyan-300" />
            Update
          </Link>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">{name}</h1>
            <div className="flex items-center gap-2 text-indigo-200 text-sm mt-1">
              <FaTag className="text-blue-200" />
              <span className="capitalize">{category}</span>
            </div>
          </div>

          <p className="text-indigo-100 leading-relaxed">{description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-indigo-100 mt-4">
            <div className="flex items-center gap-2">
              <FaUserAlt className="text-blue-200" />
              <span>{created_by}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-blue-200" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaDownload className="text-blue-200" />
              <span>{downloads} Downloads</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button
              onClick={handleDownload}
              className="flex items-center cursor-pointer gap-2 px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-300"
            >
              <FaDownload className="text-cyan-300" />
              Download Model
            </button>

            <Link
              to={`/updateModel/${_id}`}
              className="flex items-center gap-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg shadow-md transition-all duration-300"
            >
              <FaEdit />
              Update Model
            </Link>
          </div>
        </div>
      </div>
    </MyContainer>
  );
};

export default ModelDetails;
