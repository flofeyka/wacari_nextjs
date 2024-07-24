'use client'
import {Input, Button} from "antd";
import "./PasswordResetPage.css"
import {useState} from "react";
import {confirmNewPassword} from "@/api/resetPassword/resetPassword";
import {useRouter} from "next/navigation";


const PasswordResetPage = (profileID: any) => {
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const router = useRouter();


    const handleSubmit = async () => {
        await confirmNewPassword(profileID.profileID, newPassword, newPasswordConfirm)
            .then((repsonse) => {
                router.push("/")
            })
            .catch((error)=> {
                console.log(error)
            })
    }

    return (
        <div id="password-reset-page">
            <div id="password-reset-wrapper">
                <div className="text-login">Новый пароль</div>
                <Input.Password
                    placeholder="Введите пароль"
                    className="input-password"
                    onChange={(value: any)=>{
                        setNewPassword(value.target.value)
                    }}
                />
                <div className="text-login" style={{marginTop:"25px"}}>Повторный ввод пароля</div>
                <Input.Password
                    placeholder="Введите пароль"
                    className="input-password"
                    onChange={(value: any)=>{
                        setNewPasswordConfirm(value.target.value)
                    }}
                />
                <div style={{marginTop:"25px", display:"flex", justifyContent:"center"}}>
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                    >
                        Подтвердить
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PasswordResetPage;