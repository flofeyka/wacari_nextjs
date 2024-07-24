'use client'
import baseAPI from "@/api/baseAPI";


export interface IProfileEdit{
    firstName: string,
    lastName: string,
    middleName: string,
    birthDate: string,
    phone: string,
    address: string,
    comment: string,
}

export const editProfile = async (
    token: string,
    data: IProfileEdit,
    // firstName: string,
    // lastName: string,
    // middleName: string,
    // birthDate: string,
    // phone: string,
    // address: string,
    // comment: string,
) => {
    let request_payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        birthDate: data.birthDate,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
    }
    return (await baseAPI.post(`/api/v1/profile/update`, request_payload,{headers: {Authorization: "Bearer " + token}}));
};
