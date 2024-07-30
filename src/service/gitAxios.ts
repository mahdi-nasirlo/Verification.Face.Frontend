import axios, { AxiosInstance } from "axios";

const orgUrl = "http://192.168.57.16:8080/tfs";
let token = "";

const gitAxios: AxiosInstance = axios.create({
  baseURL: orgUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${Buffer.from(`:${token}`).toString("base64")}`,
  },
});

export default gitAxios;
