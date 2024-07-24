'use client'
import baseAPI from "@/api/baseAPI";


export const resetPassword = async (email: string) => {
    let request_payload = {
        email: email,
    }
    return (await baseAPI.post(`/api/v1/auth/reset/request`, request_payload,));
};

export const confirmNewPassword = async (guid: string, newPassword: string, newPasswordConfirm: string) => {
    let request_payload = {
        newPassword: newPassword,
        newPasswordConfirm: newPasswordConfirm,
    }
    return (await baseAPI.post(`/api/v1/auth/reset/${guid}/confirm`, request_payload,));
};

