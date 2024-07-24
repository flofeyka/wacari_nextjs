'use client'
import { useState } from "react"
import { Tooltip } from 'react-tooltip'

import { Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import dayjs from "dayjs";
import {IBiography, ICompany} from "@/modals/Biography";


interface Props{
    formValue: ICompany[],
    setFormValue: Function
}

export default function Company(props: Props) {


    const add = () => {
        // props.setFormValue((state: IBiography) => ({...state, company:
        //         [...state.company, {
        //             text: null,
        //             job_title: null,
        //             yearFrom: null,
        //             yearTo: null
        //         }]
        // }))
        props.setFormValue((company: ICompany[]) =>
                [...company, {
                    text: null,
                    job_title: null,
                    yearFrom: null,
                    yearTo: null
                }])
    }

    const remove = (index: number) => {
        // props.setFormValue((state: IBiography) => ({
        //     ...state,
        //     company: state.company.filter((_, i) => index !== i)
        // }))
        props.setFormValue((company:ICompany[]) => company.filter((_, i) => index !== i));
    }

    const update = (index: number, value: string, name: string) => {
        // props.setFormValue((state: IBiography) => ({...state,
        //     company: state.company.map((q, i) => (
        //         i === index ? { ...q, [name]: value } : q
        //     ))
        // }))
        props.setFormValue((company: ICompany[]) => company.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
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
                                Компания
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
                            <div  className="biography__input_wrap">
                                <TextField
                                    label={'Компания'}
                                    value={item.text}
                                    onChange={e => update(index, e.target.value, 'text')}
                                />
                                <TextField
                                    label={'Должность'}
                                    value={item.job_title}
                                    onChange={e => update(index, e.target.value, 'job_title')}
                                />
                            </div>

                            <div className="date" id="education-date-id">
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                    <DatePicker
                                        label={'Год с'}
                                        views={['year']}
                                        onChange={newValue => update(index, getYear(newValue), 'yearFrom')}
                                        // defaultValue={item.yearS ? dayjs(item.yearS) : null}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                    <DatePicker
                                        label={'Год до'}
                                        views={['year']}
                                        onChange={newValue => update(index, getYear(newValue), 'yearTo')}
                                        // defaultValue={item.yearT ? dayjs(item.yearS) : null}
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
