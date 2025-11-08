import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
import { useNavigate, useParams } from "react-router";
import MyContainer from "../components/MyContainer";
import Swal from "sweetalert2";

const UpdateModel = () => {
  const axiosPublic = useAxios();
  const { id } = useParams();
  const [model, setModel] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic.get(`/models/${id}`).then((data) => setModel(data.data));
  }, [axiosPublic, id]);

  const handleUpdateModel = (e) => {
    e.preventDefault();
    const updateModel = {
      name: e.target.name.value,
      category: e.target.category.value,
      thumbnailUrl: e.target.thumbnailUrl.value,
      description: e.target.description.value,
    };
    axiosPublic.patch(`/models/${id}`, updateModel).then((data) => {
      // console.log("after updated model", data);
      if (data.data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "The Model has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    });
  };

  return (
    <MyContainer className={`py-10`}>
      <form
        onSubmit={handleUpdateModel}
        className="max-w-xl mx-auto bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-600 text-white p-6 rounded-2xl shadow-xl border border-indigo-300/30 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Update Model</h2>

        <div>
          <label className="block text-sm mb-1">Model Name</label>
          <input
            type="text"
            name="name"
            defaultValue={model?.name}
            className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            placeholder="Enter model name"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Category</label>
          <input
            type="text"
            name="category"
            defaultValue={model?.category}
            className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            placeholder="Enter category"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnailUrl"
            defaultValue={model?.thumbnailUrl}
            className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            placeholder="Enter image URL"
          />
          {model?.thumbnailUrl && (
            <img
              src={model.thumbnailUrl}
              alt="Preview"
              className="mt-2 h-28 w-full object-cover rounded-lg border border-white/20"
            />
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={model?.description}
            rows="4"
            className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 resize-none"
            placeholder="Enter model description"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-xl cursor-pointer bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          <FaSave />
          Update Model
        </button>
      </form>
    </MyContainer>
  );
};

export default UpdateModel;
