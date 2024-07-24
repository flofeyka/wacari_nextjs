'use client'
import React, { useState } from "react"
import { Tooltip } from 'react-tooltip'

import { Button, FormControl, Select, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';

import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {IBiography, ICitizenship} from "@/modals/Biography";


interface Props{
    formValue: ICitizenship[],
    setFormValue: Function,
    continents: any[]
}

export default function Citizenship(props: Props) {
    // const [citizenship, setCitizenship] = useState([{ citizenship: ''}]);


    const add = () => {
        // props.setFormValue((state: IBiography) => ({...state, citizenship: [...state.citizenship, { citizenship: null}]}))
        props.setFormValue((citizenship: ICitizenship[]) => [...citizenship, { country: ''}]);
        // setCitizenship(citizenship => [...citizenship, { citizenship: ''}]);
    }

    const remove = (index: number) => {
        // props.setFormValue((state: IBiography) => ({
        //     ...state,
        //     citizenship: state.citizenship.filter((_, i) => index !== i)
        // }))
        props.setFormValue((citizenship: ICitizenship[]) => citizenship.filter((_, i) => index !== i));
        // setCitizenship(citizenship => citizenship.filter((_, i) => index !== i));
    }

    const update = (index: number, value: string, name: string) => {
        // props.setFormValue((state: IBiography) => ({...state,
        //     citizenship: state.citizenship.map((q, i) => (
        //         i === index ? { ...q, [name]: value } : q
        //     ))
        // }))
        props.setFormValue((citizenship: ICitizenship[]) => citizenship.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
        // setCitizenship(citizenship => citizenship.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }


    return (
        <>
            {
                props.formValue.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <p>
                                Гражданство
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
                                <InputLabel style={{background:"white"}}>Гражданство</InputLabel>
                                <Select
                                    value={props.formValue[index].country}
                                    onChange={(value:any) => {
                                        update(index, value.target.value, "country")
                                    }}
                                >
                                    {props.continents.map((cont: any, i) => {
                                        return (<MenuItem value={cont.guid} key={i}>{cont.title}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </li>
                ))
            }
        </>
    )
}