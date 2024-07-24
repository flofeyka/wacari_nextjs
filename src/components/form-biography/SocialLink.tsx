'use client'
import { useState } from "react"
import { Tooltip } from 'react-tooltip'
import { TextField } from '@mui/material';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import {IBiography, ISocialLink} from "@/modals/Biography";


interface Props{
    formValue: ISocialLink[],
    setFormValue: Function,
    name: {text: string, constant: string},
}

export default function SocialLink(props: Props) {

    const update = (value: string) => {
        // props.setFormValue((state: IBiography) => ({...state,
        //     social_link: state.social_link.map(item=>
        //         item.constant === props.name.constant ?
        //             {text: value, constant: item.constant}
        //             : item)
        // }));
        props.setFormValue((((item: any)=>
                item.constant === props.name.constant ?
                    {text: value, constant: item.constant}
                    : item)
        ));
    }

    return (
        <li>
            <div className="biography__name">
                <p>
                    {props.name.text}
                </p>
                <a className="my-anchor-element" ><HelpOutlineRoundedIcon /></a>
                <Tooltip anchorSelect=".my-anchor-element">
                    :(
                </Tooltip>
            </div>

            <div className="biography__input">
                <TextField
                    label={props.name.text}
                    value={props.formValue.find(item => item.constant === props.name.constant)?.text}
                    onChange={value => update(value.target.value)}
                />
            </div>
        </li>
    )
}
