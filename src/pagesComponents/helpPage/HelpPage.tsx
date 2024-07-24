'use client'
import "./HelpPage.css"
import LeftMenu from "@/components/leftMenu/LeftMenu";
import {Button, Input} from 'antd';
import {useState} from "react";
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;


const { TextArea } = Input;


const HelpPage = () => {
    const [value, setValue] = useState('');

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <div id="help-page">
            <div id="component-left-menu">
                <LeftMenu/>
            </div>
            <div id="help-page-wrapper">
                <h3>Помогите стать лучше</h3>
                <div>
                    Поделитесь идеей по улучшению сервиса или напишите, если заметили ошибку. Мы читаем все сообщения.
                    Если случилось что-то критичное, обратитесь в поддержку.
                </div>

                <TextArea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Введите текст"
                    autoSize={{ minRows: 3, maxRows: 6 }}
                    style={{marginTop:'15px'}}
                />

                <div id="help-uploader-block">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                        <p className="ant-upload-text">Нажмите или перетащите файл в эту область, чтобы загрузить</p>
                    </Dragger>
                </div>

                <Button type="primary">
                    Отправить
                </Button>

            </div>
        </div>
    )
}

export default HelpPage;