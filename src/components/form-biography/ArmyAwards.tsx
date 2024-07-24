'use client'
import { useState } from 'react';

import { Button, TextField } from '@mui/material';
import { Tooltip } from 'react-tooltip'
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {IArmyAwards, IBiography} from "@/modals/Biography";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";


interface Props{
    formValue: IArmyAwards[],
    setFormValue: Function
}

export default function ArmyAwards(props: Props) {

    const add = () => {
        // props.setFormValue((state: IBiography) => ({...state, army_awards:
        //         [...state.army_awards, {
        //             text: null,
        //         }]
        // }))
        props.setFormValue((army_awards: IArmyAwards[]) =>
                [...army_awards, {
                    text: null,
                }])
    }

    const remove = (index: number) => {
        // props.setFormValue((state: IBiography) => ({
        //     ...state,
        //     army_awards: state.army_awards.filter((_, i) => index !== i)
        // }))
        props.setFormValue((army_awards: IArmyAwards[]) => army_awards.filter((_, i) => index !== i));
    }

    const update = (index: number, value: string, name: string) => {
        // props.setFormValue((state: IBiography) => ({...state,
        //     army_awards: state.army_awards.map((q, i) => (
        //         i === index ? { ...q, [name]: value } : q
        //     ))
        // }))
        props.setFormValue((army_awards: IArmyAwards[]) => army_awards.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }

    return (
        <>
            {
                props.formValue.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <p>
                                Награды и премии
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
                                label={'Награды и премии'}
                                value={item.text}
                                onChange={(e) => update(index, e.target.value, 'text')}
                            />
                        </div>
                    </li>
                ))
            }
        </>
    )
}
