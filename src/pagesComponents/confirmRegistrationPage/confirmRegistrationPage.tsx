'use client'
import "./confirmRegistrationPage.css"
import {useEffect, useState} from "react";
import {LoadingOutlined, CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {confirmProfile} from "@/api/registration/registration";


const ConfirmRegistrationPage = (confirmID: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    console.log("profileID.profileID", confirmID.confirmID)

    const confirm = async() => {
        await confirmProfile(confirmID.confirmID)
            .then((response) => {
                setLoading(false);
                setError(false)
            })
            .catch((err)=>{
                console.log(err)
                setLoading(false);
                setError(true)
            })
    }

    useEffect( () => {
        confirm()
    }, []);

    return (
        <div className="confirm-registration-page">
            <div className="confirm-registration-wrapper">
                {loading ?
                    <>
                        <div className="confirm-registration-icon" style={{color:"blue"}}><LoadingOutlined /></div>
                        <div>Подтверждение регистрации</div>
                    </>
                    :
                    error ?
                        <>
                            <div className="confirm-registration-icon" style={{color:"red"}}><CloseOutlined /></div>
                            <div>Ошибка регистрации</div>
                        </>
                        :
                        <>
                            <div className="confirm-registration-icon" style={{color:"blue"}}><CheckOutlined/></div>
                            <div>Регистрация подтверждена</div>
                        </>
                }
            </div>
        </div>
    )
}

export default ConfirmRegistrationPage;