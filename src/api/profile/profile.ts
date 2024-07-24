'use client'
import baseAPI from "@/api/baseAPI";


export const getProfile = async (token: string) => {
    return (await baseAPI.get(`/api/v1/profile`, {headers: {Authorization: "Bearer " + token}})).data;
};
