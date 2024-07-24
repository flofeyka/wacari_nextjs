'use client'
import baseAPI from "@/api/baseAPI";


export const createToken = async (email: string, password: string) => {
    let request_payload = {
        email: email,
        password: password,
    }
    return (await baseAPI.post(`/api/v1/auth/token`, request_payload,
        // {
        //     withCredentials: true
        // }
        ));
};

export const refreshToken = async (tokenRefresh: string) => {
    let request_payload = {
        refreshToken: tokenRefresh,
    }
    return (await baseAPI.post(`/api/v1/auth/refresh-token`, request_payload,
        // {
        //     withCredentials: true
        // }
    ));
};

// ToDo example with Bearer
// export const createSessionMessage = async (dialog_id: number, text: string, sender_id: number, token: string) => {
//     let request_payload = {
//         sender_id: sender_id,
//         text: text,
//     }
//     return (await baseAPI.post<IDialogResponse>(`/api/v1/auth/seance/?dialog_id=${dialog_id}`, request_payload, {headers: {Authorization: "Bearer " + token}}));
// }