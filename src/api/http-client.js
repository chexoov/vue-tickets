import axios from "axios";

const token = localStorage.getItem("jwt");
const http = axios.create({
    baseURL: "https://dev.moydomonline.ru/api",
    headers: {
        Authorization: `Token ${token}`,
    },
});

export default http;