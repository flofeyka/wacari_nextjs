'use client'
import "./LeftMenuV2.css"
import {useState} from "react";


const items = [
    {
        key: 'sub1',
        label: 'Евразия',
        children: [
            {
                key: 'g1',
                label: 'Россия',
                children: [
                    { key: '1', label: 'Москва' },
                    { key: '2', label: 'Санкт-Петербург' },
                ],
            },
            {
                key: 'g2',
                label: 'Казахстан',
                children: [
                    { key: '3', label: 'Астана' },
                    { key: '4', label: 'Нурсултан' },
                ],
            },
        ],
    },
    {
        key: 'sub2',
        label: 'Африка',
        children: [
            { key: '5', label: 'Республика Конго',},
            { key: '6', label: 'Лесото' },
        ],
    },
    {
        key: 'sub4',
        label: 'Северная Америка',
        children: [
            { key: '9', label: 'США' },
            { key: '10', label: 'Канада' },
            { key: '11', label: 'Бермудские Острова' },
        ],
    },
    {
        key: 'sub5',
        label: 'Южная Америка',
        children: [
            { key: '12', label: 'Венесуэла' },
            { key: '13', label: 'Колумбия' },
        ],
    },
    {
        key: 'sub6',
        label: 'Австралия',
        children: [
            { key: '14', label: 'Виктория' },
            { key: '15', label: 'Квинсленд' },
        ],
    },
    {
        key: 'sub7',
        label: 'Антарктида',
    },
];

const LeftMenuV2 = () => {
    const [eurasia, setEurasia] = useState<boolean>(false)


    return (
        <div>
            <div id="eurasia">
                <div onClick={()=>{setEurasia(true)}}>Евразия</div>
                {eurasia?
                    <div>
                        <div>
                            <div>Россия</div>
                            <div>
                                <div>Москва</div>
                                <div>Питер</div>
                            </div>
                        </div>
                        <div>
                            <div>Казахстан</div>
                            <div>
                                <div>Астана</div>
                                <div>Нурсултан</div>
                            </div>
                        </div>
                    </div>
                :null}
            </div>
        </div>
    )
}

export default LeftMenuV2;