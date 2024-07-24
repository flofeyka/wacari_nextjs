'use client'
import axios, { AxiosError } from "axios";


export const BASE_URL = `${process.env.REACT_APP_BASEURL || "http://5.35.87.211:83"}`
// export const BASE_URL = `${process.env.REACT_APP_BASEURL || "https:"}`

const baseAPI = axios.create({ baseURL: BASE_URL });

export default baseAPI;

