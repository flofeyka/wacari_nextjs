export interface IBiographyList {
    id: number,
    guid: string,
    bookmark: boolean | null,
    status: {
       title: string,
       value: string
       },
    fullName: {
       firstName: string,
       lastName: string,
       middleName: string
       },
    birthDate: string,
    birthPlace: {
       continent: {
           id: number,
           guid: string,
           title: string
       },
       country: {
            id: number,
            guid: string,
            title: string
            },
        city: {
            id: number,
            guid: string,
            title: string
        }
    },
    photo: [],
    citizenships: [
            {
                id: number,
                guid: string,
                countryId: number,
                countryGuid: string,
                countryTitle: string
            }
        ]
}


export interface IBiography{
    surname: string | null,
    name: string | null,
    patronymic: string | null,
    "birth-continent": string | null,
    "birth-country": string | null,
    "birth-city": string | null,
    "birthday-date": string | null,
    nicknames: string | null,
    "death-date": string | null,
    "death-continent": string | null,
    "death-country": string | null,
    "death-city": string | null,
    "death-cause": string | null,
    "buried-continent": string | null,
    "buried-country": string | null,
    "buried-city": string | null,
    citizenship: ICitizenship[],
    residence: IResidence[],
    growth: string | null,
    weight: string | null,
    spouse: ISpouse[],
    children: IChildren[],
    father: IFather,
    mother: IMother,
    religion: string|null,
    hobby: string|null,
    "animal-association": string|null,
    education: IEducation[],
    degree: IDegree,
    profession: string|null,
    activity: string|null,
    company: ICompany[],
    condition: string|null,
    awards: [{ text: string|null }],
    quotes: string|null,
    social_link: ISocialLink[],
    type_army: ITypeArmy[],
    service_years: IServiceYears,
    ranks: IRank[],
    battles: IBattles[],
    army_awards: IArmyAwards[],
    questions: IQuestions[],
}

export interface ICitizenship{
    country: string|null
}

export interface IResidence{
    continent?: string|null,
    country?: string|null,
    city?: string|null,
    yearFrom?: string|null,
    yearTo?: string|null
}

export interface ISpouse{
    surname?: string|null,
    name?: string|null,
    patronymic?: string|null,
    yearFrom?: string|null,
    yearTo?: string|null,
    continent?: string|null,
    country?: string|null,
    city?: string|null,
    birthday?: string|null,
}

export interface IChildren{
    surname?: string|null,
    name?: string|null,
    patronymic?: string|null,
    continent?: string|null,
    country?: string|null,
    city?: string|null,
    birthday?: string|null,
}

export interface IFather{
    surname: string|null,
    name: string|null,
    patronymic: string|null,
    continent: string|null,
    country: string|null,
    city: string|null,
    birthday: string|null,
}

export interface IMother{
    surname: string|null,
    name: string|null,
    patronymic: string|null,
    continent: string|null,
    country: string|null,
    city: string|null,
    birthday: string|null,
}

export interface IEducation{
    text?: string|null
    yearTo?: string|null
    yearFrom?: string|null
}

export interface IDegree{
    text: string|null,
    date: string|null,
}

export interface ICompany{
    text?: string|null,
    job_title?: string|null,
    yearFrom?: string|null,
    yearTo?: string|null,
}

export interface IAwards{
    title?: string|null,
}

export interface ISocialLink{
    text: string|null,
    constant: string|null,
}

export interface ITypeArmy{
    battles: string|null,
    yearFrom: string|null,
    yearTo: string|null,
}

export interface IServiceYears{
    yearFrom: string|null,
    yearTo: string|null,
}

export interface IRank{
    rank?: string|null,
    yearFrom?: string|null,
}

export interface IBattles{
    battle?: string|null,
    yearFrom?: string|null,
    yearTo?: string|null,
}

export interface IArmyAwards{
    text: string|null,
}

export interface IQuestions{
    question: string|null,
    answer: string|null,
}