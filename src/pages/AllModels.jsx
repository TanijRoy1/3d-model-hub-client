import React, { useEffect, useState } from "react";
import MyContainer from "../components/MyContainer";
import useAxios from "../hooks/useAxios";
import ModelCard from "../components/ModelCard";
import Spinner from "../components/Spinner";

const AllModels = () => {
  const axiosPublic = useAxios();
  const [models, setModels] = useState([]);
  const [modelLoading, setModelLoading] = useState(true);

  useEffect(() => {
    axiosPublic.get("/models").then((data) => {
      setModels(data.data);
      setModelLoading(false);
    });
  }, [axiosPublic]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setModelLoading(true);
    axiosPublic(`/search?search=${searchText}`).then(data => {
      setModels(data.data);
      setModelLoading(false);
    })
  }

  return (
    <MyContainer className={`py-10`}>
      <h1 className="text-2xl font-bold text-center text-accent">
        All Models{" "}
        <span className="text-xs font-semibold text-accent-content">
          {models.length} models found
        </span>
      </h1>

      <form onSubmit={handleSearch} className="flex items-center justify-center gap-2 py-4">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" name="search" required placeholder="Search" />
        </label>
        <button type="submit" className="btn btn-primary">
          {modelLoading? "Searching..." : "Search"}
        </button>
      </form>

      {modelLoading ? (
        <Spinner></Spinner>
      ) : (
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mt-6">
          {models.map((model) => (
            <ModelCard key={model._id} model={model}></ModelCard>
          ))}
        </div>
      )}
    </MyContainer>
  );
};

export default AllModels;
