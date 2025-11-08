import React from "react";
import { FaDownload, FaUserAlt, FaClock, FaTag } from "react-icons/fa";
import { Link } from "react-router";

const ModelCard = ({ model }) => {
  const {
    _id,
    name,
    category,
    description,
    thumbnailUrl,
    created_by,
    created_at,
  } = model;

  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-500 rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.03] hover:shadow-xl transition-all duration-300 border border-indigo-300/40">
      <div className="relative">
        <img
          src={thumbnailUrl}
          alt={name}
          className="w-full h-50 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="p-3 text-white">
        <h2 className="text-lg font-semibold truncate">{name}</h2>
        <p className="text-xs text-indigo-200 italic">{category}</p>
        <p className="text-xs text-indigo-100 mt-1 line-clamp-2">{description}</p>

        <div className="mt-2 flex justify-between items-center text-[11px] text-indigo-200">
          <div className="flex items-center gap-1">
            <FaUserAlt className="text-blue-200" />
            <span className="truncate">{created_by}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="text-blue-200" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <Link to={`/modelDetails/${_id}`} className="mt-3 w-full flex items-center justify-center gap-1 cursor-pointer bg-white/20 backdrop-blur-sm text-white text-sm py-1.5 rounded-lg hover:bg-white/30 transition">
          {/* <FaDownload className="text-cyan-200" /> */}
          <span>View</span>
        </Link>
      </div>
    </div>
  );
};

export default ModelCard;
