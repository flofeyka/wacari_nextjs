'use client'
import baseAPI from "@/api/baseAPI";


export const getContinent = async () => {
    // return (await baseAPI.get(`/api/v1/continents?limit=2&page=1`)).data;
    return (await baseAPI.get(`/api/v1/continents`)).data;
};