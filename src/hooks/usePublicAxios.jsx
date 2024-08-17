import axios from "axios";

const publicAxios = axios.create({

    baseURL:'https://book-beacon-server-side.vercel.app/'
   
    

})
const usePublicAxios = () => {
  return publicAxios
};

export default usePublicAxios;