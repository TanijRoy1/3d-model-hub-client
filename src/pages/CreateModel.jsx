import React from "react";
import { FaUpload, FaPlus } from "react-icons/fa";
import MyContainer from "../components/MyContainer";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const CreateModel = () => {
    const axiosPublic = useAxios();
    const navigate = useNavigate();
    const {user} = useAuth();

    const handleCreateModel = (e) => {
        e.preventDefault();
        const newModel = {
          name: e.target.name.value,
          category: e.target.category.value,
          thumbnailUrl: e.target.thumbnailUrl.value,
          description: e.target.description.value,
          created_by: e.target.created_by.value,
          created_at: new Date(),
          downloads: 0,
        };
        axiosPublic.post("/models", newModel)
         .then(data => {
            // console.log("after create a model", data.data);
            if(data.data.insertedId){
                Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "Your Model has been created",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                navigate("/");
            }
         })
    };
  return (
    <MyContainer>
      <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-br from-pink-600 via-red-600 to-orange-500 text-white p-8 rounded-2xl shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
          <FaPlus /> Create New Model
        </h1>

        <form onSubmit={handleCreateModel} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Model Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter model name"
              required
              className="w-full p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              placeholder="e.g. Vehicle, Character, Environment"
              required
              className="w-full p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Write a short description..."
              required
              className="w-full p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Thumbnail URL
            </label>
            <input
              type="url"
              name="thumbnailUrl"
              placeholder="https://example.com/thumbnail.jpg"
              required
              className="w-full p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Created By</label>
            <input
              type="email"
              name="created_by"
              defaultValue={user.email}
              readOnly
              placeholder="artist@example.com"
              required
              className="w-full p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:opacity-90 transition disabled:opacity-60"
          >
            <FaUpload />
            Create Modal
          </button>
        </form>
      </div>
    </MyContainer>
  );
};

export default CreateModel;
