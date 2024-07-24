'use client'
import "./MyBiographyPage.css"
import LeftMenu from "@/components/leftMenu/LeftMenu";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";
import { HeartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Pagination, PaginationProps } from "antd";
import "../../components/peopleList/PeopleList.css"
import { useRouter } from "next/navigation";
import { getMyBiographies } from "@/api/biography/biography";

const MyBiographyPage = () => {
    const [biographies, setBiographies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const router = useRouter()

    const onChangePage: PaginationProps['onChange'] = (page: any) => {
        console.log(page);
        setCurrentPage(page);
    };

    useEffect(() => {
        const getBiography = async () => {
            const {data, totalItemCount, currentPageNumber, limit} = await getMyBiographies(localStorage.getItem("accessToken") || "aaa");
            setBiographies(data);
            setTotalCount(totalItemCount);            
            setCurrentPage(currentPageNumber);
            setPageSize(limit);
            // setPageSize(data.pageSize);
        }

        getBiography();
    }, [])

    const goToEditProfile = () => {
        router.push("/biography/create")
    }

    return (
        <div id="my-biography-page">
            <div id="component-left-menu">
                <LeftMenu />
            </div>
            <div id="my-biography-page-wrapper">
                <h3>Мои биографии</h3>
                <Divider />
                {biographies.length === 0 ?
                    <div id="create-biography">
                        У вас еще нет биографии. <Link href="/biography/create"> Создать</Link>?
                    </div> : <div></div>
                    // : biographies.map(biography => <div></div>)
                }

                <div>
                    <div id="people-wrapper">
                        <div id="person-block">
                            <div id="person-img">

                            </div>
                            <div id="person-info-block">
                                <div id="person-fio">Цукерберг Марк Эллиот</div>
                                <div>Дата рождения: <span className="person-info-detail">14.05.1984</span></div>
                                <div>Место рождения: <span
                                    className="person-info-detail">Северная Америка, США, Уайт-Плейнс</span>
                                </div>
                                <div>Гражданство: <span className="person-info-detail">США</span></div>
                                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                                    <DeleteOutlined className="favorites-on" />
                                    <EditOutlined className="people-edit" onClick={goToEditProfile} />
                                    <Link type="primary" href="/profile/12321ui2" className="person-link-button">
                                        Узнать больше
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/*ToDo убрать ниже когда появятся данные с бека*/}
                        <div id="person-block">
                            <div id="person-img">

                            </div>
                            <div id="person-info-block">
                                <div id="person-fio">Тест1 Тестович1</div>
                                <div>Дата рождения: <span className="person-info-detail">15.12.2000</span></div>
                                <div>Место рождения: <span className="person-info-detail">г. Москва</span></div>
                                <div>Гражданство: <span className="person-info-detail">Россия</span></div>
                                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                                    <DeleteOutlined className="favorites-on" />
                                    <EditOutlined className="people-edit" onClick={goToEditProfile} />
                                    <Link type="primary" href="/profile/12321" className="person-link-button">
                                        Узнать больше
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div id="person-block">
                            <div id="person-img">

                            </div>
                            <div id="person-info-block">
                                <div id="person-fio">Тест2 Тестович2</div>
                                <div>Дата рождения: <span className="person-info-detail">15.12.2000</span></div>
                                <div>Место рождения: <span className="person-info-detail">г. Москва</span></div>
                                <div>Гражданство: <span className="person-info-detail">Россия</span></div>
                                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                                    <DeleteOutlined className="favorites-on" />
                                    <EditOutlined className="people-edit" onClick={goToEditProfile} />
                                    <Link type="primary" href="/profile/12321" className="person-link-button">
                                        Узнать больше
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/*ToDo убрать выше когда появятся данные с бека*/}

                    </div>
                    <div id="pagination-home-page">
                        <Pagination
                            current={currentPage}
                            onChange={onChangePage}
                            total={pageSize}
                            showSizeChanger={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBiographyPage