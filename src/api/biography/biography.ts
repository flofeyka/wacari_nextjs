'use client'
import baseAPI from "@/api/baseAPI";


export const getBiographiesList = async (token: string | null | undefined, currentPage: number = 1) => {
    return (await baseAPI.get(`/api/v1/biographies?currentPage=${currentPage}`, token ? { headers: { Authorization: "Bearer " + token } } : undefined)).data;
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