import axios from "axios";
import { getCookie } from "../utils/utils";

axios.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken");
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

export default axios.create({
    baseURL: "http://localhost:8000/",
});

export const axiosPrivate = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true,
});
