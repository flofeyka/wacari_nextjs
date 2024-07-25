'use client'
import "./MtcPeopleList.css"
import Img from "../../../public/default-avatar.png"
import { Pagination, PaginationProps } from "antd";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IBiographyList } from "@/modals/Biography";
import { getBiographiesList } from "@/api/biography/biography";
import formatDate from "@/utils/formatDate";

const MtcPeopleList: FC<{ peopleList: IBiographyList[], totalCount: number, pageSize: number, currentPage: number, setCurrentPage: (currentPage: number) => void }> =
    ({ peopleList, totalCount, pageSize, currentPage, setCurrentPage }) => {
        const router = useRouter()

        const onChangePage: PaginationProps['onChange'] = (page: any) => {
            console.log(page);
            setCurrentPage(page);
        };

        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div id="mtc-people-list-component">
                    {peopleList.map((biography: any) => {
                        return (
                            <div
                                id="mtc-people-list-block"
                                key={biography.id}
                                style={{
                                    // backgroundImage: `url('default-avatar.png')`,
                                    background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('${biography.photo[0]}')`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    marginBottom: "25px"
                                }}
                                onClick={() => router.push(`/profile/${biography.guid}`)}
                            >
                                <div id="mtc-people-list-person">
                                    <div id="mtc-person-fio">
                                        {biography.fullName.firstName} {biography.fullName.lastName} {biography.fullName.middleName}
                                    </div>
                                    <div>Дата рождения: <span
                                        className="mtc-person-info-detail">{formatDate(biography.birthDate, "dd.MM.yyyy")}</span>
                                    </div>
                                    <div id="mtc-date">Место рождения: <span
                                        className="mtc-mts-person-info-detail">
                                        {biography.birthPlace.continent.title}, {biography.birthPlace.country.title}, {biography.birthPlace.city.title}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {/*<div id="mtc-people-list-block" style={{*/}
                    {/*    // backgroundImage: `url('default-avatar.png')`,*/}
                    {/*    background: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('default-avatar.png')",*/}
                    {/*    backgroundRepeat: "no-repeat",*/}
                    {/*    backgroundSize: "cover",*/}
                    {/*    backgroundPosition: "center",*/}
                    {/*}}*/}
                    {/*     onClick={() => router.push('/profile/12321')}*/}
                    {/*>*/}
                    {/*    <div id="mtc-people-list-person">*/}
                    {/*        <div id="mtc-person-fio">Цукерберг Марк Эллиот</div>*/}
                    {/*        <div>Дата рождения: <span className="mtc-person-info-detail">14.05.1984</span></div>*/}
                    {/*        <div>Место рождения: <span*/}
                    {/*            className="mtc-mts-person-info-detail">Северная Америка, США, Уайт-Плейнс</span>*/}
                    {/*        </div>*/}
                    {/*        <div>Гражданство: <span className="mtc-person-info-detail">США</span></div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}


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

export default MtcPeopleList