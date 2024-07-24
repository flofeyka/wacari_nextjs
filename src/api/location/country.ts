'use client'
import baseAPI from "@/api/baseAPI";


export const getCountry = async (continent: string) => {
    // return (await baseAPI.get(`/api/v1/countries?limit=25&page=1&continent=${continent}`)).data;
    return (await baseAPI.get(`/api/v1/countries?continent=${continent}`)).data;
};