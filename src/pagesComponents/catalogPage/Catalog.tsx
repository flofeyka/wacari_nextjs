'use client'
import "./Catalog.css"
import LeftMenu from "@/components/leftMenu/LeftMenu";
import PeopleList from "@/components/peopleList/PeopleList";
import {useRouter} from "next/navigation";
import { Breadcrumb } from 'antd';

const CatalogPage = (catalogID: any) => {

    const items=[
        {
            href: '/',
            title: "Главная",
        },
        {
            // href: '',
            title: (
                <>
                    <span>Каталог</span>
                </>
            ),
        },
        {
            title: 'Евразия',
        },
    ]

    return (
        <div id="catalog-page">
            <div id="component-left-menu">
                <LeftMenu/>
            </div>
            <div id="catalog-people-list">
                <div id="catalog-breadcrumb">
                    <Breadcrumb items={items}/>
                </div>
                <PeopleList/>
            </div>
        </div>
    )
}

export default CatalogPage;