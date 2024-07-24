'use client'
import "./PeopleList.css"
import { Pagination, PaginationProps } from "antd";
import { FC } from "react";
import { IBiographyList } from "@/modals/Biography";
import BiographyItem from "../biography/BiographyItem";


const PeopleList: FC<{ peopleList: IBiographyList[], totalCount: number, pageSize: number, currentPage: number, setCurrentPage: (currentPage: number) => void }> =
    ({ peopleList, totalCount, pageSize, currentPage, setCurrentPage }) => {
        const onChangePage: PaginationProps['onChange'] = (page: any) => {
            console.log(page);
            setCurrentPage(page);
        };

        return (
            <div>
                <div id="people-wrapper">
                    {peopleList.map((item: any) => <BiographyItem photo={item.photo} fullName={item.fullName} birthDate={item.birthDate}
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
                {pageSize < totalCount && <div id="pagination-home-page">
                    <Pagination
                        current={currentPage}
                        onChange={onChangePage}
                        total={totalCount}
                        showSizeChanger={false}
                    />
                </div>}
            </div>
        )
    }

export default PeopleList;