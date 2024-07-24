'use client'
import "./FavoritesPage.css"
import LeftMenu from "@/components/leftMenu/LeftMenu";
import { useEffect, useState } from "react";
import { getFavouritesList } from "@/api/favourites/favoutites";
import Biographies from "@/components/biographies/Biographies";


const FavoritesPage = () => {
    const [favouritesData, setFavouritesData] = useState({
        data: [],
        totalItemCount: 0,
        limit: 0
    })

    useEffect(() => {
        const fetchFavourites = async () => {
            const data = await getFavouritesList(localStorage.getItem("accessToken") || "aaa");
            setFavouritesData(data);
        }

        fetchFavourites();
    }, [])

    return (
        <div id="favorites-page">
            <div id="component-left-menu">
                <LeftMenu />
            </div>
            <div id="favorites-page-wrapper">
                <h3>Избранное</h3>
                <div id="people-wrapper">
                    <Biographies biographiesData={favouritesData}/>
                </div>
            </div>
        </div>
    )
}

export default FavoritesPage