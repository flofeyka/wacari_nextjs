'use client'
import Link from "next/link";
import "./PeopleList.css"
import { Pagination, PaginationProps } from "antd";
import { useEffect, useState } from "react";
import { HeartOutlined } from "@ant-design/icons";
import { getBiographiesList } from "@/api/biography/biography";
import { IBiographyList } from "@/modals/Biography";
import formatDate from "@/utils/formatDate";
import BiographyItem from "../biography/biographyItem";


const PeopleList = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [biographiesList, setBiographiesList] = useState<IBiographyList[]>([]);


    useEffect(() => {
        biographyList(localStorage.getItem("accessToken") || "")
    }, []);

    const biographyList = async (token: string) => {
        await getBiographiesList(token)
            .then((response) => {
                console.log("getBiographiesList", response.data)
                setBiographiesList(response.data)
            })
    }

    const onChangePage: PaginationProps['onChange'] = (page: any) => {
        console.log(page);
        setCurrentPage(page);
    };

    return (
        <div>
            <div id="people-wrapper">
            {biographiesList.map((item: any) => <BiographyItem photo={item.photo} fullName={item.fullName} birthDate={item.birthDate}
                        birthPlace={item.birthPlace} bookmark={item.bookmark} guid={item.guid} id={item.id} />)}
                {/*<div id="person-block">*/}
                {/*    <div id="person-img">*/}

                {/*    </div>*/}
                {/*    <div id="person-info-block">*/}
                {/*        <div id="person-fio">Цукерберг Марк Эллиот</div>*/}
                {/*        <div>Дата рождения: <span className="person-info-detail">14.05.1984</span></div>*/}
                {/*        <div>Место рождения: <span*/}
                {/*            className="person-info-detail">Северная Америка, США, Уайт-Плейнс</span>*/}
                {/*        </div>*/}
                {/*        <div>Гражданство: <span className="person-info-detail">США</span></div>*/}
                {/*        <div style={{display: "flex", justifyContent: "flex-end", marginTop: "10px"}}>*/}
                {/*            <HeartOutlined className="favorites-on"/>*/}
                {/*            <Link type="primary" href="/profile/12321ui2" className="person-link-button">*/}
                {/*                Узнать больше*/}
                {/*            </Link>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*/!*ToDo убрать ниже когда появятся данные с бека*!/*/}
                {/*<div id="person-block">*/}
                {/*    <div id="person-img">*/}

                {/*    </div>*/}
                {/*    <div id="person-info-block">*/}
                {/*        <div id="person-fio">Тест1 Тестович1</div>*/}
                {/*        <div>Дата рождения: <span className="person-info-detail">15.12.2000</span></div>*/}
                {/*        <div>Место рождения: <span className="person-info-detail">г. Москва</span></div>*/}
                {/*        <div>Гражданство: <span className="person-info-detail">Россия</span></div>*/}
                {/*        <div style={{display: "flex", justifyContent: "flex-end", marginTop: "10px"}}>*/}
                {/*            <HeartOutlined className="favorites-on"/>*/}
                {/*            <Link type="primary" href="/profile/12321" className="person-link-button">*/}
                {/*                Узнать больше*/}
                {/*            </Link>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div id="person-block">*/}
                {/*    <div id="person-img">*/}

                {/*    </div>*/}
                {/*    <div id="person-info-block">*/}
                {/*        <div id="person-fio">Тест2 Тестович2</div>*/}
                {/*        <div>Дата рождения: <span className="person-info-detail">15.12.2000</span></div>*/}
                {/*        <div>Место рождения: <span className="person-info-detail">г. Москва</span></div>*/}
                {/*        <div>Гражданство: <span className="person-info-detail">Россия</span></div>*/}
                {/*        <div style={{display: "flex", justifyContent: "flex-end", marginTop: "10px"}}>*/}
                {/*            <HeartOutlined className="favorites-on"/>*/}
                {/*            <Link type="primary" href="/profile/12321" className="person-link-button">*/}
                {/*                Узнать больше*/}
                {/*            </Link>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*ToDo убрать выше когда появятся данные с бека*/}

            </div>
            <div id="pagination-home-page">
                <Pagination
                    current={currentPage}
                    onChange={onChangePage}
                    total={60}
                    showSizeChanger={false}
                />
            </div>
        </div>
    )
}

export default PeopleList;