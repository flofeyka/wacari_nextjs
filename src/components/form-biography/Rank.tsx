'use client'
import { useState } from 'react';

import { Button, TextField } from '@mui/material';
import { Tooltip } from 'react-tooltip'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/ru";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import {IBiography, IRank} from "@/modals/Biography";


interface Props{
    formValue: IRank[],
    setFormValue: Function
}

export default function Rank(props: Props) {

    const add = () => {
        // props.setFormValue((state: IBiography) => ({...state, ranks:
        //         [...state.ranks, {
        //             rank: null,
        //             yearFrom: null,
        //         }]
        // }))
        props.setFormValue((ranks: IRank[]) =>
                [...ranks, {
                    rank: null,
                    yearFrom: null,
                }])
    }

    const remove = (index: number) => {
        // props.setFormValue((state: IBiography) => ({
        //     ...state,
        //     ranks: state.ranks.filter((_, i) => index !== i)
        // }))
        props.setFormValue((ranks: IRank[]) => ranks.filter((_, i) => index !== i));
    }

    const update = (index: number, value: string, name: string) => {
        // props.setFormValue((state: IBiography) => ({...state,
        //     ranks: state.ranks.map((q, i) => (
        //         i === index ? { ...q, [name]: value } : q
        //     ))
        // }))
        props.setFormValue((ranks: IRank[]) => ranks.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
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
                                Звания
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
                            <TextField
                                label={'Звание'}
                                value={item.rank}
                                onChange={(e) => update(index, e.target.value, 'rank')}
                            />

                            <div className="date" id="education-date-id">
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                    <DatePicker
                                        label={'Год с'}
                                        views={['year']}
                                        onChange={newValue => update(index, getYear(newValue), 'yearFrom')}
                                        // defaultValue={item.year ? dayjs(item.year) : null}
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
