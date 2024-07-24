'use client'
import "./HomePage.css"
import LeftMenu from "@/components/leftMenu/LeftMenu";
import {
    Button,
    Input,
    Select,
    Modal,
    Image,
    Divider,
    notification,
    Space,
    Checkbox,
    type CheckboxProps
} from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import type { PaginationProps } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, GroupOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import Link from "next/link";
import PeopleList from "@/components/peopleList/PeopleList";
import {useRouter} from "next/navigation";
import GlobeComponent from "@/components/globe/Globe";
import MtcPeopleList from "@/components/peopleList/MtcPeopleList";
// import ReactGlobe from "react-globe";
import { InfoCircleOutlined } from '@ant-design/icons';
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "@/api/token/token";
import { getBiographiesList } from "@/api/biography/biography";
import Biographies from "@/components/biographies/Biographies";
import { IBiographyList } from "@/modals/Biography";


const { Search } = Input;

const HomePage = () => {
    const [modalLogin, setModalLogin] = useState<boolean>(false);
    const [loginType, setLoginType] = useState<string>("LOGIN")
    const [agreements, setAgreements] = useState<boolean>(false)
    const [accessToken, setAccessToken] = useState<string|null>("")
    const [tokenRefresh, setRefreshToken] = useState<string|null>("");
    const router = useRouter()
    const [api, contextHolder] = notification.useNotification();

    const [biographiesData, setBiographiesData] = useState<{data: IBiographyList[], totalItemCount: number, limit: number}>({
        data: [],
        totalItemCount: 0,
        limit: 0
    });


    useEffect(() => {
        const fetchBiographies = async () => {
            const data = await getBiographiesList(localStorage.getItem("accessToken") || undefined);
            console.log(data);
            setBiographiesData(data);
        }

        fetchBiographies();
    }, [])


    const openNotification = () => {
        api.open({
            message: 'Для создания биографии необходимо войти в систему',
            description:
                'Попробуйте обновить страницу, если вы уже вошли в систему (далее будет поправлено)',
            icon: <InfoCircleOutlined style={{ color: '#108ee9' }} />,
        });
    };

    // setInterval(() => {
    //     setUpdate(update + 1)
    // }, 5000);

    useEffect(() => {
        setAccessToken(localStorage.getItem("accessToken") || "")
    }, []);

    const showModalLogin = () => {
        setModalLogin(true);
    };

    const handleOkModalLogin = () => {
        setModalLogin(false);
        setLoginType("LOGIN")
    };

    const handleCancelModalLogin = () => {
        setModalLogin(false);
        setLoginType("LOGIN")
    };

    const onChangeCheckboxAgreements: CheckboxProps['onChange'] = (e) => {
        setAgreements(e.target.checked)
    };


    return (
        <div id="home-page-component">

            <Modal
                title={<h2>{loginType==="LOGIN"?"Вход":"Регистрация"}</h2>}
                open={modalLogin}
                onOk={handleOkModalLogin}
                onCancel={handleCancelModalLogin}
                footer={[
                    <Button key="back" onClick={handleCancelModalLogin}>Отменить</Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleOkModalLogin}
                        disabled={!agreements && loginType==="REGISTRATION"}
                    >
                        Подтвердить
                    </Button>,
                ]}
            >
                {loginType === "LOGIN"?
                    <>
                        <div className="text-login">Электронная почта</div>
                        <Input placeholder="Электронная почта" className="input-login"/>
                        <div className="text-login">Пароль</div>
                        <Input.Password placeholder="Введите пароль" className="input-login"/>
                        <div id="registration-button" onClick={()=>{setLoginType("REGISTRATION")}}>
                            Нет профиля?
                        </div>
                    </>
                    :
                    <>
                        <div className="text-login">Электронная почта</div>
                        <Input placeholder="Электронная почта" className="input-login"/>
                        <div className="text-login">Пароль</div>
                        <Input.Password placeholder="Введите пароль" className="input-login"/>
                        <div className="text-login">Введите пароль повторно</div>
                        <Input.Password placeholder="Введите пароль" className="input-login"/>
                        <Checkbox value={agreements} onChange={onChangeCheckboxAgreements}>
                            Нажимая на кнопку, я принимаю <Link href="/agreements">условия соглашения</Link>.
                        </Checkbox>
                    </>
                }
            </Modal>

            <div id="component-left-menu">
                <LeftMenu/>
            </div>
            <div id="home-page-wrapper">
                <div id="welcome">
                    <div id="welcome-text">
                        <span>Добро пожаловать в Вакарию.</span>
                        <span id="welcome-description">Свободный каталог биографий, каждый может создать биографию.</span>
                    </div>
                    <div id="create-biography">
                        <span>Сейчас в Вакарии 110 статей на русском языке</span>
                        <span id="create-biography-button">
                            {contextHolder}
                            <Button type="primary"
                                    onClick={()=>
                                        accessToken ?
                                            router.push('/biography/create')
                                            // : showModalLogin()
                                            : openNotification()
                                    }
                            >
                                Создать биографию
                            </Button>
                        </span>
                    </div>
                </div>
                {/*<ReactGlobe />*/}
                <div id="home-page-globe-component">
                    <GlobeComponent />
                </div>
                <Biographies biographiesData={biographiesData}/>
            </div>
        </div>
    )
}

export default HomePage