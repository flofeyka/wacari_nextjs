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

export default function Company() {
    const [company, seCompany] = useState([{ text: '', job_title: '', yearS: '', yearT: '' }]);

    const add = () => {
        seCompany(company => [...company, { text: '', job_title: '', yearS: '', yearT: '' }]);
    }

    const remove = (index) => {
        seCompany(company => company.filter((_, i) => index !== i));
    }

    const update = (index, value, name) => {
        seCompany(company => company.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }

    const getYear = (year) => {
        return year?.$y;
    }

    return (
        <>
            {
                company.map((item, index) => (
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
                            <TextField
                                label={'Компания'}
                                value={item.text}
                                onChange={e => update(index, e.target.value, 'text')}
                            />
                        </div>
                    </li>
                ))
            }
        </>
    )
}
