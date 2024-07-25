'use client'
import { Button, Input, PaginationProps, Select } from "antd"
import Search, { SearchProps } from "antd/es/input/Search"
import { useState } from "react";
import "./Biographies.css"
import { CaretDownOutlined, CaretUpOutlined, GroupOutlined } from '@ant-design/icons';
import PeopleList from "@/components/peopleList/PeopleList";
import MtcPeopleList from "@/components/peopleList/MtcPeopleList";
import { IBiographyList } from "@/modals/Biography";

export default function Biographies({biographiesData, currentPage, setCurrentPage}: 
    {biographiesData: {data: IBiographyList[], totalItemCount: number, limit: number}, currentPage: number, setCurrentPage: (currentPage: number) => void}) {
    const [openFilters, setOpenFilters] = useState<boolean>(false);
    const [mtsBlock, setMtsBlock] = useState<boolean>(false)

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log(info?.source, value);
    }

    const handleChangeContinent = (value: string) => {
        console.log(`selected ${value}`);
    };

    const handleChangeCountry = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onChange: PaginationProps['onChange'] = (page: any) => {
        console.log(page);
        setCurrentPage(page);
    };
    return <div>
        <div id="search-and-filters">
            <div id="search-and-filters-wrap">
                <Search placeholder="Введите ФИО" onSearch={onSearch} />
                <GroupOutlined
                    style={{
                        marginLeft: "5px",
                        color: "grey",
                        border: "1px grey solid",
                        padding: "0 5px",
                        cursor: "pointer",
                        borderRadius: "6px"
                    }}
                    onClick={() => {
                        setMtsBlock(!mtsBlock)
                    }}
                />
            </div>
            <div id="filter-text">
                <span onClick={() => setOpenFilters(!openFilters)}>
                    Расширенный поиск
                    {openFilters ? <CaretUpOutlined /> : <CaretDownOutlined />}
                </span>
            </div>
            {openFilters ?
                <div id="filters-form">
                    <div id="filter-inputs">
                        <Input placeholder="Фамилия" className="filter-input" />
                        <Input placeholder="Имя" className="filter-input" />
                        <Input placeholder="Отчество" className="filter-input" />
                        <Select
                            style={{ width: 200 }}
                            onChange={handleChangeContinent}
                            placeholder={"Выберите континент"}
                            options={[
                                { value: '1', label: 'Евразия' },
                                { value: '2', label: 'Африка' },
                                { value: '3', label: 'Северная Америка' },
                                { value: '4', label: 'Южная Америка' },
                                { value: '5', label: 'Австралия' },
                                { value: '6', label: 'Антарктида' },
                            ]}
                            className="filter-input"
                        />
                        <Select
                            style={{ width: 200 }}
                            onChange={handleChangeCountry}
                            placeholder={"Выберите страну"}
                            options={[
                                { value: '1', label: 'Пока пусто', disabled: true },
                            ]}
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                        <Button type="primary" htmlType="submit" >
                            Поиск
                        </Button>
                    </div>
                </div>
                : null}
        </div>

        {/*Список людей*/}
        {mtsBlock ?
            <MtcPeopleList peopleList={biographiesData.data} totalCount={biographiesData.totalItemCount} pageSize={biographiesData.limit} setCurrentPage={setCurrentPage} currentPage={currentPage} /> :
            <PeopleList peopleList={biographiesData.data} totalCount={biographiesData.totalItemCount} pageSize={biographiesData.limit} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        }
    </div>
}