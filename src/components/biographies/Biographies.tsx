'use client'
import { Button, Input, PaginationProps, Select } from "antd"
import { FC, useState } from "react";
import "./Biographies.css"
import { CaretDownOutlined, CaretUpOutlined, GroupOutlined } from '@ant-design/icons';
import PeopleList from "@/components/peopleList/PeopleList";
import MtcPeopleList from "@/components/peopleList/MtcPeopleList";
import { IBiographyList } from "@/modals/Biography";
import { useForm } from "react-hook-form";
import { useFormik } from "formik"

export default function Biographies({ biographiesData, currentPage, setCurrentPage }:
    { biographiesData: { data: IBiographyList[], totalItemCount: number, limit: number }, currentPage: number, setCurrentPage: (currentPage: number) => void }) {
    
    const [continent, setContinent] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const formik = useFormik({
        initialValues: {
            fio: "",
            firstName: "",
            lastName: "",
            middleName: "",
            continent: "",
            country: ""
        },
        onSubmit: (values) => {
            console.log(values);
        }
    })

    const [openFilters, setOpenFilters] = useState<boolean>(false);
    const [mtsBlock, setMtsBlock] = useState<boolean>(false)

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return <form onSubmit={formik.handleSubmit} id="filters-form">
        <div id="search-and-filters-wrap">
            <Input placeholder="Введите ФИО" name="fio" value={formik.values.fio} onChange={formik.handleChange} />
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
        {openFilters && <div id="filter-inputs">
            <Input name="lastName" value={formik.values.lastName} onChange={formik.handleChange} placeholder="Фамилия" className="filter-input" />
            <Input name="firstName" value={formik.values.firstName} onChange={formik.handleChange} placeholder="Имя" className="filter-input" />
            <Input name="middleName" value={formik.values.middleName} onChange={formik.handleChange} placeholder="Отчество" className="filter-input" />
            <Select
                style={{ width: 200 }}

                value={continent}
                // onChange={(event) => setContinent(event.target.value)}
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
                value={country}
                // onChange={(event) => setContinent(event.target.value)}
                placeholder={"Выберите страну"}
                options={[
                    { value: '1', label: 'Пока пусто', disabled: true },
                ]}
            />
        </div>}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
            <Button type="primary" htmlType="submit" >
                Поиск
            </Button>
        </div>
        {mtsBlock ?
            <MtcPeopleList peopleList={biographiesData.data} totalCount={biographiesData.totalItemCount} pageSize={biographiesData.limit} setCurrentPage={setCurrentPage} currentPage={currentPage} /> :
            <PeopleList peopleList={biographiesData.data} totalCount={biographiesData.totalItemCount} pageSize={biographiesData.limit} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        }
    </form>
}