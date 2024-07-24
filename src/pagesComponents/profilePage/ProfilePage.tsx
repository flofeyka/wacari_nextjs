'use client'
import LeftMenu from "@/components/leftMenu/LeftMenu";
import "./ProfilePage.css"
import { Image } from 'antd';
import PeopleList from "@/components/peopleList/PeopleList";
import FamilyTreeComponent from "@/components/familyTree/FamilyTree";
import {useEffect, useState} from "react";
import {GroupOutlined} from "@ant-design/icons";
import MtcPeopleList from "@/components/peopleList/MtcPeopleList";
import {getBiographyDetail} from "@/api/biography/biography";
import {IBiographyDetail} from "@/modals/BiographyDetail";
import formatDate from "@/utils/formatDate";


const ProfileDetailPage = (profileID: any) => {
    const [mtsBlock, setMtsBlock] = useState<boolean>(false)
    const [profileData, setProfileData] = useState<IBiographyDetail>()


    useEffect(() => {
        getBiographyDetail(localStorage.getItem("accessToken"), profileID.profileID)
            .then((response)=>{
                console.log("res", response.data)
                setProfileData(response.data)
            })
            .catch(error =>{
                console.log("error", error)
            })
    }, []);


    return (
        <div id="profile-detail-component">
            <div id="component-left-menu">
                <LeftMenu/>
            </div>
            <div id="profile-detail-wrapper">
                {/*ProfileID={profileID.profileID}*/}
                <div id="profile-info">
                    <div id="avatar">
                        <Image
                            // width={200}
                            // src="https://s0.rbk.ru/v6_top_pics/media/img/3/92/346998392974923.jpeg"
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
                            {/*14.05.1984 (40 лет)*/}
                            {/*{formatDate(profileData?.birthDate, "dd.MM.yyyy")}*/}
                            {profileData?.birthDate? formatDate(profileData?.birthDate, "dd.MM.yyyy"): null}
                            </span>
                        </div>
                        <div>Место рождения: <span className="profile-description-detail-info">
                            {profileData?.birthPlace.continent.title} {profileData?.birthPlace.country.title} {profileData?.birthPlace.city.title}
                            </span>
                        </div>
                        <div>Гражданство: &nbsp;
                            {profileData?.citizenships.map(citizenship=>{
                                return (
                                    <span className="profile-description-detail-info" key={citizenship.id}>
                                        {citizenship.countryTitle}
                                    </span>
                                )
                            })}
                        </div>
                        <div>Место жительство: &nbsp;
                            {profileData?.residences.map(residence=>{
                                return (
                                    <span className="profile-description-detail-info" key={residence.id}>
                                        {residence.countryTitle}
                                    </span>
                                )
                            })}
                        </div>
                        <div>Рост: <span className="profile-description-detail-info">{profileData?.growth}</span></div>
                        <div>Вес: <span className="profile-description-detail-info">{profileData?.weight}</span></div>
                        <div>Супруг/Супруга:&nbsp;
                            {profileData?.spouses.map((spouse,index) => {
                                return (
                                    <span className="profile-description-detail-info" key={index}>
                                        {spouse.fullName.firstName} {spouse.fullName.lastName} {spouse.fullName.middleName}
                                    </span>
                                )
                            })}
                        </div>
                        <div>Дети:&nbsp;
                            {profileData?.childrens.map((children, index)=>{
                                return (
                                    <span className="profile-description-detail-info" key={index}>
                                        {children?.fullName.firstName} {children?.fullName.lastName} {children?.fullName.middleName}
                                    </span>
                                )
                            })}
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
                        <div>Образование:&nbsp;
                            {profileData?.educations.map((education) => {
                                return (
                                    <span className="profile-description-detail-info" key={education.id}>
                                        {education.title}
                                    </span>
                                )
                            })}
                        </div>
                        <div>Направление: <span className="profile-description-detail-info">
                            {profileData?.profession}</span>
                        </div>
                        <div>Компания:&nbsp;
                            {profileData?.companies.map((company)=>{
                                return (
                                    <span className="profile-description-detail-info" key={company.id}>
                                        {company.title}
                                    </span>
                                )
                            })}
                        </div>
                        <div>Должность:&nbsp;
                            {profileData?.companies.map((company, index)=>{
                                return (
                                    <span className="profile-description-detail-info" key={index}>
                                        {company.position}
                                    </span>
                                )
                            })}
                        </div>
                        <div>Состояние: <span className="profile-description-detail-info">
                            {profileData?.state}
                            </span>
                        </div>
                        <div>Награды:&nbsp;
                            {profileData?.prizes.map((prize) => {
                                return (
                                    <span className="profile-description-detail-info" key={prize.id}>
                                    {prize.title}
                                </span>
                                )
                            })}
                        </div>
                        <div>Сайт: <span className="profile-description-detail-info">{profileData?.socialLinks.site}</span></div>
                        <div>Одноклассники: <span className="profile-description-detail-info">{profileData?.socialLinks.ok}</span></div>
                        <div>ВК: <span className="profile-description-detail-info">{profileData?.socialLinks.vk}</span></div>
                        <div>Телеграм: <span className="profile-description-detail-info">{profileData?.socialLinks.telegram}</span></div>
                        <div><span>YouTube: </span> <span className="profile-description-detail-info">{profileData?.socialLinks.youtube}</span></div>
                        {/*<div>Добавлено (Обновлено): <span className="profile-description-detail-info">*/}
                        {/*    04.05.2024 ( 13.05.2024 )*/}
                        {/*    </span>*/}
                        {/*</div>*/}
                    </div>
                </div>

                <div id="profile-quote">
                    <p>
                        Марк Эллиот Цукерберг (род. 14 мая 1984, Уайт-Плейнс, Нью-Йорк) — американский медиамагнат,
                        интернет-предприниматель и филантроп. Известен как соучредитель компании Meta
                        (ранее — Facebook, Inc.) и является её председателем,
                        главным исполнительным директором и контролирующим акционером.
                    </p>
                    <p>
                        Также является соучредителем проекта по разработке космического корабля на солнечных парусах
                        Breakthrough Starshot и одним из членов его совета директоров.
                    </p>
                </div>

                <div id="profile-family-tree">
                    <p className="profile-paragraph">Родословное древо</p>
                    <div id="tree-block">
                        <FamilyTreeComponent/>
                    </div>
                </div>
                <div style={{display:"flex", justifyContent:"flex-end"}}>
                    <GroupOutlined
                        // style={{marginLeft:"5px", color:"grey", border: "1px grey solid", padding:"0 5px", cursor: "pointer"}}
                        style={{color:"grey", cursor: "pointer", marginTop:"25px"}}
                        onClick={()=>{
                            setMtsBlock(!mtsBlock)
                        }}
                    />
                </div>
                {mtsBlock ?
                    <MtcPeopleList/>:
                    <PeopleList/>
                }
            </div>
        </div>
    )
}

export default ProfileDetailPage;