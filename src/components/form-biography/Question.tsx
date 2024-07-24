'use client'
import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { Button, TextField } from '@mui/material';
import {IBiography, IQuestions} from "@/modals/Biography";


interface Props{
    formValue: IQuestions[],
    setFormValue: Function
}

export default function Question(props: Props) {

    const add = () => {
        // props.setFormValue((state: IBiography) => ({...state, questions:
        //         [...state.questions, {
        //             question: null,
        //             answer: null,
        //         }]
        // }))
        props.setFormValue( (questions: IQuestions[])=>
            [...questions, {
                question: null,
                answer: null,
            }])
    }

    const remove = (index: number) => {
        // props.setFormValue((state: IBiography) => ({
        //     ...state,
        //     questions: state.questions.filter((_, i) => index !== i)
        // }))
        props.setFormValue((questions: IQuestions[]) => questions.filter((_, i) => index !== i));
    }

    const update = (index: number, value: string, name: string) => {
        // props.setFormValue((state: IBiography) => ({...state,
        //     questions: state.questions.map((q, i) => (
        //         i === index ? { ...q, [name]: value } : q
        //     ))
        // }))
        props.setFormValue((questions: IQuestions[]) => questions.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }

    return (
        <ul>
            {
                props.formValue.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <TextField
                                label={'Вопрос'}
                                value={item.question}
                                onChange={(e) => update(index, e.target.value, 'question')}
                            />
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

                        <div className="biography__input">
                            <TextField
                                label={'Ответ'}
                                value={item.answer}
                                onChange={(e) => update(index, e.target.value, 'answer')}
                            />
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}
