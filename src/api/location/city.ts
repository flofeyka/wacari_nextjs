'use client'
import baseAPI from "@/api/baseAPI";


export const getCity = async () => {
    return (await baseAPI.get(`/api/v1/cities?limit=25&page=1&country`)).data;
};