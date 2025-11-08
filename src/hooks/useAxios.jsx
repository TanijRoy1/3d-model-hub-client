import axios from "axios";

const instance = axios.create({
    baseURL: "https://3d-model-hub-server.vercel.app",
})
const useAxios = () => {
    return instance;
};

export default useAxios;