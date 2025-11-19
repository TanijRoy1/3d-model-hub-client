import React from "react";
import {
  FaDownload,
  FaUserAlt,
  FaClock,
  FaTag,
  FaTrashAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyDownload = ({ model, models, setModels }) => {
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    name,
    category,
    description,
    thumbnailUrl,
    created_by,
    created_at,
  } = model;

  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
  const handleDeleteModel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/myDownloads/${id}`).then((data) => {
          if (data.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Downloaded Model has been deleted.",
              icon: "success",
            });

            const remaining = models.filter((model) => model._id !== id);
            setModels(remaining);
          }
        });
      }
    });
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-700 via-violet-700 to-indigo-600 rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
      <div className="relative">
        <img
          src={thumbnailUrl}
          alt={name}
          className="w-full h-52 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <button
          onClick={() => handleDeleteModel(_id)}
          className="absolute top-3 cursor-pointer right-3 bg-gradient-to-r from-rose-600 to-red-500 hover:opacity-90 text-white p-2 rounded-full shadow-md transition"
          title="Delete Model"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>

      <div className="p-4 text-white flex flex-col justify-between">
        <div>
          
            <h2 className="text-lg font-semibold truncate  transition">
              {name}
            </h2>
          
          <p className="text-xs text-indigo-200 italic flex items-center gap-1 mt-1">
            <FaTag className="text-indigo-300" />
            {category}
          </p>

          <p className="text-xs text-indigo-100 mt-2 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex justify-between items-center text-[11px] text-indigo-200">
            <div className="flex items-center gap-1 truncate">
              <FaUserAlt className="text-indigo-300" />
              <span>{created_by}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="text-indigo-300" />
              <span>{formattedDate}</span>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default MyDownload;
