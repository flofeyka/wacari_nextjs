'use client'
import React, {useState} from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, CaretDownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import "./LeftMenu.css"
import {useRouter} from "next/navigation";


type MenuItem = Required<MenuProps>['items'][number];


const LeftMenu: React.FC = () => {
    const router = useRouter()

    const items: MenuItem[] = [
        {
            key: 'sub1',
            label: <div
                // style={{textDecoration: "underline"}}
                onClick={(key)=>{
                console.log("Евразия", key)
                key.stopPropagation()
                key.preventDefault()
                router.push('/catalog/evrasia')
            }}>
                Евразия
            </div> ,
            children: [
                {
                    key: 'g1',
                    label: <div onClick={(key)=>{
                        console.log("Россия", key)
                        key.stopPropagation()
                        key.preventDefault()
                        router.push('/catalog/evrasia')
                    }}>
                        Россия
                    </div>,
                    children: [
                        {
                            key: '1',
                            label: <div onClick={(key)=>{
                                console.log("Москва", key)
                                key.stopPropagation()
                                key.preventDefault()
                                router.push('/catalog/evrasia')
                            }}>
                                Москва
                            </div> },
                        {
                            key: '2',
                            label: <div onClick={(key)=>{
                                console.log("Питер", key)
                                key.stopPropagation()
                                key.preventDefault()
                                router.push('/catalog/evrasia')
                            }}>
                                Питер
                            </div>
                        },
                    ],
                },
                {
                    key: 'g2',
                    label: <div onClick={(key)=>{
                        console.log("Казахстан", key)
                        key.stopPropagation()
                        key.preventDefault()
                        router.push('/catalog/evrasia')
                    }}>
                        Казахстан
                    </div>,
                    children: [
                        { key: '3', label: 'Астана' },
                        { key: '4', label: 'Нурсултан' },
                    ],
                },
            ],
        },
        {
            key: 'sub2',
            label: <div onClick={(key) => {
                    console.log("Африка", key)
                    key.stopPropagation()
                    key.preventDefault()
                    router.push('/catalog/evrasia')
                }}>
                Африка
            </div>,
            children: [
                {
                    key: '5',
                    label: <div onClick={(key) => {
                        console.log("Республика Конго", key)
                        key.stopPropagation()
                        key.preventDefault()
                        router.push('/catalog/evrasia')
                    }}>
                        Республика Конго
                    </div>,
                },
                {
                    key: '6',
                    label: <div onClick={(key) => {
                        console.log("Лесото", key)
                        key.stopPropagation()
                        key.preventDefault()
                        router.push('/catalog/evrasia')
                    }}>
                        Лесото
                    </div>
                },
            ],
        },
        {
            key: 'sub4',
            label: <div onClick={(key) => {
                console.log("Северная Америка", key)
                key.stopPropagation()
                key.preventDefault()
                router.push('/catalog/evrasia')
            }}>
                Северная Америка
            </div>,
            children: [
                {
                    key: '9',
                    label: <div onClick={(key) => {
                            console.log("Северная Америка", key)
                            key.stopPropagation()
                            key.preventDefault()
                            router.push('/catalog/evrasia')
                        }}>
                            США
                        </div>
                },
                {
                    key: '10',
                    label: <div onClick={(key) => {
                        console.log("Канада", key)
                        key.stopPropagation()
                        key.preventDefault()
                        router.push('/catalog/evrasia')
                    }}>
                        Канада
                    </div>
                },
                {
                    key: '11',
                    label: <div onClick={(key) => {
                        console.log("Бермудские Острова", key)
                        key.stopPropagation()
                        key.preventDefault()
                        router.push('/catalog/evrasia')
                    }}>
                        Бермудские Острова
                    </div>
                },
            ],
        },
        {
            key: 'sub5',
            label: <div onClick={(key) => {
                    console.log("Южная Америка", key)
                    key.stopPropagation()
                    key.preventDefault()
                    router.push('/catalog/evrasia')
                }}>
                    Южная Америка
                </div> ,
            children: [
                {
                    key: '12',
                    label: <div onClick={(key) => {
                        console.log("Венесуэла", key)
                        key.stopPropagation()
                        key.preventDefault()
                        router.push('/catalog/evrasia')
                    }}>
                        Венесуэла
                    </div>
                },
                {
                    key: '13',
                    label: <div onClick={(key) => {
                        console.log("Колумбия", key)
                        key.stopPropagation()
                        key.preventDefault()
                        router.push('/catalog/evrasia')
                    }}>
                        Колумбия
                    </div>
                },
            ],
        },
        {
            key: 'sub6',
            label: <div onClick={(key) => {
                    console.log("Австралия", key)
                    key.stopPropagation()
                    key.preventDefault()
                    router.push('/catalog/evrasia')
                }}>
                    Австралия
                </div>,
            children: [
                {
                    key: '14',
                    label: <div onClick={(key) => {
                        console.log("Виктория", key)
                        key.stopPropagation()
                        key.preventDefault()
                        router.push('/catalog/evrasia')
                    }}>
                        Виктория
                    </div>
                },
                {
                    key: '15',
                    label: <div onClick={(key) => {
                        console.log("Квинсленд", key)
                        key.stopPropagation()
                        key.preventDefault()
                        router.push('/catalog/evrasia')
                    }}>
                        Квинсленд
                    </div>
                },
            ],
        },
        {
            key: 'sub7',
            label: <div onClick={(key) => {
                console.log("Антарктида", key)
                key.stopPropagation()
                key.preventDefault()
                router.push('/catalog/evrasia')
            }}>
                Антарктида
            </div>,
        },
    ];

    // const onClick: MenuProps['onClick'] = (e) => {
    //     console.log('click ', e);
    // };

    return (
        <Menu
            style={{zIndex:"-1000"}}
            // onClick={onClick}
            mode="inline"
            items={items}
            id="left-menu-component"
            // style={{ width: 256}}
            expandIcon={
                <div
                    // style={{zIndex:"1000"}}
                    onClick={(key)=>{
                        console.log("left menu expandIcon", key)
                    }}
                >
                    <CaretDownOutlined />
                </div>
            }
        />
    );
};

export default LeftMenu;