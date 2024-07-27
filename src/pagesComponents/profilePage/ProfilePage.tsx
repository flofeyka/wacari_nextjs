'use client'
import LeftMenu from "@/components/leftMenu/LeftMenu";
import "./ProfilePage.css"
import { Image } from 'antd';
import PeopleList from "@/components/peopleList/PeopleList";
import FamilyTreeComponent from "@/components/familyTree/FamilyTree";
import { useEffect, useState } from "react";
import { GroupOutlined } from "@ant-design/icons";
import MtcPeopleList from "@/components/peopleList/MtcPeopleList";
import { getBiographyDetail } from "@/api/biography/biography";
import { IBiographyDetail } from "@/modals/BiographyDetail";
import formatDate from "@/utils/formatDate";
import Biographies from "@/components/biographies/Biographies";


const ProfileDetailPage = ({ profileID }: { profileID: string }) => {
    const [mtsBlock, setMtsBlock] = useState<boolean>(false)
    const [profileData, setProfileData] = useState({
        id: 0,
        guid: '',
        status: {title: "", value: ""},
        fullName: {
            firstName: '',
            lastName: '',
            middleName: ''
        },
        birthDate: '',
        birthPlace: {
            continent: { id: 0, guid: '', title: '' },
            country: { guid: '', id: 0, title: '' },
            city: { id: 0, guid: '', title: '' }
        },
        father: {
            fullName: {
                firstName: '',
                lastName: '',
                middleName: ''
            },
            birthDate: '',
            birthPlace: {
                continent: { id: '', guid: '', title: '' },
                country: { guid: '', id: '', title: '' },
                city: { id: '', guid: '', title: '' }
            }
        },
        citizenships: [
            {
                id: 0,
                guid: '',
                countryTitle: "",
                countryId: 0,
                countryGuid: ""
            }
        ],
        residences: [
            {
                id: 0,
                guid: '',
                countryTitle: "",
                countryId: 0,
                countryGuid: "",
                dateFrom: 0,
                dateTo: 0,
            }
        ],
        growth: 0,
        weight: 0,
        spouses: [
            {
                fullName: {
                    firstName: '',
                    lastName: '',
                    middleName: ''
                },
                birthDate: '',
                birthPlace: {
                    continent: { id: 0, guid: '', title: '' },
                    country: { guid: '', id: 0, title: '' },
                    city: { id: 0, guid: '', title: '' }
                },
                dateFrom: 0,
                dateTo: 0
            }
        ],
        childrens: [
            {
                fullName: {
                    firstName: '',
                    lastName: '',
                    middleName: ''
                },
                birthDate: '',
                birthPlace: {
                    continent: { id: 0, guid: '', title: '' },
                    country: { guid: '', id: 0, title: '' },
                    city: { id: 0, guid: '', title: '' }
                },
            }
        ],
        mother: {
            fullName: {
                firstName: '',
                lastName: '',
                middleName: ''
            },
            birthDate: '',
            birthPlace: {
                continent: { id: '', guid: '', title: '' },
                country: { guid: null, id: null, title: null },
                city: { id: '', guid: '', title: '' }
            }
        },
        religion: {
            title: '',
            id: null,
            guid: null
        },
        associateAnimal: '',
        educations: [
            {
                id: 0,
                guid: '',
                title: '',
                dateFrom: null,
                dateTo: null
            }
        ],
        profession: '',
        companies: [{
            id: 0,
            guid: '',
            title: '',
            position: '',
            dateFrom: null,
            dateTo: null
        }],
        state: '',
        prizes: [
            {
                id: 0,
                guid: '',
                title: '',
            }
        ],
        socialLinks: {
            site: '',
            ok: '',
            vk: '',
            telegram: '',
            youtube: ''
        },
        nickNames: [],
        deathDate: '',
        deathPlace: {
            continent: { id: 0, guid: '', title: '' },
            country: { guid: '', id: 0, title: '' },
            city: { id: 0, guid: '', title: '' }
        },
        deathCause: '',
        // Add any other missing properties here with appropriate default values
    })


    useEffect(() => {
        getBiographyDetail(localStorage.getItem("accessToken"), profileID)
            .then((response) => {
                console.log("res", response.data)
                setProfileData(response.data)
            })
            .catch(error => {
                console.log("error", error)
            })
    }, [profileID]);

    return (
        <div id="profile-detail-component">
            <div id="component-left-menu">
                <LeftMenu />
            </div>
            <div id="profile-detail-wrapper">
                <div id="profile-info">
                    <div id="avatar">
                        <Image
                            src="/default-avatar.png"
                        />
                    </div>
                    <div id="profile-description">
                        <p className="profile-paragraph">Основная информация</p>
                        <div>Полное имя: <span className="profile-description-detail-info">
                            {profileData?.fullName.firstName} {profileData?.fullName.lastName} {profileData?.fullName.middleName}
                        </span>
                        </div>
                        <div>Дата рождения: <span className="profile-description-detail-info">
                            {profileData?.birthDate ? formatDate(profileData?.birthDate, "dd.MM.yyyy") : null}
                        </span>
                        </div>
                        <div>Место рождения: <span className="profile-description-detail-info">
                            {profileData?.birthPlace.continent.title} {profileData?.birthPlace.country.title} {profileData?.birthPlace.city.title}
                        </span>
                        </div>
                        <div>Гражданство:  
                            {profileData?.citizenships.map(citizenship => (
                                <span className="profile-description-detail-info" key={citizenship.id}>
                                    {citizenship.countryTitle}
                                </span>
                            ))}
                        </div>
                        <div>Место жительство:  
                            {profileData?.residences.map(residence => (
                                <span className="profile-description-detail-info" key={residence.id}>
                                    {residence.countryTitle}
                                </span>
                            ))}
                        </div>
                        <div>Рост: <span className="profile-description-detail-info">{profileData?.growth}</span></div>
                        <div>Вес: <span className="profile-description-detail-info">{profileData?.weight}</span></div>
                        <div>Супруг/Супруга: 
                            {profileData?.spouses.map((spouse, index) => (
                                <span className="profile-description-detail-info" key={index}>
                                    {spouse.fullName.firstName} {spouse.fullName.lastName} {spouse.fullName.middleName}
                                </span>
                            ))}
                        </div>
                        <div>Дети: 
                            {profileData?.childrens.map((children, index) => (
                                <span className="profile-description-detail-info" key={index}>
                                    {children?.fullName.firstName} {children?.fullName.lastName} {children?.fullName.middleName}
                                </span>
                            ))}
                        </div>
                        <div>Отец: <span className="profile-description-detail-info">
                            {profileData?.father.fullName.firstName} {profileData?.father.fullName.lastName} {profileData?.father.fullName.middleName}
                        </span>
                        </div>
                        <div>Мать: <span className="profile-description-detail-info">
                            {profileData?.mother.fullName.firstName} {profileData?.mother.fullName.lastName} {profileData?.mother.fullName.middleName}
                        </span>
                        </div>
                        <div>Отношения к религии: <span className="profile-description-detail-info">
                            {profileData?.religion.title}
                        </span>
                        </div>
                        <div>С каким животным ассоциируешься: <span
                            className="profile-description-detail-info">{profileData?.associateAnimal}</span>
                        </div>

                        <p className="profile-paragraph">Деятельность</p>
                        <div>Образование: 
                            {profileData?.educations.map((education) => (
                                <span className="profile-description-detail-info" key={education.id}>
                                    {education.title}
                                </span>
                            ))}
                        </div>
                        <div>Направление: <span className="profile-description-detail-info">
                            {profileData?.profession}</span>
                        </div>
                        <div>Компания: 
                            {profileData?.companies.map((company) => (
                                <span className="profile-description-detail-info" key={company.id}>
                                    {company.title}
                                </span>
                            ))}
                        </div>
                        <div>Должность: 
                            {profileData?.companies.map((company, index) => (
                                <span className="profile-description-detail-info" key={index}>
                                    {company.position}
                                </span>
                            ))}
                        </div>
                        <div>Состояние: <span className="profile-description-detail-info">
                            {profileData?.state}
                        </span>
                        </div>
                        <div>Награды: 
                            {profileData?.prizes.map((prize) => (
                                <span className="profile-description-detail-info" key={prize.id}>
                                    {prize.title}
                                </span>
                            ))}
                        </div>
                        <div>Сайт: <span className="profile-description-detail-info">{profileData?.socialLinks.site}</span></div>
                        <div>Одноклассники: <span className="profile-description-detail-info">{profileData?.socialLinks.ok}</span></div>
                        <div>ВК: <span className="profile-description-detail-info">{profileData?.socialLinks.vk}</span></div>
                        <div>Телеграм: <span className="profile-description-detail-info">{profileData?.socialLinks.telegram}</span></div>
                        <div><span>YouTube: </span> <span className="profile-description-detail-info">{profileData?.socialLinks.youtube}</span></div>
                    </div>
                </div>

                <div id="contacts">
                    
                </div>

                <div id="profile-quote">
                    <p>
                        {profileData.status.title}
                    </p>
                    <p>
                        {profileData.status.value}
                    </p>
                </div>

                <div id="profile-family-tree">
                    <p className="profile-paragraph">Родословное древо</p>
                    <div id="tree-block">
                        <FamilyTreeComponent profileData={profileData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetailPage;