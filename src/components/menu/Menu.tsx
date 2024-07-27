'use client'
import "./Menu.css"
import Link from "next/link";
import { Modal, Button, Input, Drawer, Checkbox, Avatar, notification } from 'antd';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InfoCircleOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import type { CheckboxProps } from 'antd';
import { jwtDecode } from "jwt-decode";
import { useQuery } from "react-query";
import { createToken, refreshToken } from "@/api/token/token";
import { createProfile } from "@/api/registration/registration";
import { resetPassword } from "@/api/resetPassword/resetPassword";
import Image from "next/image";


const Menu = () => {
    const [modalLogin, setModalLogin] = useState(false);
    const [loginType, setLoginType] = useState<string>("LOGIN")
    const [loginEmail, setLoginEmail] = useState<string>("")
    const [loginPassword, setLoginPassword] = useState<string>("")
    const [registerEmail, setRegisterEmail] = useState<string>("")
    const [resetPasswordEmail, setResetPasswordEmail] = useState<string>("")
    const [registerPassword, setRegisterPassword] = useState<string>("")
    const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState<string>("")
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [tokenRefresh, setTokenRefresh] = useState<any>()
    const [openDrawer, setOpenDrawer] = useState(false);
    const [agreements, setAgreements] = useState<boolean>(false)
    const router = useRouter()
    const [api, contextHolder] = notification.useNotification();


    useEffect(() => {
        isTokenExpired(localStorage.getItem("accessToken") || "aaa", localStorage.getItem("refreshToken") || "aaa")
        setAccessToken(localStorage.getItem("accessToken"))
        setTokenRefresh(localStorage.getItem("refreshToken"))
    }, []);

    useEffect(() => {
        if (localStorage.getItem("refreshToken")) {
            refreshToken(localStorage.getItem("refreshToken") || "").then((response) => {
                localStorage.setItem("accessToken", response.data.token);
                localStorage.setItem("refreshToken", response.data.refreshToken);
            })
        }
    }, [])

    const isTokenExpired = async (token: string, token2: string) => {
        if (!token) return true;
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp === undefined) return;
            // console.log("currentTime", currentTime)
            // console.log("decodedToken.exp", decodedToken.exp)
            if (decodedToken.exp > currentTime) {
                console.log("токен жив")
            }
            if (decodedToken.exp < currentTime) {
                // console.log("tokenRefresh", token2)
                await refreshToken(token2)
                    .then((response) => {
                        setAccessToken(response.data.token)
                        setTokenRefresh(response.data.refreshToken)
                        localStorage.setItem('accessToken', response.data.token);
                        localStorage.setItem('refreshToken', response.data.refreshToken);
                    })
            }
            return decodedToken.exp > currentTime;
        } catch (error) {
            // console.error('Error decoding token:', error);
            return true;
        }
    };

    setInterval(() => {
        isTokenExpired(accessToken || "aaa", tokenRefresh || "aaa")
    }, 100000);

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         const token = localStorage.getItem('token');
    //         if (await isTokenExpired(accessToken || "aaa", tokenRefresh || "aaa")) {
    //             localStorage.removeItem('token');
    //             router.push('/login');
    //         } else {
    //             setUser(JSON.parse(localStorage.getItem('user')));
    //         }
    //     } else {
    //         router.push('/login');
    //     }
    // }, [router]);

    const showModalLogin = () => { setModalLogin(true); };

    const handleOkModalLogin = async () => {
        if (loginType === "LOGIN") {
            await createToken(loginEmail, loginPassword)
                .then((response) => {
                    console.log("res", response)
                    setAccessToken(response.data.token)
                    setTokenRefresh(response.data.refreshToken)
                    localStorage.setItem('accessToken', response.data.token);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                })
                .catch((error) => {
                    console.log("error", error)
                })
                .finally(() => {
                    setModalLogin(false);
                    setLoginType("LOGIN")
                })
        }
        else if (loginType === "REGISTRATION") {
            await createProfile(registerEmail, registerPassword, registerPasswordConfirm)
                .then((response) => {
                    console.log("res", response)
                })
                .catch((error) => {
                    console.log("error", error)
                })
                .finally(() => {
                    setModalLogin(false);
                    setLoginType("LOGIN")
                })
        }
        else if (loginType === "RESET_PASSWORD") {
            await resetPassword(resetPasswordEmail)
                .then((response) => {
                    api.open({
                        message: 'Вам выслали письмо на почту',
                        // description: "",
                        icon: <InfoCircleOutlined style={{ color: '#108ee9' }} />,
                    });
                })
                .finally(() => {
                    setModalLogin(false);
                    setLoginType("LOGIN")
                })
        }
    };

    const handleCancelModalLogin = () => {
        setLoginType("LOGIN")
        setModalLogin(false);
    };

    const onChangeCheckboxAgreements: CheckboxProps['onChange'] = (e) => {
        setAgreements(e.target.checked)
    };

    const showDrawer = () => {
        setOpenDrawer(true);
    };

    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };

    // console.log("accessToken", accessToken)

    return (
        <div id="menu-component">
            {contextHolder}
            <Modal
                title={<h2>{loginType === "LOGIN" ? "Вход" : loginType === "RESET_PASSWORD" ? "Сброс пароля" : "Регистрация"}</h2>}
                open={modalLogin}
                onOk={handleOkModalLogin}
                onCancel={handleCancelModalLogin}
                footer={[
                    <Button key="back" onClick={handleCancelModalLogin}>Отменить</Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleOkModalLogin}
                        disabled={!agreements && loginType === "REGISTRATION"}
                    >
                        Подтвердить
                    </Button>,
                ]}
            >
                {loginType === "LOGIN" ?
                    <>
                        <div className="text-login">Электронная почта</div>
                        <Input
                            placeholder="Электронная почта"
                            className="input-login"
                            onChange={(value: any) => {
                                setLoginEmail(value.target.value)
                            }}
                        />
                        <div className="text-login">Пароль</div>
                        <Input.Password
                            placeholder="Введите пароль"
                            className="input-login"
                            onChange={(value: any) => {
                                setLoginPassword(value.target.value)
                            }}
                        />
                        <div id="registration-button" onClick={() => {
                            setLoginType("REGISTRATION")
                        }}>
                            Нет профиля?
                        </div>
                        <div id="registration-button" onClick={() => {
                            setLoginType("RESET_PASSWORD")
                        }}>
                            Забыли пароль?
                        </div>
                    </>
                    :
                    loginType === "REGISTRATION" ?
                        <>
                            <div className="text-login">Электронная почта</div>
                            <Input
                                placeholder="Электронная почта"
                                className="input-login"
                                onChange={(value: any) => { setRegisterEmail(value.target.value) }}
                            />
                            <div className="text-login">Пароль</div>
                            <Input.Password
                                placeholder="Введите пароль"
                                className="input-login"
                                onChange={(value: any) => { setRegisterPassword(value.target.value) }}
                            />
                            <div className="text-login">Введите пароль повторно</div>
                            <Input.Password
                                placeholder="Введите пароль"
                                className="input-login"
                                onChange={(value: any) => { setRegisterPasswordConfirm(value.target.value) }}
                            />
                            <Checkbox value={agreements} onChange={onChangeCheckboxAgreements}>
                                Нажимая на кнопку, я принимаю <Link href="/agreements">условия соглашения</Link>.
                            </Checkbox>
                        </>
                        :
                        <>
                            <div className="text-login">Электронная почта</div>
                            <Input
                                placeholder="Электронная почта"
                                className="input-login"
                                onChange={(value: any) => {
                                    setResetPasswordEmail(value.target.value)
                                }}
                            />
                        </>
                }
            </Modal>
            <Link href="/">
                <img id="menu-logo" src="/logo.png" alt="" height={100} />
            </Link>
            <div id="menu-wrapper">
                {!accessToken ?
                    <div id="menu-auth">
                        <div className="menu-item"
                            onClick={() => {
                                showModalLogin()
                                setLoginType("REGISTRATION")
                            }}
                        >
                            Зарегистрироваться
                        </div>
                        <Button id="login-button" type="primary" onClick={() => {
                            showModalLogin()
                            setLoginType("LOGIN");
                        }}>
                            Войти
                        </Button>
                        {/* <div id="menu-favicon">
                        <img src="/title.svg" id="menu-favicon-img" alt="favicon"/>
                    </div> */}
                    </div>
                    :
                    <div>
                        <Link style={{ marginRight: "20px" }} className="menu-item" href="/favourites">
                            Избранное
                        </Link>
                        <Avatar size={64} icon={<UserOutlined />} style={{ marginRight: "50px" }} className="menu-avatar" />
                        <MenuOutlined onClick={showDrawer} />
                        <Drawer
                            title={<span style={{ fontSize: "20px", color: "gray" }}>Меню</span>}
                            onClose={onCloseDrawer}
                            open={openDrawer}
                            className="rightMenu"
                        >
                            <p>
                                <Link className="menu-item-drawer" href="/myBiography" onClick={onCloseDrawer}>
                                    Моя биография
                                </Link>
                            </p>
                            <p>
                                <Link className="menu-item-drawer" href="/rules" onClick={onCloseDrawer}>
                                    Правило и руководство
                                </Link>
                            </p>
                            <p>
                                <Link className="menu-item-drawer" href="/help" onClick={onCloseDrawer}>
                                    Помогите нам стать лучше
                                </Link>
                            </p>
                            <p>
                                <Link className="menu-item-drawer" href="/setting" onClick={onCloseDrawer}>
                                    Настройки
                                </Link>
                            </p>
                            <p
                                className="menu-item-drawer"
                                onClick={() => {
                                    localStorage.removeItem("accessToken");
                                    localStorage.removeItem("refreshToken");
                                    onCloseDrawer()
                                    setAccessToken("")
                                    setTokenRefresh("")
                                    router.push('/')
                                }}
                            >
                                Выйти
                            </p>
                        </Drawer>
                    </div>
                }
            </div>
        </div>
    )
}

export default Menu;
