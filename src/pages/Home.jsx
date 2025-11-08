import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import MyContainer from "../components/MyContainer";
import useAxios from "../hooks/useAxios";
import ModelCard from "../components/ModelCard";
import { Link } from "react-router";
import { RiGalleryView2 } from "react-icons/ri";
import Spinner from "../components/Spinner";

const Home = () => {
  const axiosPublic = useAxios();
  const [models, setModels] = useState([]);
  const [modelLoading, setModelLoading] = useState(true);

  useEffect(() => {
    setModelLoading(true);
    axiosPublic.get("/latestModels").then((data) => {
      setModels(data.data);
      setModelLoading(false);
    });
  }, [axiosPublic]);

  return (
    <div>
      <Banner></Banner>

      <MyContainer className={`py-8`}>
        <h1 className="text-2xl font-bold text-center text-accent">
          Latest Models{" "}
          <span className="text-xs font-semibold text-accent-content">
            {models.length} models found
          </span>
        </h1>

        {modelLoading ? (
          <Spinner></Spinner>
        ) : (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mt-6">
            {models.map((model) => (
              <ModelCard key={model._id} model={model}></ModelCard>
            ))}
          </div>
        )}
        <div className="mt-10 flex justify-center">
          <Link to="/allModels" className="btn btn-primary">
            <RiGalleryView2 />
            View All
          </Link>
        </div>
      </MyContainer>
    </div>
  );
};

export default Home;
