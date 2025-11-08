import React, { useEffect, useState } from "react";
import MyContainer from "../components/MyContainer";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import MyModelCard from "../components/MyModelCard";
import Spinner from "../components/Spinner";

const MyModels = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [models, setModels] = useState([]);
  const [modelLoading, setModelLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    axiosSecure.get(`/myModels?email=${user?.email}`).then((data) => {
      setModels(data.data);
      setModelLoading(false);
    });
  }, [axiosSecure, loading, user]);

  if(modelLoading){
    return <Spinner></Spinner>;
  }

  return (
    <MyContainer className={`py-10`}>
      <h1 className="text-2xl font-bold text-center text-accent">
        My Models{" "}
        <span className="text-xs font-semibold text-accent-content">
          {models.length} models found
        </span>
      </h1>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mt-6">
        {models.map((model) => (
          <MyModelCard
            key={model._id}
            model={model}
            models={models}
            setModels={setModels}
          ></MyModelCard>
        ))}
      </div>
      
    </MyContainer>
  );
};

export default MyModels;
