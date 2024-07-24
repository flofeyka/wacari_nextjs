// 'use client'
// import "./BiographyCreate.css"
// import LeftMenu from "@/components/leftMenu/LeftMenu";
// import {Button, message, Steps, Form, Input, Select, Image, Upload, Space, DatePicker, Card} from 'antd';
// import type { FormProps } from 'antd';
// import {useState} from "react";
// import {IBiography} from "@/modals/Biography";
//
//
// const BiographyCreate = () => {
//     const [current, setCurrent] = useState(0);
//     const [formValue, setFormValue] = useState<IBiography>()
//
//
//     const onFinishStepOne: FormProps['onFinish'] = (values) => {
//         console.log('Success:', values);
//         next()
//     };
//
//     const onFinishFailedStepOne: FormProps['onFinishFailed'] = (errorInfo) => {
//         console.log('Failed:', errorInfo);
//     };
//
//     const next = () => {
//         setCurrent(current + 1);
//     };
//
//     const prev = () => {
//         setCurrent(current - 1);
//     };
//
//     console.log("formValue", formValue)
//
//     const steps = [
//         {
//             title: 'Шаг первый',
//             description: 'Основная информация',
//             content:
//             <div style={{marginTop:"20px", display:"flex", justifyContent:"center"}}>
//                 <Form
//                     name="basic"
//                     labelCol={{span: 4}}
//                     // wrapperCol={{ span: 16 }}
//                     onFinish={onFinishStepOne}
//                     onFinishFailed={onFinishFailedStepOne}
//                     // onValuesChange={(changedValues, allValues) => {
//                     //     setFormValue(state => ({...state, ...changedValues}))
//                     // }}
//                     style={{width: "90%"}}
//                     autoComplete="off"
//                 >
//                     <Form.Item label="ФИО" style={{marginBottom: 0}} tooltip="tooltip">
//                         <Space.Compact style={{width: "100%"}}>
//                             <Form.Item
//                                 name="surname"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%'}}
//                             >
//                                 <Input
//                                     placeholder="Фамилия"
//                                     value={formValue.surname}
//                                     onChange={(value) => {
//                                         setFormValue((state: any) => ({...state, surname: value.target.value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                             <Form.Item
//                                 name="name"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%'}}
//                             >
//                                 <Input
//                                     placeholder="Имя"
//                                     value={formValue.name}
//                                     onChange={(value) => {
//                                         setFormValue((state: any) => ({...state, name: value.target.value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                             <Form.Item
//                                 name="patronymic"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%'}}
//                             >
//                                 <Input
//                                     placeholder="Отчество"
//                                     value={formValue.patronymic}
//                                     onChange={(value) => {
//                                         setFormValue((state: any) => ({...state, patronymic: value.target.value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                         </Space.Compact>
//                     </Form.Item>
//
//                     <Form.Item label="Место рождения" style={{marginBottom: 0}} tooltip="tooltip">
//                         <Space.Compact style={{width: "100%"}}>
//                             <Form.Item
//                                 name="birth-continent"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%'}}
//                             >
//                                 <Select
//                                     placeholder="Выберите континент"
//                                     value={formValue["birth-continent"]}
//                                     options={[{value: 'continent', label: 'continent'}]}
//                                     onSelect={(value) => {
//                                         setFormValue((state: any) => ({...state, "birth-continent": value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                             <Form.Item
//                                 name="birth-country"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%'}}
//                             >
//                                 <Select
//                                     placeholder="Выберите страну"
//                                     value={formValue["birth-country"]}
//                                     options={[{value: 'country', label: 'country'}]}
//                                     onSelect={(value) => {
//                                         setFormValue((state: any) => ({...state, "birth-country": value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                             <Form.Item
//                                 name="birth-city"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%'}}
//                             >
//                                 <Select
//                                     placeholder="Выберите город"
//                                     value={formValue["birth-city"]}
//                                     options={[{value: 'city', label: 'city'}]}
//                                     onSelect={(value) => {
//                                         setFormValue((state: any) => ({...state, "birth-city": value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                         </Space.Compact>
//                     </Form.Item>
//
//                     <Form.Item
//                         tooltip="tooltip"
//                         name="birthday-date"
//                         label="Дата рождения"
//                         rules={[{required: true, message: 'Обязательное поле'}]}
//                     >
//                         <div id="birthday-date">
//                             <DatePicker
//                                 format={"DD-MM-YY"}
//                                 placeholder="Выберите дату"
//                                 style={{width: "100%"}}
//                                 onChange={(date, dateString) => {
//                                     setFormValue((state: any) => ({...state, "birthday-date": dateString}))
//                                 }}
//                             />
//                         </div>
//                     </Form.Item>
//
//                     <Form.Item
//                         tooltip="tooltip"
//                         name="nicknames"
//                         label="Прозвище"
//                         rules={[{required: true, message: 'Обязательное поле'}]}
//                     >
//                         <Input
//                             placeholder="Введите прозвище"
//                             value={formValue.nicknames}
//                             onChange={(value) => {
//                                 setFormValue((state: any) => ({...state, nicknames: value.target.value}))
//                             }}
//                         />
//                     </Form.Item>
//
//                     <Form.Item
//                         tooltip="tooltip"
//                         name="death-date"
//                         label="Дата смерти"
//                         // rules={[{ required: true, message: 'Обязательное поле' }]}
//                     >
//                         <div id="death-date">
//                             <DatePicker
//                                 format={"DD-MM-YY"}
//                                 placeholder="Выберите дату смерти"
//                                 style={{width: "100%"}}
//                                 onChange={(date, dateString) => {
//                                     setFormValue((state: any) => ({...state, "death-date": dateString}))
//                                 }}
//                             />
//                         </div>
//                     </Form.Item>
//
//                     <Form.Item label="Место смерти" style={{marginBottom: 0}} tooltip="tooltip">
//                         <Space.Compact style={{width: "100%"}}>
//                             <Form.Item
//                                 name="death-continent"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%'}}
//                             >
//                                 <Select
//                                     placeholder="Выберите континент"
//                                     value={formValue["death-continent"]}
//                                     options={[{value: 'continent', label: 'continent'}]}
//                                     onSelect={(value) => {
//                                         setFormValue((state: any) => ({...state, "death-continent": value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                             <Form.Item
//                                 name="death-country"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%'}}
//                             >
//                                 <Select
//                                     placeholder="Выберите страну"
//                                     value={formValue["death-country"]}
//                                     options={[{value: 'Россия', label: 'Россия'}]}
//                                     onSelect={(value) => {
//                                         setFormValue((state: any) => ({...state, "death-country": value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                             <Form.Item
//                                 name="death-city"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%'}}
//                             >
//                                 <Select
//                                     placeholder="Выберите город"
//                                     value={formValue["death-city"]}
//                                     options={[{value: 'Москва', label: 'Москва'}]}
//                                     onSelect={(value) => {
//                                         setFormValue((state: any) => ({...state, "death-city": value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                         </Space.Compact>
//                     </Form.Item>
//
//                     <Form.Item
//                         tooltip="tooltip"
//                         name="death-cause"
//                         label="Причина смерти"
//                         // rules={[{ required: true, message: 'Обязательное поле' }]}
//                     >
//                         <Input
//                             placeholder="Введите причину смерти"
//                             value={formValue["death-cause"]}
//                             onChange={(value) => {
//                                 setFormValue((state: any) => ({...state, "death-cause": value.target.value}))
//                             }}
//                         />
//                     </Form.Item>
//
//                     <Form.Item label="Похоронен" style={{marginBottom: 0}} tooltip="tooltip">
//                         <Space.Compact style={{width: "100%"}}>
//                             <Form.Item
//                                 name="buried-continent"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%'}}
//                             >
//                                 <Select
//                                     placeholder="Выберите континент"
//                                     value={formValue["buried-continent"]}
//                                     options={[{value: 'continent', label: 'continent'}]}
//                                     onSelect={(value) => {
//                                         setFormValue((state: any) => ({...state, "buried-continent": value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                             <Form.Item
//                                 name="buried-country"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%'}}
//                             >
//                                 <Select
//                                     placeholder="Выберите страну"
//                                     value={formValue["buried-country"]}
//                                     options={[{value: 'Россия', label: 'Россия'}]}
//                                     onSelect={(value) => {
//                                         setFormValue((state: any) => ({...state, "buried-country": value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                             <Form.Item
//                                 name="buried-city"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%'}}
//                             >
//                                 <Select
//                                     placeholder="Выберите город"
//                                     value={formValue["buried-city"]}
//                                     options={[{value: 'city', label: 'conticitynent'}]}
//                                     onSelect={(value) => {
//                                         setFormValue((state: any) => ({...state, "buried-city": value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                         </Space.Compact>
//                     </Form.Item>
//
//                     {formValue.citizenship.map((item, i) => {
//                         return (
//                             <Form.Item
//                                 key={i}
//                                 label="Гражданство"
//                                 name="citizenship"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '100%', marginBottom: 0}}
//                                 tooltip="tooltip"
//                             >
//                                 <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
//                                     <Select
//                                         placeholder="Выберите гражданство"
//                                         value={formValue.citizenship[i].value}
//                                         options={
//                                             [
//                                                 {value: 'Россия', label: 'Россия'},
//                                                 {value: 'Не Россия', label: 'Не Россия'},
//                                             ]
//                                         }
//                                         onSelect={(value) => {
//                                             setFormValue((state: any) => (
//                                                 {
//                                                     ...state, citizenship: formValue.citizenship.map(
//                                                         (item, indexItem) =>
//                                                             (indexItem === i ? {...item, value: value} : item)
//                                                     )
//                                                 }
//                                             ))
//                                         }}
//                                     />
//                                     {formValue.citizenship.length > 1 ?
//                                         <span
//                                             className="delete-element-button"
//                                             onClick={() => {
//                                                 setFormValue(
//                                                     {
//                                                         ...formValue,
//                                                         citizenship: formValue.citizenship.filter(
//                                                             (item, index) => index !== i
//                                                         )
//                                                     }
//                                                 )
//                                             }}
//                                         >
//                                             Удалить
//                                         </span>
//                                         : null}
//                                 </div>
//                             </Form.Item>
//                         )
//                     })}
//                     <div style={{display: "flex", justifyContent: "flex-end", marginTop: "15px"}}>
//                         <Button
//                             style={{background: "#cacaca"}}
//                             onClick={() => {
//                                 setFormValue(
//                                     {...formValue, citizenship: [...formValue.citizenship, {value: null}]}
//                                 )
//                             }}
//                         >
//                             Добавить гражданство
//                         </Button>
//                     </div>
//
//                     <Form.Item label="Место жительства" style={{marginBottom: 0, marginTop: "20px"}} tooltip="tooltip">
//                         <Space.Compact style={{width: "100%"}}>
//                             <Form.Item
//                                 name="location-continent"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%', marginBottom: 0}}
//                             >
//                                 <Select
//                                     placeholder="Выберите континент"
//                                     // value={formValue["birth-continent"]}
//                                     options={[{value: 'location-continent', label: 'location-continent'}]}
//                                     onSelect={(value) => {
//                                         setFormValue((state: any) => ({...state, "location-continent": value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                             <Form.Item
//                                 name="location-country"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%', marginBottom: 0}}
//                             >
//                                 <Select
//                                     placeholder="Выберите страну"
//                                     // value={formValue["location-country"]}
//                                     options={[{value: 'location-country', label: 'location-country'}]}
//                                     onSelect={(value) => {
//                                         setFormValue((state: any) => ({...state, "location-country": value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                             <Form.Item
//                                 name="location-city"
//                                 rules={[{required: true, message: 'Обязательное поле'}]}
//                                 style={{display: 'inline-block', width: '50%', marginBottom: 0}}
//                             >
//                                 <Select
//                                     placeholder="Выберите город"
//                                     // value={formValue["birth-city"]}
//                                     options={[{value: 'location-city', label: 'location-city'}]}
//                                     onSelect={(value) => {
//                                         setFormValue((state: any) => ({...state, "location-city": value}))
//                                     }}
//                                 />
//                             </Form.Item>
//                         </Space.Compact>
//                     </Form.Item>
//                     <div style={{display: "flex", justifyContent: "flex-end", marginTop: "15px"}}>
//                         <Button
//                             style={{background: "#cacaca"}}
//                             onClick={() => {
//                                 // setFormValue(
//                                 //     {...formValue, citizenship: [...formValue.citizenship, {value: null}]}
//                                 // )
//                             }}
//                         >
//                             Добавить место жительство
//                         </Button>
//                     </div>
//
//
//                     <Form.Item>
//                         <Button type="primary" htmlType="submit">
//                             Продолжить
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </div>,
//         },
//         {
//             title: 'Шаг второй',
//             description: 'Загрузка фото и комментарий',
//             content: 'Second-content',
//         },
//     ];
//
//
//     return (
//         <div id="biography-create-page">
//             <div id="component-left-menu">
//                 <LeftMenu/>
//             </div>
//             <div id="biography-create-page-wrapper">
//                 <h3>Создание биографии</h3>
//                 <div>
//
//                     {/*<Steps current={current} items={items} />*/}
//                     <Steps
//                         type="navigation"
//                         current={current}
//                         onChange={(value) => setCurrent(value)}
//                         className="site-navigation-steps"
//                         items={steps.map((item) => (
//                             {
//                                 key: item.title,
//                                 // description: item.description,
//                                 title: item.title
//                             }
//                         ))}
//                     />
//                     <div id="biography-create-content">
//                         {steps[current].content}
//                     </div>
//                     {/*<div style={{ marginTop: 24 }}>*/}
//                     {/*    {current < steps.length - 1 && (*/}
//                     {/*        <Button type="primary" onClick={() => next()}>*/}
//                     {/*            Продолжить*/}
//                     {/*        </Button>*/}
//                     {/*    )}*/}
//                     {/*    {current === steps.length - 1 && (*/}
//                     {/*        <Button type="primary" onClick={() => message.success('Processing complete!')}>*/}
//                     {/*            Подтвердить*/}
//                     {/*        </Button>*/}
//                     {/*    )}*/}
//                     {/*    {current > 0 && (*/}
//                     {/*        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>*/}
//                     {/*            Назад*/}
//                     {/*        </Button>*/}
//                     {/*    )}*/}
//                     {/*</div>*/}
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default BiographyCreate;