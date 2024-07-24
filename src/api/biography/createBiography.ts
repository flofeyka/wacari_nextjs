import baseAPI from "@/api/baseAPI";
import {
    IArmyAwards,
    IAwards,
    IBattles,
    IChildren,
    ICitizenship,
    ICompany,
    IEducation, IQuestions, IRank,
    IResidence,
    ISpouse
} from "@/modals/Biography";


export const createBiography = async (
    token: any,
    firstName: string,
    lastName: string,
    middleName: string | null,
    birthDate: string | null,
    birthPlace: { country: string | null; city: string | null },
    nickNames: string | null,
    deathDate: string | null,
    deathPlace: { country: string | null; city: string | null },
    deathCause: string | null,
    burialLocation: { country: string | null; city: string | null },
    citizenships: ICitizenship[],
    residences: IResidence[],
    growth: number | null,
    weight: number | null,
    spouses: ISpouse[],
    childrens: IChildren[],
    father: {
        firstName: string | null;
        lastName: string | null;
        middleName: string | null;
        birthDate: string | null;
        country: string | null;
        city: string | null
    },
    mother: {
        firstName: string | null;
        lastName: string | null;
        middleName: string | null;
        birthDate: string | null;
        country: string | null;
        city: string | null
    },
    academicDegree: { title: string | null; year: string | null },
    religion: string | null,
    hobby: string | null,
    associateAnimal: string | null,
    educations: {
        dateTo: string | null | undefined;
        title: string | null | undefined;
        dateFrom: string | null | undefined
    }[],
    profession: string | null,
    activity: string | null,
    companies: {
        dateTo: string | null | undefined;
        position: string | null | undefined;
        dateFrom: string | null | undefined;
        title: string | null | undefined
    }[],
    state: string | null,
    prizes: IAwards[],
    quotes: any,
    socialLinks: { [p: string]: null },
    wars: {
        dateTo: string | null | undefined;
        title: string | null | undefined;
        dateFrom: string | null | undefined
    }[],
    militaries: IArmyAwards[],
    ranks: { year: string | null | undefined; title: string | null | undefined }[],
    others: IQuestions[]
) => {
    let request_payload = {
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        birthDate: birthDate,
        birthPlace: birthPlace,
        nickNames: nickNames,
        deathDate: deathDate,
        deathPlace: deathPlace,
        deathCause: deathCause,
        burialLocation: burialLocation,
        citizenships: citizenships,
        residences: residences,
        growth: growth,
        weight: weight,
        spouses: spouses,
        childrens: childrens,
        father: father,
        mother: mother,
        academicDegree: academicDegree,
        religion: religion,
        hobby: hobby,
        associateAnimal: associateAnimal,
        educations: educations,
        profession: profession,
        activity: activity,
        companies: companies,
        state: state,
        prizes: prizes,
        quotes: quotes,
        socialLinks: socialLinks,
        wars: wars,
        militaries: militaries,
        ranks: ranks,
        others: others
    }

    console.log("createBiography request_payload", request_payload)
    return (await baseAPI.post(`/api/v1/bio/create`, request_payload,{headers: {Authorization: "Bearer " + token}}));
};