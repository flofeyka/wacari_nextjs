'use client'
import defaultLogo from "./default-avatar.png";
import "./edit.scss";

import NamePage from "@/components/namePage/NamePage";
import { Button, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "dayjs/locale/ru";
// import { useMask } from "@react-input/mask";
import {useEffect, useState} from 'react';
import dayjs from "dayjs";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import {editProfile, IProfileEdit} from "@/api/editProfile/editProfile";
import {getProfile} from "@/api/profile/profile";
// import Swal from "sweetalert2";
import { useQuery } from "react-query";


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export default function EditProfile({ user, profile }) {
    // const maskRef = useMask({ mask: '+7 (___) ___-__-__', replacement: { _: /\d/ } });

    const [data, setData] = useState({})
    const [image, setImage] = useState(profile.avatar ?? null);
    const [errors, setErrors] = useState({});
    const [accessToken, setAccessToken] = useState()


    useEffect(() => {
        setAccessToken(localStorage.getItem("accessToken"))
        profileData(localStorage.getItem("accessToken"))
    }, []);

    const profileData = async (token) => {
        await getProfile(token)
            .then((response)=>{
                console.log("getProfile", response)
                setData(response.data)
            })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onChangeForm('avatar', file);
            setImage(URL.createObjectURL(file));
        }
    };

    const onChangeForm = (key, value) => {
        setData(data => ({
            ...data,
            [key]: value
        }));
    };

    const submit = function (e) {
        e.preventDefault();

        axios.post(route('profile.update'), data, {
            headers: {
                "Content-type": "multipart/form-data",
            }
        })
            .then(r => {
                // Swal.fire({
                //     position: "top-end",
                //     icon: "success",
                //     title: r.data.desc,
                //     showConfirmButton: false,
                //     timer: 1500
                // });
            }).catch(error => setErrors(error.response.data.errors));
    }

    const onHandleSave = async () => {
        event.preventDefault();
        await editProfile(accessToken, data)
            .then((response) => {
                console.log("response editProfile", response)
            })
            .catch((error) => {
                console.log("error editProfile", error)
            })
        return false;
    }

    const zero = function (num) {
        if (num < 10) {
            return `0${num}`;
        }
        return num;
    }

    const date = function (date) {
        return `${date.$y}-${zero(date.$M)}-${zero(date.$D)}`;
    }

    console.log("data", data)

    return (
        <div className="profile-component">
            <div className="biography_component-left-menu">
                <LeftMenu/>
            </div>
            <div style={{width: "100%", padding:"20px"}}>
            <NamePage name={'Настройки'} desc={'Персональная информация'}/>

            <section className="profile">
                <div className="profile__img">
                    {/*<img src={image ?? defaultLogo} alt="Аватар пользователя"/>*/}
                    <img src="./default-avatar.png" alt="Аватар пользователя"/>
                </div>
                <form
                    // onSubmit={submit}
                    onSubmit={onHandleSave}
                >

                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon/>}
                    >
                        Фотография

                        <VisuallyHiddenInput accept={'.jpg, .jpeg, .png, .webp'} onChange={handleImageChange}
                                             type="file"/>
                    </Button>

                    <TextField
                        error={Boolean(errors.name)}
                        type="text"
                        variant="outlined"
                        // label="Имя"
                        placeholder="Имя"
                        onChange={e => onChangeForm('firstName', e.target.value)}
                        helperText={errors.name}
                        value={data.firstName}
                    />

                    <TextField
                        error={Boolean(errors.surname)}
                        type="text"
                        variant="outlined"
                        placeholder="Фамилия"
                        // label="Фамилия"
                        onChange={e => onChangeForm('lastName', e.target.value)}
                        helperText={errors.lastName}
                        value={data.middleName}
                    />

                    <TextField
                        error={Boolean(errors.patronymic)}
                        type="text"
                        variant="outlined"
                        placeholder="Отчество"
                        // label="Отчество"
                        onChange={e => onChangeForm('middleName', e.target.value)}
                        helperText={errors.patronymic}
                        value={data.middleName}
                    />


                    <TextField
                        error={Boolean(errors.email)}
                        type="email"
                        variant="outlined"
                        placeholder="E-Mail"
                        // label="E-Mail"
                        onChange={e => onChangeForm('address', e.target.value)}
                        helperText={errors.address}
                        value={data.address}
                    />

                    <TextField
                        error={Boolean(errors.password)}
                        type="password"
                        variant="outlined"
                        placeholder="Пароль"
                        // label="Пароль"
                        autoComplete="new-password"
                        onChange={e => onChangeForm('password', e.target.value)}
                        helperText={errors.password}
                    />

                    <TextField
                        error={Boolean(errors.password_confirmation)}
                        type="password"
                        variant="outlined"
                        placeholder="Повторите пароль"
                        // label="Повторите пароль"
                        onChange={e => onChangeForm('password_confirmation', e.target.value)}
                        helperText={errors.password_confirmation}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                        <DatePicker
                            placeholder={'Дата рождения'}
                            // label={'Дата рождения'}
                            onChange={newValue => onChangeForm('birthDate', date(newValue))}
                            // defaultValue={profile.birth ? dayjs(profile.birth) : null}
                            defaultValue={data.birthDate ? dayjs(data.birthDate) : null}
                        />
                    </LocalizationProvider>

                    <TextField
                        error={Boolean(errors.phone)}
                        variant="outlined"
                        placeholder={'Номер телефона'}
                        // label={'Номер телефона'}
                        // inputRef={maskRef}
                        onChange={e => onChangeForm('phone', e.target.value)}
                        helperText={errors.phone}
                        value={data.phone}
                    />

                    <TextField
                        error={Boolean(errors.mailing_address)}
                        type="text"
                        variant="outlined"
                        placeholder="Почтовый адрес"
                        // label="Почтовый адрес"
                        onChange={e => onChangeForm('mailing_address', e.target.value)}
                        value={data.mailing_address}
                        helperText={errors.mailing_address}
                    />

                    <TextField
                        error={Boolean(errors.notes)}
                        type="text"
                        variant="outlined"
                        placeholder="Дополнительные заметки"
                        // label="Дополнительные заметки"
                        onChange={e => onChangeForm('comment', e.target.value)}
                        value={data.comment}
                        helperText={errors.notes}
                    />

                    <Button type="submit" variant="contained">
                        Сохранить
                    </Button>
                </form>
            </section>
            </div>
        </div>
    )
}
