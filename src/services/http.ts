import axios, { AxiosError, AxiosInstance } from "axios";

import { getJwt } from "./auth";

class HTTP {
  private static instance: AxiosInstance;
  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!HTTP.instance) {
      HTTP.instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        timeout: 5000,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    const jwt = getJwt();
    if (jwt) {
      HTTP.instance.defaults.headers.common["x-auth-token"] = jwt;
    }
    return HTTP.instance;
  }

  public static setJwt() {
    const jwt = localStorage.getItem("token");
  }
}

export default HTTP;
