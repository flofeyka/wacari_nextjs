'use client'
import LeftMenu from "@/components/leftMenu/LeftMenu";
import "./ProfilePage.css"
import { Image } from 'antd';
import FamilyTreeComponent from "@/components/familyTree/FamilyTree";
import React, { useEffect, useState } from "react";
import { getBiographyDetail } from "@/api/biography/biography";
import formatDate from "@/utils/formatDate";

const initialProfileState = {
    id: 0,
    guid: '',
    status: { title: "", value: "" },
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
            countryGuid: "",
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
            country: { guid: '', id: '', title: '' },
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
}

const Detail: React.FC<ProfileDetailProps> = ({ label, value }) => (
    value ? <div className="profile-row"><span className="profile-field">{label}</span><span className="profile-description-detail-info">{value}</span>
    </div> : null
);

const ListDetails = <T,>({ label, items, getItemValue }: ProfileListProps<T>) => (
    items.length > 0 && (
        <div className="profile-row">
            <span className="profile-field">{label}</span>{items.map((item, index) => (
                <span className="profile-description-detail-info" key={index}>
                    {getItemValue(item)}
                </span>
            ))}
        </div>
    )
);

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children }) => (
    <>
        <h1 className="profile-paragraph">{title}</h1>
        {children}
    </>
);

const ProfileDescription: React.FC<ProfileDescriptionProps> = ({ profileData }) => {
    const formatFullName = (fullName: IFullName) => `${fullName.firstName} ${fullName.lastName} ${fullName.middleName}`;
    const formatDateValue = (date: string) => date ? formatDate(date, "dd.MM.yyyy") : null;

    return (
        <div className="profile-description">
            <h1 className="profile-name">{formatFullName(profileData.fullName)}</h1>
            <hr />
            <div className="profile-description-content">
                <div className="avatar"><Image src="/default-avatar.png" /></div>
                <section className="profile-section-container">
                    <ProfileSection title="Основная информация">
                        <Detail label="Полное имя" value={formatFullName(profileData.fullName)} />
                        <Detail label="Дата рождения" value={formatDateValue(profileData.birthDate)} />
                        <Detail label="Место рождения" value={`${profileData?.birthPlace.continent.title} ${profileData.birthPlace.country.title} ${profileData?.birthPlace.city.title}`} />
                        <ListDetails label="Гражданство" items={profileData.citizenships} getItemValue={(item) => item.countryTitle} />
                        <ListDetails label="Место жительства" items={profileData?.residences} getItemValue={(item) => item.countryTitle} />
                        <Detail label="Рост" value={profileData?.growth} />
                        <Detail label="Вес" value={profileData?.weight} />
                        <ListDetails label="Супруг/Супруга" items={profileData.spouses} getItemValue={(item) => formatFullName(item.fullName)} />
                        <ListDetails label="Дети" items={profileData.childrens} getItemValue={(item) => formatFullName(item.fullName)} />
                        <Detail label="Отец" value={formatFullName(profileData.father.fullName)} />
                        <Detail label="Мать" value={formatFullName(profileData.mother.fullName)} />
                        <Detail label="Отношения к религии" value={profileData.religion.title} />
                        <Detail label="С каким животным ассоциируешься" value={profileData.associateAnimal} />
                    </ProfileSection>

                    <ProfileSection title="Деятельность">
                        <ListDetails label="Образование" items={profileData?.educations} getItemValue={(education: IEducation) => education.title} />
                        <Detail label="Направление" value={profileData?.profession} />
                        <ListDetails label="Компания" items={profileData?.companies} getItemValue={(company: ICompany) => `${company.title}, ${company.position}`} />
                        <Detail label="Состояние" value={profileData?.state} />
                        <ListDetails label="Награды" items={profileData?.prizes} getItemValue={(prize: IPrize) => prize.title} />
                        <Detail label="Сайт" value={profileData?.socialLinks.site} />
                        <Detail label="Одноклассники" value={profileData?.socialLinks.ok} />
                        <Detail label="ВК" value={profileData?.socialLinks.vk} />
                        <Detail label="Телеграм" value={profileData?.socialLinks.telegram} />
                        <Detail label="YouTube" value={profileData?.socialLinks.youtube} />
                    </ProfileSection>
                </section>
            </div>
        </div>
    );
};

const SocialLink: React.FC<{ [key: string]: string }> = ({ href, icon, label }) => (
    <a href={href} className="contacts__link">
        <img src={icon} alt={label} className="contacts__icon"/>
        {label}
    </a>
);

const ProfileDetailPage: React.FC<{ profileID: string }> = ({ profileID }) => {
    const [profileData, setProfileData] = useState(initialProfileState);

    const socialLinks = [
        { href: profileData.socialLinks.site, icon: "/icons/site.svg", label: "Cайт" },
        { href: profileData.socialLinks.ok, icon: "/icons/ok.svg", label: "Одноклассники" },
        { href: profileData.socialLinks.vk, icon: "/icons/vk.svg", label: "Вконтакте" },
        { href: profileData.socialLinks.telegram, icon: "/icons/telegram.svg", label: "Telegram" },
        { href: profileData.socialLinks.youtube, icon: "/icons/youtube.svg", label: "Youtube" },
    ].filter(link => link.href);


    useEffect(() => {
        getBiographyDetail(localStorage.getItem("accessToken"), profileID)
            .then((response) => setProfileData(response.data))
            .catch(error => console.log("error", error))
    }, []);

    return (
        <main className="profile-detail-component">
            <aside className="component-left-menu">
                <LeftMenu />
            </aside>

            <section className="profile-detail-wrapper">
                <section className="profile-info">
                    <ProfileDescription profileData={profileData} />
                </section>

                <section className="contacts">
                    {socialLinks.map(({ href, icon, label }) => (
                        <SocialLink key={href} href={href} icon={icon} label={label} />
                    ))}
                </section>

                <section className="profile-quote profile-section-container">
                    <p>{profileData.status.title}</p>
                    <p>{profileData.status.value}</p>
                </section>

                <section className="profile-family-tree profile-section-container">
                    <h1 className="profile-paragraph">Родословное древо</h1>
                    <div className="tree-block">
                        <FamilyTreeComponent profileData={profileData} />
                    </div>
                </section>
            </section>
        </main>
    )
}

export default ProfileDetailPage;

interface IProfileData {
    id: number;
    guid: string;
    status: { title: string; value: string };
    fullName: IFullName;
    birthDate: string;
    birthPlace: {
        continent: ILocation;
        country: ILocation;
        city: ILocation;
    };
    father: ISpouseChild;
    citizenships: TCitizenship[];
    residences: TResidence[];
    growth: number;
    weight: number;
    spouses: ISpouseChild[];
    childrens: ISpouseChild[];
    mother: ISpouseChild;
    religion: { title: string; id: number | null; guid: string | null };
    associateAnimal: string;
    educations: IEducation[];
    profession: string;
    companies: ICompany[];
    state: string;
    prizes: IPrize[];
    socialLinks: ISocialLinks;
    nickNames: string[];
    deathDate: string;
    deathPlace: {
        continent: ILocation;
        country: ILocation;
        city: ILocation;
    };
    deathCause: string;
}

interface IEntity {
    id: number | string | null;
    guid: string | null | undefined;
    title: string;
}

interface IFullName {
    firstName: string;
    lastName: string;
    middleName: string;
}

interface ILocation extends IEntity { }

type TCitizenship = Omit<IEntity, 'title'> & {
    countryTitle: string;
    countryId: number;
    countryGuid: string;
}

type TResidence = Omit<IEntity, 'title'> & {
    countryTitle: string;
    countryId: number;
    countryGuid: string;
    dateFrom: number;
    dateTo: number;
}

interface ISpouseChild {
    fullName: IFullName;
    birthDate: string;
    birthPlace: {
        continent: ILocation;
        country: ILocation;
        city: ILocation;
    };
    dateFrom?: number;
    dateTo?: number;
}

interface IEducation extends IEntity {
    dateFrom: number | null;
    dateTo: number | null;
}

interface ICompany extends IEntity {
    position: string;
    dateFrom: number | null;
    dateTo: number | null;
}

interface IPrize extends IEntity { }

interface ISocialLinks {
    site: string;
    ok: string;
    vk: string;
    telegram: string;
    youtube: string;
}

interface ProfileDetailProps {
    label: string;
    value: string | number | null;
}

interface ProfileListProps<T> {
    label: string;
    items: T[];
    getItemValue: (item: T) => string;
}

interface ProfileSectionProps {
    title: string;
    children: React.ReactNode;
}

interface ProfileDescriptionProps {
    profileData: IProfileData;
}