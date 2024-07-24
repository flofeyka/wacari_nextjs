'use client'
import baseAPI from "@/api/baseAPI";


export const getBiographiesList = async (token: string) => {
    return (await baseAPI.get(`/api/v1/biographies`, { headers: { Authorization: "Bearer " + token } })).data;
};


export const getBiographyDetail = async (token: string | null | undefined, guid: string) => {
    return (
        await baseAPI.get(
            `/api/v1/bio/${guid}`,
            { headers: token ? { Authorization: "Bearer " + token } : undefined }
        )).data;
};

export const getMyBiographies = async (token: string) => {
    const { data } = await baseAPI.get(`/api/v1/biographies/my`, { headers: { Authorization: "Bearer " + token } });
    return data;
}