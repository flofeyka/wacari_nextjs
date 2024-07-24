'use client'
import React, {useEffect, useState} from "react"
import {default as Bich} from '@mui/material/TextField';

import { Tooltip } from 'react-tooltip'

import { Button, FormControl, Select, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import dayjs from "dayjs";
import {IBiography, IChildren} from "@/modals/Biography";
import formatDate from "@/utils/formatDate";
import "./BiographyComponent.scss"
import {getCountry} from "@/api/location/country";


// eslint-disable-next-line react/display-name
const TextField = React.memo((props: any) => {
    // console.log(props.label)
    return (
        <>
            <Bich {...props}
                // helperText={getRandomInt(100)}
            />
        </>
    )
}, (a,b) => {return (a.value === b.value)})

interface Props{
    formValue: IChildren[],
    setFormValue: Function,
    continents: any[]
}

export default function Children(props: Props) {
    const [countries, setCountries] = useState<any[]>([])

    const getCountries = (continent: string, index: number) => {
        getCountry(continent)
            .then((response) => {
                setCountries((state) => [...state, ...response.data.map((obj: any) => ({ ...obj, index: index }))])
            })
    }

    const add = () => {
        // props.setFormValue((state: IBiography) => ({...state, children:
        //         [...state.children, {
        //             surname: null,
        //             name: null,
        //             patronymic: null,
        //             birthday: null,
        //             continent: null,
        //             country: null,
        //             city: null,
        //         }]
        // }))
        props.setFormValue((children: IChildren[]) =>
                    [...children, {
                        surname: null,
                        name: null,
                        patronymic: null,
                        birthday: null,
                        continent: null,
                        country: null,
                        city: null,
                    }]
        )
    }

    const remove = (index: number) => {
        // props.setFormValue((state: IBiography) => ({
        //     ...state,
        //     children: state.children.filter((_, i) => index !== i)
        // }))
        props.setFormValue((children: IChildren[]) => children.filter((_, i) => index !== i));

    }

    const update = (index: number, value: string, name: string) => {
        // props.setFormValue((state: IBiography) => ({...state,
        //     children: state.children.map((q, i) => (
        //         i === index ? { ...q, [name]: value } : q
        //     ))
        // }))
        props.setFormValue((children: IChildren[]) => children.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }

    // const date = function (date) {
    //     return `${date.$y}-${zero(date.$M)}-${zero(date.$D)}`;
    // }


    return (
        <>
            {
                props.formValue.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <p>Дети</p>
                            <div>
                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                <Tooltip anchorSelect=".my-anchor-element">
                                    :(
                                </Tooltip>
                                {index === 0 ? (
                                    <Button onClick={add}>
                                        <AddIcon/>
                                    </Button>
                                ) : (
                                    <Button onClick={() => remove(index)}>
                                        <RemoveIcon/>
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="biography__input_new" style={{display:"flex", flexDirection:"column"}}>
                            <div className="biography__input-wrap-v2">
                                <TextField
                                    label={'Фамилия'}
                                    value={item.surname}
                                    onChange={(e:any) => {
                                        if (e.target.value === " ") return
                                        update(index, e.target.value, 'surname')
                                    }}
                                    onFocusCapture={(val:any) => {
                                        update(index, (val.target.value).trim(), 'surname')
                                    }}
                                />

                                <TextField
                                    label={'Имя'}
                                    value={item.name}
                                    onChange={(e:any) => {
                                        if (e.target.value === " ") return
                                        update(index, e.target.value, 'name')
                                    }}
                                    onFocusCapture={(val:any) => {
                                        update(index, (val.target.value).trim(), 'name')
                                    }}
                                />

                                <TextField
                                    label={'Отчество'}
                                    value={item.patronymic}
                                    onChange={(e:any) => {
                                        if (e.target.value === " ") return
                                        update(index, e.target.value, 'patronymic')
                                    }}
                                    onFocusCapture={(val:any) => {
                                        update(index, (val.target.value).trim(), 'patronymic')
                                    }}
                                />

                                <div className="date-v2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                        <DatePicker
                                            label={'Дата рождения'}
                                            // onChange={newValue => update('birth', date(newValue))}
                                            onChange={(newValue: any) => {
                                                update(index, formatDate(newValue, "yyyy-MM-dd"), 'birthday')
                                            }}
                                            defaultValue={item.birthday ? dayjs(item.birthday) : null}
                                        />
                                    </LocalizationProvider>
                                </div>

                            </div>
                            <div className="biography__input-wrap-without-date">
                                <FormControl className="biography__input-element-v2">
                                    <InputLabel style={{background:"white"}}> Выбрать континент</InputLabel>
                                    <Select
                                        value={item.continent}
                                        onChange={(value: any) => {
                                            update(index, value.target.value, "continent")
                                            getCountries(value.target.value, index)
                                        }}
                                    >
                                        {props.continents.map((cont: any, i) => {
                                            return (<MenuItem value={cont.title} key={i}>{cont.title}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>

                                <FormControl className="biography__input-element-v2">
                                    <InputLabel style={{background:"white"}}> Выбрать страну</InputLabel>
                                    <Select
                                        value={item.country}
                                        onChange={(value: any) => {
                                            update(index, value.target.value, "country")
                                        }}
                                        disabled={props.formValue[index].continent === null}
                                    >
                                        {countries.filter(item => item.index === index).map((countr: any, i) => {
                                            return (<MenuItem value={countr.guid} key={i}>{countr.title}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>

                                <FormControl className="biography__input-element-v2">
                                    {/*<InputLabel style={{background:"white"}}> Выбрать город</InputLabel>*/}
                                    {/*<Select*/}
                                    {/*    value={item.city}*/}
                                    {/*    onChange={(value: any) => {*/}
                                    {/*        update(index, value.target.value, "city")*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    <MenuItem value={"Первый"}>Первый</MenuItem>*/}
                                    {/*    <MenuItem value={"Второй"}>Второй</MenuItem>*/}
                                    {/*    <MenuItem value={"Третий"}>Третий</MenuItem>*/}
                                    {/*</Select>*/}
                                    <TextField
                                        value={item.city}
                                        label={'Введите город'}
                                        onChange={(value: any) => {
                                            update(index, value.target.value, "city")
                                        }}
                                    />
                                </FormControl>
                                <div className="date-v2" id="imaginary-block" style={{width: "100%"}}></div>
                            </div>
                        </div>
                    </li>
                ))
            }
        </>
    )
}
