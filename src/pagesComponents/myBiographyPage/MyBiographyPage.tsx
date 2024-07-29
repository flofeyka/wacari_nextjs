'use client'
import "./MyBiographyPage.css"
import LeftMenu from "@/components/leftMenu/LeftMenu";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";
import "../../components/peopleList/PeopleList.css"
import { useRouter } from "next/navigation";
import { getMyBiographies } from "@/api/biography/biography";
import Biographies from "@/components/biographies/Biographies";
import Menu from "@/components/menu/Menu";

const MyBiographyPage = () => {
    const [biographiesData, setBiographiesData] = useState({
        data: [],
        totalItemCount: 0,
        limit: 0
    });

    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const fetchBiographies = async () => {
            const data = await getMyBiographies(localStorage.getItem("accessToken") || "aaa", page);
            setBiographiesData(data);
        }

        fetchBiographies();
    }, [page])

    return (
        <div id="my-biography-page">
            <div id="component-left-menu">
                <LeftMenu />
            </div>
            <div id="my-biography-page-wrapper">
                <div style={{position: 'absolute', right: "0"}}>
                    <Menu />
                </div>
                <h3>Мои биографии</h3>
                <Divider />
                {biographiesData.data.length === 0 ?
                    <div id="create-biography">
                        У вас еще нет биографии. <Link href="/biography/create"> Создать</Link>?
                    </div> : <Biographies currentPage={page} setCurrentPage={setPage} biographiesData={biographiesData} />
                }
            </div>
        </div>
    )
}

export default MyBiographyPage