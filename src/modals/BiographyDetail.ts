export interface IBiographyDetail {
    id: number,
    guid: string,
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
    nickNames: string,
    deathDate: string,
    deathPlace: {
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
    deathCause: string,
    burialLocation: {
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
    citizenships: [
        {
            id: number,
            guid: string,
            countryId: number,
            countryGuid: string,
            countryTitle: string
        }
    ],
    residences: [
        {
            id: number,
            guid: string,
            countryId: number,
            countryGuid: string,
            countryTitle: string,
            dateFrom: number,
            dateTo: number
        }
    ],
    growth: number,
    weight: number,
    spouses: [
        {
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
            dateFrom: number,
            dateTo: number
        }
    ],
    childrens: [
        {
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
            }
        }
    ],
    father: {
        fullName: {
            firstName: string,
            lastName: string,
            middleName: string
        },
        birthDate: string,
        birthPlace: {
            continent: {
                id: string | null,
                guid: string | null,
                title: string | null
            },
            country: {
                id: string | null,
                guid: string | null,
                title: string | null
            },
            city: {
                id: string | null,
                guid: string | null,
                title: string | null
            }
        }
    },
    mother: {
        fullName: {
            firstName: string | null,
            lastName: string | null,
            middleName: string | null
        },
        birthDate: string | null,
        birthPlace: {
            continent: {
                id: string | null,
                guid: string | null,
                title: string | null
            },
            country: {
                "id": null,
                "guid": null,
                "title": null
            },
            city: {
                id: string | null,
                guid: string | null,
                title: string | null
            }
        }
    },
    religion: {
        id: number | null,
        guid: string | null,
        title: string | null
    },
    hobby: string | null,
    associateAnimal: string | null,
    educations: [
        {
            id: number | null,
            guid: string | null,
            title: string | null,
            dateFrom: number | null,
            dateTo: number | null
        }
    ],
    academicDegree: {
        title: string | null,
        year: number | null
    },
    profession: string | null,
    activity: string | null,
    companies: [
        {
            id: number | null,
            guid: string | null,
            title: string | null,
            position: string | null,
            dateFrom: number | null,
            dateTo: number | null
        }
    ],
    state: string | null,
    prizes: [
        {
            id: number | null,
            guid: string | null,
            title: string | null,
        }
    ],
    quotes: string | null,
    socialLinks: {
        site: string | null,
        telegram: string | null,
        youtube: string | null,
        ok: string | null,
        vk: string | null,
    },
    militaries: [
        {
            id: number | null,
            guid: string | null,
            title: string | null,
            dateFrom: number | null,
            dateTo: number | null,
        }
    ],
    wars: [
        {
            id: number | null,
            guid: string | null,
            title: string | null,
            dateFrom: number | null,
            dateTo: number | null
        }
    ],
    ranks: [
        {
            id: number | null,
            guid: string | null,
            title: string | null,
            year: number | null
        }
    ],
    others: [
        {
            id: number | null,
            guid: string | null,
            question: string | null,
            answer: string | null,
        }
    ]
}
