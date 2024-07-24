'use client'
import "./FavoritesPage.css"
import LeftMenu from "@/components/leftMenu/LeftMenu";
import Link from "next/link";
import { Pagination, PaginationProps } from "antd";
import { useEffect, useState } from "react";
import { HeartOutlined } from "@ant-design/icons";
import { getFavouritesList } from "@/api/favourites/favoutites";
import BiographyItem from "@/components/biography/biographyItem";


const FavoritesPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [favourites, setFavourites] = useState([]);
    const [pageSize, setPageSize] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchFavourites = async () => {
            const { currentPageNumber, data, limit, totalItemCount } = await getFavouritesList(localStorage.getItem("accessToken") || "aaa");
            setFavourites(data);
            setPageSize(limit);
            setTotalCount(totalItemCount);
            setCurrentPage(currentPageNumber);
        }

        fetchFavourites();
    }, [])

    const onChangePage: PaginationProps['onChange'] = (page: any) => {
        console.log(page);
        setCurrentPage(page);
    };

    return (
        <div id="favorites-page">
            <div id="component-left-menu">
                <LeftMenu />
            </div>
            <div id="favorites-page-wrapper">
                <h3>Избранное</h3>
                <div id="people-wrapper">
                    <div id="person-block">
                        {favourites.map((item: any) => <BiographyItem photo={item.photo} fullName={item.fullName} birthDate={item.birthDate}
                        birthPlace={item.birthPlace} bookmark={item.bookmark} guid={item.guid} id={item.id} />)}
                    </div>
                    <div id="pagination-home-page">
                        <Pagination
                            current={currentPage}
                            onChange={onChangePage}
                            total={totalCount}
                            showSizeChanger={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavoritesPage