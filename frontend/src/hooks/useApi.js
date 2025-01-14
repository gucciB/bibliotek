import axios from "axios";

function useApi( baseURL ){
  const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return api;
}
export default useApi;