import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

// const instance = axios.create({
//   baseURL: "http://localhost:3000",
// });
const instance = axios.create({
  baseURL: "https://3d-model-hub-server.vercel.app",
});

const useAxiosSecure = () => {
  const {user, loading, signOutUser} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(loading) return;
    const requestInterceptor = instance.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user.accessToken}`;
      return config;
    });
    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if(status === 401 || status === 403) {
            console.log("Loging out user due to bad request...");
            signOutUser().then(()=> {
              navigate("/auth/login");
            })
        }
      }
    );

    return () => {
        instance.interceptors.request.eject(requestInterceptor);
        instance.interceptors.response.eject(responseInterceptor);
    }
  }, [user, loading, signOutUser, navigate]);
  return instance;
};

export default useAxiosSecure;
