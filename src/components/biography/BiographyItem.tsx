import Link from "next/link";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { addOrDeleteFavourite } from "@/api/favourites/favoutites";
import formatDate from "@/utils/formatDate";
import "./BiographyItem.css";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";


export default function BiographyItem({ photo, fullName, birthDate, birthPlace, bookmark, guid, id }:
    {
        photo: [string], fullName: { firstName: string, lastName: string, middleName: string }, birthDate: Date,
        birthPlace: { continent: { title: string }, country: { title: string }, city: { title: string } },
        bookmark: null | boolean, guid: string, id: string
    }) {
    const [liked, setLiked] = useState<boolean>(bookmark !== null && bookmark);

    const setLike = async () => {
        await addOrDeleteFavourite(guid, localStorage.getItem("accessToken") || "a");
        setLiked(true);
    }

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const deleteBiography = () => {
        setDeleteModal(false);
    }

    console.log(bookmark);

    return <div id="person-block" key={id}>
        <Modal open={deleteModal} footer={<Button onClick={deleteBiography}>Да</Button>} onCancel={() => setDeleteModal(false)}>
            <div style={{textAlign: "center", fontWeight: "bold", fontSize: "20px"}}>Вы действительно хотите удалить эту биографию?</div>
            
        </Modal>
        <div id="person-img">
            <img src={photo[0]} id="avatar" alt="ava" />
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
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "10px" }}>
                {bookmark !== null && <span>{liked ? <HeartFilled onClick={setLike} className="favorites-on" /> : <HeartOutlined onClick={setLike} className="favorites-on" />}</span>}
                <div style={{marginRight: "5px", cursor: "pointer"}}>
                    <EditFilled />
                </div>
                <div style={{marginRight: "5px", cursor: "pointer"}} onClick={() => setDeleteModal(true)}>
                    <DeleteFilled />
                </div>
                <Link type="primary" href={`/profile/${guid}`} className="person-link-button">
                    Узнать больше
                </Link>
            </div>
        </div>
    </div>
}