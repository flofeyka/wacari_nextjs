'use client'
import './biography.scss';
import 'react-tooltip/dist/react-tooltip.css';
import"../../components/form-biography/BiographyComponent.scss"

import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {Tooltip} from 'react-tooltip'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
import {default as Bich} from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Divider from '@mui/material/Divider';

import "dayjs/locale/ru";
import dayjs, { Dayjs } from 'dayjs';
import ImageCropper from '@/components/imageCropper/ImageCropper';
import Editor from '@/components/editor/Editor';

import Question from '@/components/form-biography/Question';
import Battles from '@/components/form-biography/Battles';
import Army from '@/components/form-biography/ArmyAwards';
import Rank from '@/components/form-biography/Rank';
import TypeArmy from '@/components/form-biography/TypeArmy';
import SocialLink from '@/components/form-biography/SocialLink';
import Education from '@/components/form-biography/Education';
import Company from '@/components/form-biography/Company';
// import InputAdd from '@/components/form-biography/InputAdd';
import Citizenship from '@/components/form-biography/Citizenship';
import Residence from '@/components/form-biography/Residense';
import Spouse from '@/components/form-biography/Spouse';
import Children from '@/components/form-biography/Children';
// import Input from '@/components/form-biography/Input';
import LeftMenu from "@/components/leftMenu/LeftMenu";
import {
    IArmyAwards,
    IAwards, IBattles,
    IBiography,
    IChildren,
    ICitizenship, ICompany, IDegree,
    IEducation,
    IFather,
    IMother, IQuestions, IRank,
    IResidence, IServiceYears, ISocialLink,
    ISpouse, ITypeArmy
} from "@/modals/Biography";
import formatDate from "@/utils/formatDate";
import ImageCropperV2 from "@/components/imageCropperV2/ImageCropperV2";
import {IImage} from "@/modals/Image";
import Awards from "@/components/form-biography/Awards";
import Textarea from '@mui/joy/Textarea';
import {getContinent} from "@/api/location/continent";
import {getCountry} from "@/api/location/country";
import {createBiography} from "@/api/biography/createBiography";
import { notification } from 'antd';


const SpouseMemo = React.memo(Spouse)
const ChildrenMemo = React.memo(Children)
const CitizenshipMemo = React.memo(Citizenship)
const ResidenceMemo = React.memo(Residence)
const EducationMemo = React.memo(Education)
const CompanyMemo = React.memo(Company)
const AwardsMemo = React.memo(Awards)
const SocialLinkMemo = React.memo(SocialLink)
const TypeArmyMemo = React.memo(TypeArmy)
const RankMemo = React.memo(Rank)
const BattlesMemo = React.memo(Battles)
const ArmyMemo = React.memo(Army)
const QuestionMemo = React.memo(Question)
const ImageCropperMemo = React.memo(ImageCropper)


// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
// }

// eslint-disable-next-line react/display-name
const TextField = React.memo((props: any) => {
    // console.log(props.label)
    return (
        <>
            <Bich {...props}
                  // helperText={getRandomInt(100)}
            />
        </>
    )
}, (a,b) => {return (a.value === b.value)})


const CustomTabPanel = (props: any) => {
    const {children, value, index} = props;

    return (
        <div hidden={value !== index}>
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    )
}


export default function BiographyCreate() {
    const [accessToken, setAccessToken] = useState<string|null>(null)
    const [buttonActive, setButtonActive] = useState(1);
    const [line, setLine] = useState('33.3%')
    const [images, setImages] = useState<IImage[]>()
    const [api, contextHolder] = notification.useNotification();

    //Form data
    const [surname, setSurname] = useState("")
    const [name, setName] = useState("")
    const [patronymic, setPatronymic] = useState(null)
    const [birthContinent, setBirthContinent] = useState(null)
    const [birthCountry, setBirthCountry] = useState(null)
    const [birthCity, setBirthCity] = useState(null)
    const [birthdayDate, setBirthdayDate] = useState<string|null>(null)
    const [nicknames, setNicknames] = useState(null)
    const [deathDate, setDeathDate] = useState<string|null>(null)
    const [deathContinent, setDeathContinent] = useState(null)
    const [deathCountry, setDeathCountry] = useState(null)
    const [deathCity, setDeathCity] = useState(null)
    const [deathCause, setDeathCause] = useState(null)
    const [buriedContinent, setBuriedContinent] = useState(null)
    const [buriedCountry, setBuriedCountry] = useState(null)
    const [buriedCity, setBuriedCity] = useState(null)
    const [citizenship, setCitizenship] = useState<ICitizenship[]>([{ country: null}])
    const [residence, setResidence] = useState<IResidence[]>([{continent: null, country: null, city: null, yearFrom: null, yearTo: null}])
    const [growth, setGrowth] = useState(null)
    const [weight, setWeight] = useState(null)
    const [spouse, setSpouse] = useState<ISpouse[]>([{surname: null, name: null, patronymic: null, yearFrom: null, yearTo: null, continent: null, country: null, city: null, birthday: null,}])
    const [children, setChildren] = useState<IChildren[]>([{surname: null, name: null, patronymic: null, continent: null, country: null, city: null, birthday: null}])
    const [father, setFather] = useState<IFather>({surname: null, name: null, patronymic: null, continent: null, country: null, city: null, birthday: null})
    const [mother, setMother] = useState<IMother>({surname: null, name: null, patronymic: null, continent: null, country: null, city: null, birthday: null})
    const [religion, setReligion] = useState(null)
    const [hobby, setHobby] = useState(null)
    const [animalAssociation, setAnimalAssociation] = useState(null)
    const [education, setEducation] = useState<IEducation[]>([{text: null, yearFrom: null, yearTo: null}])
    const [degree, setDegree] = useState<IDegree>({text: null, date: null})
    const [profession, setProfession] = useState(null)
    const [activity, setActivity] = useState(null)
    const [company, setCompany] = useState<ICompany[]>([{text: null, job_title: null, yearFrom: null, yearTo: null}])
    const [condition, setCondition] = useState(null)
    const [awards, setAwards] = useState<IAwards[]>([{title: null}])
    const [quotes, setQuotes] = useState()
    const [socialLink, setSocialLink] = useState<ISocialLink[]>([
        {text: null, constant: "site"},
        {text: null, constant: "telegram"},
        {text: null, constant: "youtube"},
        {text: null, constant: "ok"},
        {text: null, constant: "vk"},
    ])
    const [typeArmy, setTypeArmy] = useState<ITypeArmy[]>([{battles: null, yearFrom: null, yearTo: null}])
    const [serviceYears, setServiceYears] = useState<IServiceYears>({yearFrom: null, yearTo: null})
    const [ranks, setRanks] = useState<IRank[]>([{rank: null, yearFrom: null}])
    const [battles, setBattles] = useState<IBattles[]>([{battle: null, yearFrom: null, yearTo: null}])
    const [armyAwards, setArmyAwards] = useState<IArmyAwards[]>([{text: null}])
    const [questions, setQuestions] = useState<IQuestions[]>([{question: null, answer: null}])


    const [continents, setContinents] = useState([])
    const [countriesBirth, setCountriesBirth] = useState([])
    const [countriesDeath, setCountriesDeath] = useState([])
    const [countriesBuried, setCountriesBuried] = useState([])
    const [countriesFather, setCountriesFather] = useState([])
    const [countriesMother, setCountriesMother] = useState([])
    const [countriesWithoutFilter, setCountriesWithoutFilter] = useState([])

    useEffect(() => {
        setAccessToken(localStorage.getItem("accessToken"))
    }, []);

    useEffect(() => {
        getContinent()
            .then((response) => {
                setContinents(response.data)
            })
        getCountry("")
            .then((response) => {
                setCountriesWithoutFilter(response.data)
            })
    }, []);

    useEffect(() => {
        if (birthContinent === null) return
        getCountry(birthContinent)
            .then((response) => {
                setCountriesBirth(response.data)
            })
    }, [birthContinent]);

    useEffect(() => {
        if (deathContinent === null) return
        getCountry(deathContinent)
            .then((response) => {
                setCountriesDeath(response.data)
            })
    }, [deathContinent]);

    useEffect(() => {
        if (buriedContinent === null) return
        getCountry(buriedContinent)
            .then((response) => {
                setCountriesBuried(response.data)
            })
    }, [buriedContinent]);

    useEffect(() => {
        if (father.continent === null) return
        getCountry(father.continent)
            .then((response) => {
                setCountriesFather(response.data)
            })
    }, [father.continent]);

    useEffect(() => {
        if (mother.continent === null) return
        getCountry(mother.continent)
            .then((response) => {
                setCountriesMother(response.data)
            })
    }, [mother.continent]);

    const handleChangetep = (event: any) => {
        const value = parseInt(event.target.value);

        if (value === 1) {
            setTimeout(() => {
                setLine('33.3%');
            }, 100);
            setButtonActive(value);
        }
        else if (value === 2) {
            setTimeout(() => {
                setLine('66.6%');
            }, 100);
            setButtonActive(value);
        }
        else {
            setTimeout(() => {
                setLine('100%');
            }, 100);
            setButtonActive(value);
        }
    }


    const handleChange = (event: any) => {
        const value = parseInt(event.target.value);

        if (value === 1) {
            setTimeout(() => {
                setLine('33.3%');
            }, 100);
            setButtonActive(value);
        }
        else if (value === 2) {
            createBiography(
                accessToken,
                name,
                surname,
                patronymic,
                birthdayDate,
                {country:birthCountry, city: birthCity},
                nicknames,
                deathDate,
                {country:deathCountry, city: deathCity},
                deathCause,
                {country:buriedCountry, city: buriedCity},
                citizenship.filter(item => item.country !== null),
                residence.filter(residence => residence.country !== null).map(residence => ({
                    country: residence.country,
                    dateFrom: residence.yearFrom,
                    dateTo: residence.yearTo
                })),
                parseFloat(growth || ""),
                parseFloat(weight || ""),
                spouse.filter(item => item.country !== null).map(item => ({
                    birthDate: item.birthday,
                    country: item.country,
                    city: item.city,
                    dateFrom: item.yearFrom,
                    dateTo: item.yearTo,
                    firstName: item.name,
                    lastName: item.surname,
                    middleName: item.patronymic,
                })),
                children.filter(item => item.country !== null).map(item => ({
                    birthDate: item.birthday,
                    country: item.country,
                    city: item.city,
                    firstName: item.name,
                    lastName: item.surname,
                    middleName: item.patronymic,
                })),
                {firstName: father.name === null? "": father.name,
                    lastName: father.surname === null? "": father.surname,
                    middleName: father.patronymic === null? "": father.patronymic,
                    birthDate: father.birthday === null? "": father.birthday,
                    country: father.country === null? "": father.country,
                    city: father.city === null? "": father.city},
                {firstName: mother.name === null? "": mother.name,
                    lastName: mother.surname === null? "": mother.surname,
                    middleName: mother.patronymic === null? "": mother.patronymic,
                    birthDate: mother.birthday === null? "": mother.birthday,
                    country: mother.country === null? "": mother.country,
                    city: mother.city === null? "": mother.city},
                {
                    title: degree.text,
                    year: degree.date
                },
                religion,
                hobby,
                animalAssociation,
                education.filter(item => item.text !== null).map(item => ({
                    title: item.text,
                    dateFrom: item.yearFrom,
                    dateTo: item.yearTo
                })),
                profession,
                activity,
                company.filter(item => item.text !== null).map(item => ({
                    dateFrom: item.yearFrom,
                    dateTo: item.yearTo,
                    title: item.text,
                    position: item.job_title
                })),
                condition,
                awards.filter(item => item.title !== null),
                quotes,
                Object.fromEntries(socialLink.map(n => [ n.constant, n.text === null? "": n.text])),
                battles.filter(item => item.battle !== null).map(item => ({
                    title: item.battle,
                    dateFrom: item.yearFrom,
                    dateTo: item.yearTo
                })),
                // armyAwards,
                [],
                ranks.filter(item => item.rank !== null).map(item => ({
                    title: item.rank,
                    year: item.yearFrom
                })),
                questions
            )
                .then((response) => {
                    console.log("response", response)
                    setTimeout(() => {
                        setLine('66.6%');
                    }, 100);
                    setButtonActive(value);
                })
                .catch((error)=>{
                    console.log("error", error)
                    api.open({
                        // message: `Ошибка создания ${error.response.data.messages}`,
                        message: `Ошибка создания`,
                        description: `${JSON.stringify(error.response.data.messages)}`,
                        // icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    });
                })
        }
        else {
            setTimeout(() => {
                setLine('100%');
            }, 100);
            setButtonActive(value);
        }
    }

    const getYear = (year: any) => {
        return year?.$y;
    }


    return (
        <section className="biography">
            {contextHolder}
            <div className="biography_component-left-menu">
                <LeftMenu/>
            </div>

            <div className="biography_content_wrapper">
                <div className="biography_instruction-page-wrapper">
                    <h3 style={{marginBlockEnd:"5px"}} id="title-create-biography">Создание биографии</h3>
                    <Divider/>
                </div>

                <div className="biography_wrap">
                    <div className="biography_position">
                        <div className="biography_position__line"><span style={{width: line}}></span></div>
                        <div className="biography_position__step">
                            <button value={1} className={buttonActive === 1 ? 'active' : ''} onClick={handleChangetep}
                                    type="button">Шаг 1
                            </button>
                            <button value={2} className={buttonActive === 2 ? 'active' : ''} onClick={handleChangetep}
                                    type="button">Шаг 2
                            </button>
                            <button value={3} className={buttonActive === 3 ? 'active' : ''} onClick={handleChangetep}
                                    type="button">Шаг 3
                            </button>
                        </div>
                    </div>
                </div>

                <form>
                    <CustomTabPanel value={buttonActive} index={1}>

                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Основная биография
                            </AccordionSummary>
                            <AccordionDetails >
                                <div className="biography__block">
                                    <ul>
                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Полное имя <span>*</span>
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <TextField
                                                    value={surname}
                                                    label={'Фамилия-'}
                                                    onChange={(value:any) => {
                                                        if (value.target.value === " ") return
                                                        setSurname(value.target.value)
                                                        // setFormValue((state) => (
                                                        //     {...state, surname: value.target.value}
                                                        // ))
                                                    }}
                                                    onFocusCapture={(val: any) => {
                                                        setSurname((val.target.value).trim())
                                                        // setFormValue((state) => (
                                                        //     {...state, surname: (val.target.value).trim()}
                                                        // ))
                                                    }}
                                                />

                                                <TextField
                                                    // value={formValue.name}
                                                    value={name}
                                                    label={'Имя'}
                                                    onChange={(value:any) => {
                                                        if (value.target.value === " ") return
                                                        setName(value.target.value)
                                                        // setFormValue((state) => (
                                                        //     {...state, name: value.target.value}
                                                        // ))
                                                    }}
                                                    onFocusCapture={(val: any) => {
                                                        setName((val.target.value).trim())
                                                        // setFormValue((state) => (
                                                        //     {...state, name: (val.target.value).trim()}
                                                        // ))
                                                    }}
                                                />

                                                <TextField
                                                    // value={formValue.patronymic}
                                                    value={patronymic}
                                                    label={'Отчество'}
                                                    onChange={(value: any) => {
                                                        if (value.target.value === " ") return
                                                        setPatronymic(value.target.value)
                                                        // setFormValue((state) => (
                                                        //     {...state, patronymic: value.target.value}
                                                        // ))
                                                    }}
                                                    onFocusCapture={(val:any) => {
                                                        setPatronymic((val.target.value).trim())
                                                        // setFormValue((state) => (
                                                        //     {...state, patronymic: (val.target.value).trim()}
                                                        // ))
                                                    }}
                                                />
                                            </div>
                                        </li>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Место рождение <span>*</span>
                                                </p>
                                                <a className="my-anchor-element-birth"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element-birth">
                                                    Место рождение
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <FormControl>
                                                    <InputLabel style={{background:"white"}}> Выбрать континент</InputLabel>
                                                    <Select
                                                        // value={formValue["birth-continent"]}
                                                        value={birthContinent}
                                                        onChange={(value: any) => {
                                                            setBirthContinent(value.target.value)
                                                            // setFormValue((state) => (
                                                            //     {...state, "birth-continent": value.target.value}
                                                            // ))
                                                        }}
                                                    >
                                                        {continents.map((cont: any, i) => {
                                                            return (<MenuItem value={cont.title} key={i}>{cont.title}</MenuItem>)
                                                        })}
                                                    </Select>
                                                </FormControl>

                                                <FormControl>
                                                    <InputLabel style={{background:"white"}}> Выбрать страну</InputLabel>
                                                    <Select
                                                        // value={formValue["birth-country"]}
                                                        value={birthCountry}
                                                        onChange={(value: any, event: any) => {
                                                            setBirthCountry(value.target.value)
                                                            // setFormValue((state) => (
                                                            //     {...state, "birth-country": value.target.value}
                                                            // ))
                                                        }}
                                                        disabled={birthContinent === null}
                                                    >
                                                        {countriesBirth.map((countr: any, i) => {
                                                            return (<MenuItem value={countr.guid} key={i}>{countr.title}</MenuItem>)
                                                        })}
                                                    </Select>
                                                </FormControl>

                                                <FormControl>
                                                    {/*    <InputLabel> Выбрать город</InputLabel>*/}
                                                    {/*    <Select*/}
                                                    {/*        value={formValue["birth-city"]}*/}
                                                    {/*        onChange={(value) => {*/}
                                                    {/*            setFormValue((state) => (*/}
                                                    {/*                {...state, "birth-city": value.target.value}*/}
                                                    {/*            ))*/}
                                                    {/*        }}*/}
                                                    {/*    >*/}
                                                    {/*        <MenuItem value={"Первый"}>Первый</MenuItem>*/}
                                                    {/*        <MenuItem value={"Второй"}>Второй</MenuItem>*/}
                                                    {/*        <MenuItem value={"Третий"}>Третий</MenuItem>*/}
                                                    {/*    </Select>*/}

                                                    <TextField
                                                        // value={formValue["birth-city"]}
                                                        value={birthCity}
                                                        label={'Выбрать город'}
                                                        onChange={(value: any) => {
                                                            setBirthCity(value.target.value)
                                                            // setFormValue((state) => (
                                                            //     {...state, "birth-city": value.target.value}
                                                            // ))
                                                        }}
                                                    />
                                                </FormControl>

                                            </div>
                                        </li>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Дата рождения <span>*</span>
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <div className='date'>
                                                    <LocalizationProvider
                                                        dateAdapter={AdapterDayjs}
                                                        adapterLocale={'ru'}
                                                    >
                                                        <DatePicker
                                                            label={'Дата рождения'}
                                                            defaultValue={null}
                                                            onChange={(value) => {
                                                                const formatValue = formatDate(value, "yyyy-MM-dd")
                                                                setBirthdayDate(formatValue)
                                                                // setFormValue((state) => (
                                                                //     {
                                                                //         ...state,
                                                                //         "birthday-date": formatDate(value, "yyyy-MM-dd")
                                                                //     }
                                                                // ))
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                                <FormControl className="imaginary-block"></FormControl>
                                                <FormControl className="imaginary-block"></FormControl>
                                            </div>
                                        </li>

                                        <div className="biography__block_input">
                                            <div className="biography__name">
                                                <p>
                                                    Прозвища
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <TextField
                                                    label={'Прозвища'}
                                                    // value={formValue.nicknames}
                                                    value={nicknames}
                                                    onChange={(value: any) => {
                                                        setNicknames(value.target.value)
                                                        // setFormValue((state) => (
                                                        //     {...state, nicknames: value.target.value}
                                                        // ))
                                                    }}
                                                    // onFocusCapture={(val:any) => {
                                                    //     setFormValue((state) => (
                                                    //         {...state, nicknames: (val.target.value).trim()}
                                                    //     ))
                                                    // }}
                                                />
                                            </div>
                                        </div>


                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Дата смерти
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <div className='date'>
                                                    <LocalizationProvider
                                                        dateAdapter={AdapterDayjs}
                                                        adapterLocale={'ru'}
                                                    >
                                                        <DatePicker
                                                            label={'Дата смерти'}
                                                            defaultValue={null}
                                                            onChange={(value: any) => {
                                                                setDeathDate(formatDate(value, "yyyy-MM-dd HH:mm:ss"))
                                                                // setFormValue((state) => (
                                                                //     {
                                                                //         ...state,
                                                                //         "death-date": formatDate(value, "yyyy-MM-dd HH:mm:ss")
                                                                //     }
                                                                // ))
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                                <FormControl className="imaginary-block"></FormControl>
                                                <FormControl className="imaginary-block"></FormControl>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Место смерти
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <FormControl>
                                                    <InputLabel style={{background:"white"}}> Выбрать континент</InputLabel>
                                                    <Select
                                                        // value={formValue["death-continent"]}
                                                        value={deathContinent}
                                                        onChange={(value: any) => {
                                                            setDeathContinent(value.target.value)
                                                            // setFormValue((state) => (
                                                            //     {...state, "death-continent": value.target.value}
                                                            // ))
                                                        }}
                                                    >
                                                        {continents.map((cont: any, i) => {
                                                            return (<MenuItem value={cont.title} key={i}>{cont.title}</MenuItem>)
                                                        })}
                                                    </Select>
                                                </FormControl>

                                                <FormControl>
                                                    <InputLabel style={{background:"white"}}> Выбрать страну</InputLabel>
                                                    <Select
                                                        // value={formValue["death-country"]}
                                                        value={deathCountry}
                                                        onChange={(value: any) => {
                                                            setDeathCountry(value.target.value)
                                                            // setFormValue((state) => (
                                                            //     {...state, "death-country": value.target.value}
                                                            // ))
                                                        }}
                                                        disabled={deathContinent === null}
                                                    >
                                                        {countriesDeath.map((countr: any, i) => {
                                                            return (<MenuItem value={countr.guid} key={i}>{countr.title}</MenuItem>)
                                                        })}
                                                    </Select>
                                                </FormControl>

                                                <FormControl>
                                                    {/*<InputLabel style={{background:"white"}}> Выбрать город</InputLabel>*/}
                                                    {/*<Select*/}
                                                    {/*    // value={formValue["death-city"]}*/}
                                                    {/*    value={deathCity}*/}
                                                    {/*    onChange={(value: any) => {*/}
                                                    {/*        setDeathCity(value.target.value)*/}
                                                    {/*        // setFormValue((state) => (*/}
                                                    {/*        //     {...state, "death-city": value.target.value}*/}
                                                    {/*        // ))*/}
                                                    {/*    }}*/}
                                                    {/*>*/}
                                                    {/*    <MenuItem value={"Первый"}>Первый</MenuItem>*/}
                                                    {/*    <MenuItem value={"Второй"}>Второй</MenuItem>*/}
                                                    {/*    <MenuItem value={"Третий"}>Третий</MenuItem>*/}
                                                    {/*</Select>*/}
                                                    <TextField
                                                        // value={formValue["birth-city"]}
                                                        value={deathCity}
                                                        label={'Введите город'}
                                                        onChange={(value: any) => {
                                                            setDeathCity(value.target.value)
                                                            // setFormValue((state) => (
                                                            //     {...state, "birth-city": value.target.value}
                                                            // ))
                                                        }}
                                                    />
                                                </FormControl>
                                            </div>
                                        </li>

                                        <div className="biography__block_input">
                                            <div className="biography__name">
                                                <p>
                                                    Причина смерти
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <TextField
                                                    label={'Причина смерти'}
                                                    // value={formValue["death-cause"]}
                                                    value={deathCause}
                                                    onChange={(value: any) => {
                                                        setDeathCause(value.target.value)
                                                        // setFormValue((state) => (
                                                        //     {...state, "death-cause": value.target.value}
                                                        // ))
                                                    }}
                                                    // onFocusCapture={(val:any) => {
                                                    //     setFormValue((state) => (
                                                    //         {...state, "death-cause": (val.target.value).trim()}
                                                    //     ))
                                                    // }}
                                                />
                                            </div>
                                        </div>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Похоронен
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <FormControl>
                                                    <InputLabel style={{background:"white"}}> Выбрать континент</InputLabel>
                                                    <Select
                                                        // value={formValue["buried-continent"]}
                                                        value={buriedContinent}
                                                        onChange={(value: any) => {
                                                            setBuriedContinent(value.target.value)
                                                            // setFormValue((state) => (
                                                            //     {...state, "buried-continent": value.target.value}
                                                            // ))
                                                        }}
                                                    >
                                                        {continents.map((cont: any, i) => {
                                                            return (<MenuItem value={cont.title} key={i}>{cont.title}</MenuItem>)
                                                        })}
                                                    </Select>
                                                </FormControl>

                                                <FormControl>
                                                    <InputLabel style={{background:"white"}}> Выбрать страну</InputLabel>
                                                    <Select
                                                        // value={formValue["buried-country"]}
                                                        value={buriedCountry}
                                                        onChange={(value: any) => {
                                                            setBuriedCountry(value.target.value)
                                                            // setFormValue((state) => (
                                                            //     {...state, "buried-country": value.target.value}
                                                            // ))
                                                        }}
                                                        disabled={buriedContinent===null}
                                                    >
                                                        {countriesBuried.map((cont: any, i) => {
                                                            return (<MenuItem value={cont.title} key={i}>{cont.title}</MenuItem>)
                                                        })}
                                                    </Select>
                                                </FormControl>

                                                <FormControl>
                                                    {/*<InputLabel style={{background:"white"}}> Выбрать город</InputLabel>*/}
                                                    {/*<Select*/}
                                                    {/*    // value={formValue["buried-city"]}*/}
                                                    {/*    value={buriedCity}*/}
                                                    {/*    onChange={(value: any) => {*/}
                                                    {/*        setBuriedCity(value.target.value)*/}
                                                    {/*        // setFormValue((state) => (*/}
                                                    {/*        //     {...state, "buried-city": value.target.value}*/}
                                                    {/*        // ))*/}
                                                    {/*    }}*/}
                                                    {/*>*/}
                                                    {/*    <MenuItem value={"Первый"}>Первый</MenuItem>*/}
                                                    {/*    <MenuItem value={"Второй"}>Второй</MenuItem>*/}
                                                    {/*    <MenuItem value={"Третий"}>Третий</MenuItem>*/}
                                                    {/*</Select>*/}
                                                    <TextField
                                                        // value={formValue["birth-city"]}
                                                        value={buriedCity}
                                                        label={'Введите город'}
                                                        onChange={(value: any) => {
                                                            setBuriedCity(value.target.value)
                                                            // setFormValue((state) => (
                                                            //     {...state, "birth-city": value.target.value}
                                                            // ))
                                                        }}
                                                    />
                                                </FormControl>
                                            </div>
                                        </li>

                                        {/*<Citizenship formValue={formValue} setFormValue={setFormValue}/>*/}
                                        {/*<Citizenship formValue={citizenship} setFormValue={setCitizenship}/>*/}
                                        <CitizenshipMemo formValue={citizenship} setFormValue={setCitizenship} continents={countriesWithoutFilter}/>
                                        {/*<Residence formValue={formValue} setFormValue={setFormValue}/>*/}
                                        {/*<Residence formValue={residence} setFormValue={setResidence}/>*/}
                                        <ResidenceMemo formValue={residence} setFormValue={setResidence} continents={continents}/>
                                        <div className="biography__block_input">
                                            <div className="biography__name">
                                                <p>Рост</p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">:(</Tooltip>
                                            </div>
                                            <div className="biography__input">
                                                <TextField
                                                    label={'Рост'}
                                                    // value={formValue.growth}
                                                    value={growth}
                                                    onChange={(value: any) => {
                                                        setGrowth(value.target.value)
                                                        // setFormValue((state) => (
                                                        //     {...state, growth: value.target.value}
                                                        // ))
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="biography__block_input">
                                            <div className="biography__name">
                                                <p>Вес</p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">:(</Tooltip>
                                            </div>
                                            <div className="biography__input">
                                                <TextField
                                                    label={'Вес'}
                                                    // value={formValue.weight}
                                                    value={weight}
                                                    onChange={(value: any) => {
                                                        setWeight(value.target.value)
                                                        // setFormValue((state) => (
                                                        //     {...state, weight: value.target.value}
                                                        // ))
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {/*<Spouse formValue={formValue} setFormValue={setFormValue}/>*/}
                                        <SpouseMemo formValue={spouse} setFormValue={setSpouse} continents={continents}/>
                                        {/*<Spouse formValue={spouse} setFormValue={setSpouse}/>*/}
                                        {/*<Children formValue={formValue} setFormValue={setFormValue}/>*/}
                                        {/*<Children formValue={children} setFormValue={setChildren}/>*/}
                                        <ChildrenMemo formValue={children} setFormValue={setChildren} continents={continents}/>

                                        <li>
                                            <div className="biography__name">
                                                <p>Отец</p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input_new" style={{display:"flex", flexDirection:"column"}}>
                                                <div className="biography__input-wrap-v2"
                                                     // id="biography__input-wrap-v2-indents"
                                                >
                                                    <TextField
                                                        label={'Фамилия'}
                                                        // value={formValue.father.surname}
                                                        value={father.surname}
                                                        onChange={(value: any) => {
                                                            if (value.target.value === " ") return
                                                            setFather((state) => ({
                                                                ...state,
                                                                surname: value.target.value
                                                            }))
                                                            // setFormValue((state) => (
                                                            //     {
                                                            //         ...state,
                                                            //         father: {
                                                            //             ...state.father,
                                                            //             surname: value.target.value
                                                            //         }
                                                            //     }
                                                            // ))
                                                        }}
                                                        onFocusCapture={(val:any) => {
                                                            setFather((state) => ({
                                                                ...state,
                                                                surname: (val.target.value).trim()
                                                            }))
                                                            // setFormValue((state) => (
                                                            //     {
                                                            //         ...state,
                                                            //         father: {
                                                            //             ...state.father,
                                                            //             surname:  (val.target.value).trim()
                                                            //         }
                                                            //     }
                                                            // ))
                                                        }}
                                                    />

                                                    <TextField
                                                        label={'Имя'}
                                                        // value={formValue.father.name}
                                                        value={father.name}
                                                        onChange={(value: any) => {
                                                            if (value.target.value === " ") return
                                                            setFather((state) => ({
                                                                ...state,
                                                                name: value.target.value
                                                            }))
                                                            // setFormValue((state) => (
                                                            //     {
                                                            //         ...state,
                                                            //         father: {...state.father, name: value.target.value}
                                                            //     }
                                                            // ))
                                                        }}
                                                        onFocusCapture={(val:any) => {
                                                            setFather((state) => ({
                                                                ...state,
                                                                name: (val.target.value).trim()
                                                            }))
                                                            // setFormValue((state) => (
                                                            //     {
                                                            //         ...state,
                                                            //         father: {
                                                            //             ...state.father,
                                                            //             name:  (val.target.value).trim()
                                                            //         }
                                                            //     }
                                                            // ))
                                                        }}
                                                    />

                                                    <TextField
                                                        label={'Отчество'}
                                                        // value={formValue.father.patronymic}
                                                        value={father.patronymic}
                                                        onChange={(value: any) => {
                                                            if (value.target.value === " ") return
                                                            setFather((state) => ({
                                                                ...state,
                                                                patronymic: value.target.value
                                                            }))
                                                            // setFormValue((state) => (
                                                            //     {
                                                            //         ...state,
                                                            //         father: {
                                                            //             ...state.father,
                                                            //             patronymic: value.target.value
                                                            //         }
                                                            //     }
                                                            // ))
                                                        }}
                                                        onFocusCapture={(val:any) => {
                                                            setFather((state) => ({
                                                                ...state,
                                                                patronymic: (val.target.value).trim()
                                                            }))
                                                            // setFormValue((state) => (
                                                            //     {
                                                            //         ...state,
                                                            //         father: {
                                                            //             ...state.father,
                                                            //             patronymic:  (val.target.value).trim()
                                                            //         }
                                                            //     }
                                                            // ))
                                                        }}
                                                    />

                                                    <div className="date-v2">
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}
                                                                              adapterLocale={'ru'}>
                                                            <DatePicker
                                                                label={'Дата рождения'}
                                                                defaultValue={null}
                                                                onChange={(value: any) => {
                                                                    setFather((state) => ({
                                                                        ...state,
                                                                        birthday: formatDate(value, "yyyy-MM-dd")
                                                                    }))
                                                                    // setFormValue((state) => (
                                                                    //     {
                                                                    //         ...state, father:
                                                                    //             {
                                                                    //                 ...state.father,
                                                                    //                 birthday: formatDate(value, "yyyy-MM-dd")
                                                                    //             }
                                                                    //     }
                                                                    // ))
                                                                }}
                                                            />
                                                        </LocalizationProvider>
                                                    </div>
                                                </div>

                                                <div className="biography__input-wrap-without-date">
                                                    <FormControl className="biography__input-element-v2">
                                                        <InputLabel style={{background:"white"}}> Выбрать континент</InputLabel>
                                                        <Select
                                                            // value={formValue.father.continent}
                                                            value={father.continent}
                                                            onChange={(value: any) => {
                                                                setFather((state) => ({
                                                                    ...state,
                                                                    continent: value.target.value
                                                                }))
                                                                // setFormValue((state) => (
                                                                //     {
                                                                //         ...state, father:
                                                                //             {
                                                                //                 ...state.father,
                                                                //                 continent: value.target.value
                                                                //             }
                                                                //     }
                                                                // ))
                                                            }}
                                                        >
                                                            {continents.map((cont: any, i) => {
                                                                return (<MenuItem value={cont.title} key={i}>{cont.title}</MenuItem>)
                                                            })}
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl className="biography__input-element-v2">
                                                        <InputLabel style={{background:"white"}}> Выбрать страну</InputLabel>
                                                        <Select
                                                            // value={formValue.father.country}
                                                            value={father.country}
                                                            disabled={father.continent === null}
                                                            onChange={(value: any) => {
                                                                setFather((state) => ({
                                                                    ...state,
                                                                    country: value.target.value
                                                                }))
                                                                // setFormValue((state) => (
                                                                //     {
                                                                //         ...state, father:
                                                                //             {
                                                                //                 ...state.father,
                                                                //                 country: value.target.value
                                                                //             }
                                                                //     }
                                                                // ))
                                                            }}
                                                        >
                                                            {countriesFather.map((countr: any, i) => {
                                                                return (<MenuItem value={countr.guid} key={i}>{countr.title}</MenuItem>)
                                                            })}
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl className="biography__input-element-v2">
                                                        {/*<InputLabel style={{background:"white"}}> Выбрать город</InputLabel>*/}
                                                        {/*<Select*/}
                                                        {/*    // value={formValue.father.city}*/}
                                                        {/*    value={father.city}*/}
                                                        {/*    onChange={(value: any) => {*/}
                                                        {/*        setFather((state) => ({*/}
                                                        {/*            ...state,*/}
                                                        {/*            city: value.target.value*/}
                                                        {/*        }))*/}
                                                        {/*        // setFormValue((state) => (*/}
                                                        {/*        //     {*/}
                                                        {/*        //         ...state, father:*/}
                                                        {/*        //             {*/}
                                                        {/*        //                 ...state.father,*/}
                                                        {/*        //                 city: value.target.value*/}
                                                        {/*        //             }*/}
                                                        {/*        //     }*/}
                                                        {/*        // ))*/}
                                                        {/*    }}*/}
                                                        {/*>*/}
                                                        {/*    <MenuItem value={"Первый"}>Первый</MenuItem>*/}
                                                        {/*    <MenuItem value={"Второй"}>Второй</MenuItem>*/}
                                                        {/*    <MenuItem value={"Третий"}>Третий</MenuItem>*/}
                                                        {/*</Select>*/}
                                                        <TextField
                                                            value={father.city}
                                                            label={'Введите город'}
                                                            onChange={(value: any) => {
                                                                        setFather((state) => ({
                                                                            ...state,
                                                                            city: value.target.value
                                                                        }))
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <div className="date-v2" id="imaginary-block" style={{width: "100%"}}></div>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="biography__name">
                                                <p>Мать</p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input_new" style={{display:"flex", flexDirection:"column"}}>
                                                <div className="biography__input-wrap-v2">
                                                    <TextField
                                                        label={'Фамилия'}
                                                        // value={formValue.mother.surname}
                                                        value={mother.surname}
                                                        onChange={(value: any) => {
                                                            if (value.target.value === " ") return
                                                            setMother((state) => ({
                                                                ...state,
                                                                surname: value.target.value
                                                            }))
                                                            // setFormValue((state) => (
                                                            //     {
                                                            //         ...state,
                                                            //         mother: {
                                                            //             ...state.mother,
                                                            //             surname: value.target.value
                                                            //         }
                                                            //     }
                                                            // ))
                                                        }}
                                                        onFocusCapture={(val:any) => {
                                                            setMother((state) => ({
                                                                ...state,
                                                                surname: (val.target.value).trim()
                                                            }))
                                                            // setFormValue((state) => (
                                                            //     {
                                                            //         ...state,
                                                            //         mother: {
                                                            //             ...state.mother,
                                                            //             surname: (val.target.value).trim()
                                                            //         }
                                                            //     }
                                                            // ))
                                                        }}
                                                    />

                                                    <TextField
                                                        label={'Имя'}
                                                        // value={formValue.mother.name}
                                                        value={mother.name}
                                                        onChange={(value: any) => {
                                                            if (value.target.value === " ") return
                                                            setMother((state) => ({
                                                                ...state,
                                                                name: value.target.value
                                                            }))
                                                            // setFormValue((state) => (
                                                            //     {
                                                            //         ...state,
                                                            //         mother: {...state.mother, name: value.target.value}
                                                            //     }
                                                            // ))
                                                        }}
                                                        onFocusCapture={(val:any) => {
                                                            setMother((state) => ({
                                                                ...state,
                                                                name: (val.target.value).trim()
                                                            }))
                                                            // setFormValue((state) => (
                                                            //     {
                                                            //         ...state,
                                                            //         mother: {
                                                            //             ...state.mother,
                                                            //             name: (val.target.value).trim()
                                                            //         }
                                                            //     }
                                                            // ))
                                                        }}
                                                    />

                                                    <TextField
                                                        label={'Отчество'}
                                                        // value={formValue.mother.patronymic}
                                                        value={mother.patronymic}
                                                        onChange={(value: any) => {
                                                            if (value.target.value === " ") return
                                                            setMother((state) => ({
                                                                ...state,
                                                                patronymic: value.target.value
                                                            }))
                                                            // setFormValue((state) => (
                                                            //     {
                                                            //         ...state,
                                                            //         mother: {
                                                            //             ...state.mother,
                                                            //             patronymic: value.target.value
                                                            //         }
                                                            //     }
                                                            // ))
                                                        }}
                                                        onFocusCapture={(val:any) => {
                                                            setMother((state) => ({
                                                                ...state,
                                                                patronymic: (val.target.value).trim()
                                                            }))
                                                            // setFormValue((state) => (
                                                            //     {
                                                            //         ...state,
                                                            //         mother: {
                                                            //             ...state.mother,
                                                            //             patronymic: (val.target.value).trim()
                                                            //         }
                                                            //     }
                                                            // ))
                                                        }}
                                                    />

                                                    <div className="date-v2">
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}
                                                                              adapterLocale={'ru'}>
                                                            <DatePicker
                                                                label={'Дата рождения'}
                                                                defaultValue={null}
                                                                onChange={(value) => {
                                                                    setMother((state) => ({
                                                                        ...state,
                                                                        patronymic: formatDate(value, "yyyy-MM-dd")
                                                                    }))
                                                                    // setFormValue((state) => (
                                                                    //     {
                                                                    //         ...state, mother:
                                                                    //             {
                                                                    //                 ...state.mother,
                                                                    //                 birthday: formatDate(value, "yyyy-MM-dd")
                                                                    //             }
                                                                    //     }
                                                                    // ))
                                                                }}
                                                            />
                                                        </LocalizationProvider>
                                                    </div>
                                                </div>

                                                <div className="biography__input-wrap-without-date">
                                                    <FormControl className="biography__input-element-v2">
                                                        <InputLabel style={{background:"white"}}> Выбрать континент</InputLabel>
                                                        <Select
                                                            // value={formValue.mother.continent}
                                                            value={mother.continent}
                                                            onChange={(value: any) => {
                                                                setMother((state) => ({
                                                                    ...state,
                                                                    continent: value.target.value
                                                                }))
                                                                // setFormValue((state) => (
                                                                //     {
                                                                //         ...state, mother:
                                                                //             {
                                                                //                 ...state.mother,
                                                                //                 continent: value.target.value
                                                                //             }
                                                                //     }
                                                                // ))
                                                            }}
                                                        >
                                                            {continents.map((cont: any, i) => {
                                                                return (<MenuItem value={cont.title} key={i}>{cont.title}</MenuItem>)
                                                            })}
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl className="biography__input-element-v2">
                                                        <InputLabel style={{background:"white"}}> Выбрать страну</InputLabel>
                                                        <Select
                                                            // value={formValue.mother.country}
                                                            value={mother.country}
                                                            disabled={mother.continent === null}
                                                            onChange={(value: any) => {
                                                                setMother((state) => ({
                                                                    ...state,
                                                                    country: value.target.value
                                                                }))
                                                                // setFormValue((state) => (
                                                                //     {
                                                                //         ...state, mother:
                                                                //             {
                                                                //                 ...state.mother,
                                                                //                 country: value.target.value
                                                                //             }
                                                                //     }
                                                                // ))
                                                            }}
                                                        >
                                                            {countriesMother.map((countr: any, i) => {
                                                                return (<MenuItem value={countr.guid} key={i}>{countr.title}</MenuItem>)
                                                            })}
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl className="biography__input-element-v2">
                                                        <InputLabel style={{background:"white"}}> Выбрать город</InputLabel>
                                                        <Select
                                                            value={mother.city}
                                                            onChange={(value: any) => {
                                                                setMother((state) => ({
                                                                    ...state,
                                                                    city: value.target.value
                                                                }))
                                                                // setFormValue((state) => (
                                                                //     {
                                                                //         ...state, mother:
                                                                //             {
                                                                //                 ...state.mother,
                                                                //                 city: value.target.value
                                                                //             }
                                                                //     }
                                                                // ))
                                                            }}
                                                        >
                                                            <MenuItem value={"Первый"}>Первый</MenuItem>
                                                            <MenuItem value={"Второй"}>Второй</MenuItem>
                                                            <MenuItem value={"Третий"}>Третий</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <div className="date-v2" id="imaginary-block" style={{width: "100%"}}></div>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Отношения к религии
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <FormControl>
                                                    <InputLabel> Отношения к религии</InputLabel>
                                                    <Select
                                                        // value={formValue.religion}
                                                        value={religion}
                                                        onChange={(value: any) => {
                                                            setReligion(value.target.value)
                                                            // setFormValue((state) => (
                                                            //     {...state, religion: value.target.value}
                                                            // ))
                                                        }}
                                                    >
                                                        <MenuItem value={"Первый"}>Первый</MenuItem>
                                                        <MenuItem value={"Второй"}>Второй</MenuItem>
                                                        <MenuItem value={"Третий"}>Третий</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </li>

                                        <div className="biography__block_input">
                                            <div className="biography__name">
                                                <p>Хобби</p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">:(</Tooltip>
                                            </div>
                                            <div className="biography__input">
                                                <TextField
                                                    label={'Хобби'}
                                                    // value={formValue.hobby}
                                                    value={hobby}
                                                    onChange={(value: any) => {
                                                        setHobby(value.target.value)
                                                        // setFormValue((state) => (
                                                        //     {...state, hobby: value.target.value}
                                                        // ))
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="biography__block_input">
                                            <div className="biography__name">
                                                <p className="biography__name_text">С каким животным ассоциируешься?</p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">:(</Tooltip>
                                            </div>
                                            <div className="biography__input">
                                                <TextField
                                                    label={'С каким животным ассоциируешься?'}
                                                    // value={formValue["animal-association"]}
                                                    value={animalAssociation}
                                                    onChange={(value: any) => {
                                                        setAnimalAssociation(value.target.value)
                                                        // setFormValue((state) => (
                                                        //     {...state, "animal-association": value.target.value}
                                                        // ))
                                                    }}
                                                />
                                            </div>
                                        </div>

                                    </ul>
                                </div>
                            </AccordionDetails>
                        </Accordion>


                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Образование и карьера
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="biography__block">
                                    <ul>
                                        {/*<Education formValue={formValue} setFormValue={setFormValue}/>*/}
                                        {/*<Education formValue={education} setFormValue={setEducation}/>*/}
                                        <EducationMemo formValue={education} setFormValue={setEducation}/>
                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Ученная степень
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <TextField
                                                    label={'Ученная степень'}
                                                    // value={formValue.degree.text}
                                                    value={degree.text}
                                                    onChange={(value: any) => {
                                                        setDegree((state)=>({...state, text: value.target.value}))
                                                        // setFormValue((state) => (
                                                        //     {
                                                        //         ...state,
                                                        //         degree: {...state.degree, text: value.target.value}
                                                        //     }
                                                        // ))
                                                    }}
                                                />

                                                <div className="date" id="education-date-id">
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}
                                                                          adapterLocale={'ru'}>
                                                        <DatePicker
                                                            label={'Год'}
                                                            views={['year']}
                                                            onChange={value => {
                                                                setDegree((state)=>({...state, date: getYear(value)}))
                                                                // setFormValue(state => ({
                                                                //     ...state,
                                                                //     degree: {...state.degree, date: getYear(value)}
                                                                // }))
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </div>
                                        </li>


                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Профессия
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <TextField
                                                    label={'Профессия'}
                                                    // value={formValue.profession}
                                                    value={profession}
                                                    onChange={(value: any) => {
                                                        setProfession(value.target.value)
                                                        // setFormValue((state) => (
                                                        //     {...state, profession: value.target.value}
                                                        // ))
                                                    }}
                                                />
                                            </div>
                                        </li>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Деятельность
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <TextField
                                                    label={'Деятельность'}
                                                    // value={formValue.activity}
                                                    value={activity}
                                                    onChange={(value: any) => {
                                                        setActivity(value.target.value)
                                                        // setFormValue((state) => (
                                                        //     {...state, activity: value.target.value}
                                                        // ))
                                                    }}
                                                />
                                            </div>
                                        </li>

                                        {/*<Company formValue={formValue} setFormValue={setFormValue}/>*/}
                                        {/*<Company formValue={company} setFormValue={setCompany}/>*/}
                                        <CompanyMemo formValue={company} setFormValue={setCompany}/>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Состояние
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <TextField
                                                    label={'Состояние'}
                                                    // value={formValue.condition}
                                                    value={condition}
                                                    onChange={(value: any) => {
                                                        setCondition(value.target.value)
                                                        // setFormValue((state) => (
                                                        //     {...state, condition: value.target.value}
                                                        // ))
                                                    }}
                                                />
                                            </div>
                                        </li>

                                        {/*<Awards formValue={formValue} setFormValue={setFormValue}/>*/}
                                        <AwardsMemo formValue={awards} setFormValue={setAwards}/>

                                        {/*<div className="biography__block_input">*/}
                                        {/*    <div className="biography__name">*/}
                                        {/*        <p>Награды</p>*/}
                                        {/*        <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>*/}
                                        {/*        <Tooltip anchorSelect=".my-anchor-element">:(</Tooltip>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="biography__input">*/}
                                        {/*        <TextField*/}
                                        {/*            label={'Награды'}*/}
                                        {/*            value={formValue.awards}*/}
                                        {/*            onChange={(value) => {*/}
                                        {/*                setFormValue((state) => (*/}
                                        {/*                    {...state, awards: value.target.value}*/}
                                        {/*                ))*/}
                                        {/*            }}*/}
                                        {/*        />*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Цитаты
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <TextField
                                                    label={'Цитаты'}
                                                    // value={formValue.quotes}
                                                    value={quotes}
                                                    onChange={(value: any) => {
                                                        setQuotes(value.target.value)
                                                        // setFormValue((state) => (
                                                        //     {...state, quotes: value.target.value}
                                                        // ))
                                                    }}
                                                />
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </AccordionDetails>
                        </Accordion>


                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Ссылки
                            </AccordionSummary>
                            <AccordionDetails >
                                <div className="biography__block">
                                    <ul>
                                        {/*<SocialLink name={{text: 'Сайт', constant: 'site'}} formValue={formValue} setFormValue={setFormValue}/>*/}
                                        <SocialLinkMemo name={{text: 'Сайт', constant: 'site'}} formValue={socialLink} setFormValue={setSocialLink}/>
                                        <SocialLinkMemo name={{text: 'Телеграмм', constant: "telegram"}} formValue={socialLink} setFormValue={setSocialLink}/>
                                        <SocialLinkMemo name={{text: 'YouTube', constant: "youtube"}} formValue={socialLink} setFormValue={setSocialLink}/>
                                        <SocialLinkMemo name={{text: 'Одноклассники', constant: "ok"}} formValue={socialLink} setFormValue={setSocialLink}/>
                                        <SocialLinkMemo name={{text: 'Вконтакте', constant: "vk"}} formValue={socialLink} setFormValue={setSocialLink}/>
                                    </ul>
                                </div>
                            </AccordionDetails>
                        </Accordion>


                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Военная служба
                            </AccordionSummary>
                            <AccordionDetails >
                                <div className="biography__block">
                                    <ul>
                                        {/*<TypeArmy formValue={formValue} setFormValue={setFormValue}/>*/}
                                        <TypeArmyMemo formValue={typeArmy} setFormValue={setTypeArmy}/>
                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Годы службы
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">

                                                <div className="date" id="date-id">
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}
                                                                          adapterLocale={'ru'}>
                                                        <DatePicker
                                                            label={'Год с'}
                                                            views={['year']}
                                                            onChange={(value)=>{
                                                                setServiceYears(state => ({...state, yearFrom: getYear(value)}))
                                                                // setFormValue(state=> (
                                                                //     {...state, service_years: {...state.service_years, yearFrom: getYear(value)}
                                                                //     }))
                                                            }}
                                                            // onChange={value => index, getYear(value), 'yaerFrom'}
                                                        />
                                                    </LocalizationProvider>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}
                                                                          adapterLocale={'ru'}>
                                                        <DatePicker
                                                            label={'Год до'}
                                                            views={['year']}
                                                            onChange={(value)=>{
                                                                setServiceYears(state => ({...state, yearTo: getYear(value)}))
                                                                // setFormValue(state=> (
                                                                //     {...state, service_years: {...state.service_years, yearTo: getYear(value)}
                                                                //     }))
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </div>
                                        </li>
                                        {/*<Rank formValue={formValue} setFormValue={setFormValue}/>*/}
                                        <RankMemo formValue={ranks} setFormValue={setRanks}/>
                                        {/*<Battles formValue={formValue} setFormValue={setFormValue}/>*/}
                                        <BattlesMemo formValue={battles} setFormValue={setBattles}/>
                                        {/*<Army formValue={formValue} setFormValue={setFormValue}/>*/}
                                        <ArmyMemo formValue={armyAwards} setFormValue={setArmyAwards}/>
                                    </ul>
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Добавить свои вопросы
                            </AccordionSummary>
                            <AccordionDetails >

                                <div className="biography__block">
                                    {/*<Question formValue={formValue} setFormValue={setFormValue}/>*/}
                                    <QuestionMemo formValue={questions} setFormValue={setQuestions}/>
                                </div>

                            </AccordionDetails>
                        </Accordion>

                        <button value={2} type='button'
                                onClick={handleChange}
                                className='biography_wrap_button-step'>Следующий шаг
                        </button>
                    </CustomTabPanel>

                    <CustomTabPanel value={buttonActive} index={2}>
                        <div className="biography__img-info">
                            <h3>Загрузить фотографию</h3>
                            <p>Правила загрузки фотографии: только лицо человека о ком биография.</p>
                        </div>

                        <div className="biography__img-wrap">
                            {/*<ImageCropperMemo/>*/}
                            {/*<ImageCropperMemo/>*/}
                            {/*<ImageCropperMemo/>*/}
                            <ImageCropperV2 images={images} setImages={setImages}/>
                        </div>

                        <button value={3} type='button' onClick={handleChange}
                                className='biography_wrap_button-step'>Следующий шаг
                        </button>
                    </CustomTabPanel>

                    <CustomTabPanel value={buttonActive} index={3}>
                        {/*ToDo*/}
                        {/*<Editor/>*/}
                        {/*<Textarea aria-label="minimum height" rows={10} placeholder="Краткое описание текста" />*/}
                        <Textarea minRows={10} placeholder="Краткое описание текста"/>
                        <button type='button' onClick={handleChange} className='biography_wrap_button-step'>Отправить на
                            модерацию
                        </button>
                    </CustomTabPanel>
                </form>
            </div>
        </section>
    )
}
