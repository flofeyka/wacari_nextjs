'use client'

import baseAPI from "../baseAPI";

export const getFavouritesList = async (token: string, page: number) => {
    return (await baseAPI.get(`/api/v1/biographies/my/bookmarks?page=${page}&limit=10`, { headers: { Authorization: "Bearer " + token } })).data;
};

export const addOrDeleteFavourite = async (id: string, token: string) => {
    const { data } = await baseAPI.post(`/api/v1/bio/${id}/bookmark`, {}, { headers: token ? { Authorization: "Bearer " + token } : undefined });
    return data;
}
