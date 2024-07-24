import React, { useState } from 'react';
import { Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import "./ImageCropperV2.css"
import {IImage} from "@/modals/Image";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


interface Props{
    images: IImage[]|undefined,
    setImages: Function
}

// const ImageCropperV2: React.FC = (props: Props) => {
const ImageCropperV2= (props: Props) => {

    const [fileList, setFileList] = useState<UploadFile[]>([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
    ]);

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        // props.setImages(newFileList)
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };


    return (
        <ImgCrop
            // rotationSlider
            // aspectSlider
            // modalWidth={1200}
            modalTitle={"Редактирование изображения"}
            modalOk={"Подтвердить"}
            modalCancel={"Отменить"}
            aspect={3 / 4}
            quality={1}
        >
            <Upload
                // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                action=""
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                maxCount={3}
                multiple
                style={{background:"#000"}}
            >
                {fileList.length < 3 && <span style={{fontSize:"24px"}}>+ Загрузить изображение</span>}
            </Upload>
        </ImgCrop>
    );
};

export default ImageCropperV2;