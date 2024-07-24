'use client'
import { useState } from "react"
import { Tooltip } from 'react-tooltip'

import { Button, TextField } from '@mui/material';

import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Input({ name, addInput }) {
    const [data, seData] = useState([{ text: '' }]);

    const add = () => {
        seData(data => [...data, { text: '' }]);
    }

    const remove = (index) => {
        seData(data => data.filter((_, i) => index !== i));
    }

    const update = (index, value, name) => {
        seData(data => data.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }

    // let arr = [<Button onClick={add}>
    //     <AddIcon />
    // </Button>];
    const arr = <Button onClick={add}>
        <AddIcon />
    </Button>;
    if (addInput) {
        arr.push(
            <Button onClick={() => remove(index)}>
                <RemoveIcon />
            </Button>
        )
    }

    return (
        <>
            {
                data.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <p>
                                {name}
                            </p>
                            <div>
                                <a className="my-anchor-element" ><HelpOutlineRoundedIcon /></a>
                                <Tooltip anchorSelect=".my-anchor-element">
                                    :(
                                </Tooltip>
                            </div>
                        </div>

                        <div className="biography__input">
                            <TextField
                                label={name}
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
