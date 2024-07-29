'use client'
import "./SettingPage.css"
import LeftMenu from "@/components/leftMenu/LeftMenu";
import type { FormProps } from 'antd';
import { Button, Form, Input, DatePicker, Image, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import Menu from "@/components/menu/Menu";


type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const SettingPage = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([])


    const handlePreviewUpload = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChangeUpload: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div id="setting-page">

            <div id="component-left-menu">
                <LeftMenu />
            </div>
            
            <div id="setting-page-wrapper">
                <h3>Персональные настройки</h3>
                <div id="setting-page-form">
                    <Form
                        name="basic"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}
                        // style={{ maxWidth: 1000 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Имя"
                            name="name"
                            rules={[{ required: true, message: 'Пожалуйста, введите свое имя' }]}
                        >
                            <Input placeholder="Введите имя" />
                        </Form.Item>

                        <Form.Item
                            label="Фамилия"
                            name="surname"
                            rules={[{ required: true, message: 'Пожалуйста, введите свою фамилию' }]}
                        >
                            <Input placeholder="Введите фамилию" />
                        </Form.Item>

                        <Form.Item
                            label="Отчество"
                            name="patronymic"
                            rules={[{ required: true, message: 'Пожалуйста, введите свое отчество' }]}
                        >
                            <Input placeholder="Введите отчество" />
                        </Form.Item>

                        <Form.Item
                            label="E-Mail"
                            name="email"
                            rules={[{ required: true, message: 'Пожалуйста, введите свою почту' }]}
                        >
                            <Input placeholder="Введите почту" />
                        </Form.Item>

                        <Form.Item
                            name="date-picker"
                            label="Дата рождения"
                            rules={[{ required: true, message: 'Пожалуйста, введите дату' }]}
                        >
                            <DatePicker placeholder="Выберите дату" format={['DD-MM-YYYY', 'DD-MM-YY']} />
                        </Form.Item>

                        <Form.Item
                            name="photo"
                            label="Фотографии"
                            rules={[{ required: true, message: 'Пожалуйста, загрузите фотографию' }]}
                        >
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreviewUpload}
                                onChange={handleChangeUpload}
                            >
                                {fileList.length >= 8 ? null :
                                    <button style={{ border: 0, background: 'none' }} type="button">
                                        <PlusOutlined />
                                        <div style={{ fontSize: "12px" }}>Загрузить</div>
                                    </button>
                                }
                            </Upload>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Номер телефона"
                            name="phone"
                            rules={[{ required: true, message: 'Пожалуйста, введите номер телефона' }]}
                        >
                            <Input placeholder="Введите номер телефона" />
                        </Form.Item>

                        <Form.Item
                            label="Почтовый адрес"
                            name="mailing-address"
                            rules={[{ required: true, message: 'Пожалуйста, введите почтовый адрес' }]}
                        >
                            <Input placeholder="Введите номер телефона" />
                        </Form.Item>

                        <Form.Item
                            label="Дополнительные заметки"
                            name="additional-notes"
                        >
                            <Input placeholder="Введите дополнительные заметки" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Подтвердить
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default SettingPage