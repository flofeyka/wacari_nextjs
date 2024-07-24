
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
import {IAwards, IBiography} from "@/modals/Biography";


interface Props{
    formValue: IAwards[],
    setFormValue: Function
}

export default function Awards(props: Props) {

    const add = () => {
        // props.setFormValue((state: IBiography) => ({...state, awards:
        //         [...state.awards, {
        //             text: null,
        //         }]
        // }))
        props.setFormValue((awards: IAwards[]) =>
            [...awards, {
                title: null,
            }])
    }

    const remove = (index: number) => {
        // props.setFormValue((state: IBiography) => ({
        //     ...state,
        //     awards: state.awards.filter((_, i) => index !== i)
        // }))
        props.setFormValue((awards: IAwards[]) => awards.filter((_, i) => index !== i));
    }

    const update = (index: number, value: string, name: string) => {
        // props.setFormValue((state: IBiography) => ({...state,
        //     awards: state.awards.map((q, i) => (
        //         i === index ? { ...q, [name]: value } : q
        //     ))
        // }))
        props.setFormValue((awards: IAwards[]) => awards.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }

    return (
        <>
            {
                props.formValue.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <p>
                                Награды
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
                                    label={'Награда'}
                                    value={item.title}
                                    onChange={e => update(index, e.target.value, 'title')}
                                />
                        </div>
                    </li>
                ))
            }
        </>
    )
}
