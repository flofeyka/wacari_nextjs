import Link from "next/link";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { addOrDeleteFavourite } from "@/api/favourites/favoutites";
import formatDate from "@/utils/formatDate";


export default function BiographyItem({ photo, fullName, birthDate, birthPlace, bookmark, guid, id }:
    { photo: string, fullName: {firstName: string, lastName: string, middleName: string }, birthDate: Date, 
    birthPlace: { continent: { title: string }, country: { title: string }, city: { title: string } }, 
    bookmark: null | boolean, guid: string, id: string }) {
    const [liked, setLiked] = useState<boolean>(false);



    const setLike = async () => {
        await addOrDeleteFavourite(guid, localStorage.getItem("accessToken") || "a");
        setLiked(true);
    }


    return <div id="person-block" key={id}>
        <div id="person-img">
            <img src={photo} alt="ava"/>111
        </div>
        <div id="person-info-block">
            <div id="person-fio">
                {fullName.firstName} {fullName.lastName} {fullName.middleName}
            </div>
            <div>Дата рождения: <span className="person-info-detail">{formatDate(birthDate, "dd.MM.yyyy")}</span></div>
            <div>Место рождения: <span
                className="person-info-detail">
                {birthPlace.continent.title}, {birthPlace.country.title}, {birthPlace.city.title}
            </span>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                {bookmark !== null && bookmark ? <HeartFilled onClick={setLike} className="favorites-on"/> : <HeartOutlined onClick={setLike} className="favorites-on" />}

                <Link type="primary" href={`/profile/${guid}`} className="person-link-button">
                    Узнать больше
                </Link>
            </div>
        </div>
    </div>
}