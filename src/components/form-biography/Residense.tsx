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
import {IBiography, IResidence} from "@/modals/Biography";
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
    formValue: IResidence[],
    setFormValue: Function,
    continents: any[]
}


export default function Residence(props: Props) {
    const [countries, setCountries] = useState<any[]>([])
    // const [residence, setResidence] = useState([{continent: '', country: '', city: '', yearFrom: '', yearTo: ''}]);


    const getCountries = (continent: string, index: number) => {
        getCountry(continent)
            .then((response) => {
                setCountries((state) => [...state, ...response.data.map((obj: any) => ({ ...obj, index: index }))])
            })
    }

    const add = () => {
        // props.setFormValue((state: IBiography) => ({...state, residence:
        //         [...state.residence, {
        //             continent: null,
        //             country: null,
        //             city: null,
        //             yearFrom: null,
        //             yearTo: null
        //         }]
        // }))
        props.setFormValue((residence: IResidence[]) => [...residence, {continent: '', country: '', city: '', yearFrom: '', yearTo: ''}]);
        // setResidence(residence => [...residence, {continent: '', country: '', city: '', yearFrom: '', yearTo: ''}]);
    }

    const remove = (index: number) => {
        // props.setFormValue((state: IBiography) => ({
        //     ...state,
        //     residence: state.residence.filter((_, i) => index !== i)
        // }))
        props.setFormValue((residence: IResidence[]) => residence.filter((_, i) => index !== i));
        // setResidence(residence => residence.filter((_, i) => index !== i));
    }

    const update = (index: number, value: string, name: string) => {
        // props.setFormValue((state: IBiography) => ({...state,
        //     residence: state.residence.map((q, i) => (
        //         i === index ? { ...q, [name]: value } : q
        //     ))
        // }))
        props.setFormValue((residence: IResidence[]) =>
            residence.map((q, i) =>
                (i === index ? { ...q, [name]: value } : q)));
        // setResidence(residence =>
        //     residence.map((q, i) =>
        //         (i === index ? { ...q, [name]: value } : q)));
    }

    const getYear = (year: any) => {
        return year?.$y;
    }

    return (
        <>
            {
                props.formValue.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <p>
                                Место жительство
                            </p>
                            <div>
                                <a className="my-anchor-element" ><HelpOutlineRoundedIcon /></a>
                                <Tooltip anchorSelect=".my-anchor-element">
                                    :(
                                </Tooltip>
                                {index === 0 ? (
                                    <Button onClick={add}>
                                        <AddIcon />
                                    </Button>
                                ) : (
                                    <Button onClick={() => remove(index)}>
                                        <RemoveIcon />
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="biography__input">
                            <FormControl>
                                <InputLabel style={{background:"white"}}> Выбрать континент</InputLabel>
                                <Select
                                    value={props.formValue[index].continent}
                                    onChange={(value:any) => {
                                        update(index, value.target.value, "continent")
                                        getCountries(value.target.value, index)
                                    }}
                                >
                                    {props.continents.map((cont: any, i) => {
                                        return (<MenuItem value={cont.title} key={i}>{cont.title}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel style={{background:"white"}}> Выбрать страну</InputLabel>
                                <Select
                                    value={item.country}
                                    onChange={(value:any) => {
                                        update(index, value.target.value, "country")
                                    }}
                                    disabled={props.formValue[index].continent === null}
                                >
                                    {countries.filter(item => item.index === index).map((countr: any, i) => {
                                        return (<MenuItem value={countr.guid} key={i}>{countr.title}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl>
                                {/*<InputLabel style={{background:"white"}}> Выбрать город</InputLabel>*/}
                                {/*<Select*/}
                                {/*    value={props.formValue[index].city}*/}
                                {/*    onChange={(value:any) => {*/}
                                {/*        update(index, value.target.value, "city")*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    <MenuItem value={"Первый"}>Первый</MenuItem>*/}
                                {/*    <MenuItem value={"Второй"}>Второй</MenuItem>*/}
                                {/*    <MenuItem value={"Третий"}>Третий</MenuItem>*/}
                                {/*</Select>*/}
                                <TextField
                                    value={props.formValue[index].city}
                                    label={'Введите город'}
                                    onChange={(value: any) => {
                                        update(index, value.target.value, "city")
                                    }}
                                />
                            </FormControl>

                            <div className="date">
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                    <DatePicker
                                        // value={item.yearFrom}
                                        label={'Год с'}
                                        views={['year']}
                                        onChange={newValue => update(index, getYear(newValue), 'yearFrom')}
                                        defaultValue={item.yearFrom ? dayjs(item.yearFrom) : null}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                    <DatePicker
                                        label={'Год до'}
                                        views={['year']}
                                        onChange={newValue => update(index, getYear(newValue), 'yearTo')}
                                        defaultValue={item.yearTo ? dayjs(item.yearTo) : null}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </li>
                ))
            }
        </>
    )
}
