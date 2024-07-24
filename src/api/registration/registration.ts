'use client'
import baseAPI from "@/api/baseAPI";


export const createProfile = async (email: string, password: string, passwordConfirm: string) => {
    let request_payload = {
        email,
        password,
        passwordConfirm
    }
    return (await baseAPI.post(`/api/v1/sign-up`, request_payload,));
};

export const confirmProfile = async (guid: string) => {
    return (await baseAPI.get(`/api/v1/sign-up/confirm/${guid}`)).data;
};
