import axios from "axios";

const axiosClient: any = axios.create();

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

export default axiosClient;