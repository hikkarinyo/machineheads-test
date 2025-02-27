import {useEffect, useState} from 'react'
import { Controller,useForm } from 'react-hook-form'

import { UploadOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Input, Modal, Select, Upload, UploadFile } from 'antd'
import * as yup from 'yup'

import { PostDetail, PostFormData } from 'models/Post'

const { TextArea } = Input


const schema = yup.object().shape({
    code: yup.string().matches(/^[a-z0-9_-]+$/, 'Разрешены только символы: a-z, 0-9, _, -.').required('Код обязателен'),
    title: yup.string().required('Заголовок обязателен'),
    authorId: yup.number().required('Автор обязателен'),
    tagIds: yup.array().min(1, 'Выберите хотя бы один тег').required(),
    text: yup.string().required('Текст обязателен'),
})

interface PostModalProps {
    visible: boolean
    onCancel: () => void
    onFinish: (values: FormData) => void
    tags: { id: number; name: string }[]
    authors: { id: number; name: string }[]
    initialValues?: PostDetail | null
}

const PostModal = ({ visible, onCancel, onFinish, tags, authors, initialValues }: PostModalProps) => {
    const [fileList, setFileList] = useState<any>([])
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            code: '',
            title: '',
            authorId: undefined,
            tagIds: [],
            text: '',
        },
    })

    useEffect(() => {
       if (!visible) {
           reset()
           setFileList([])
       }

        if (visible && initialValues) {
            reset({
                code: initialValues.code,
                title: initialValues.title,
                authorId: initialValues.author.id,
                tagIds: initialValues.tags.map((tag) => tag.id),
                text: initialValues.text,
            })
            setFileList(
                initialValues?.previewPicture
                    ? [{ id: initialValues.previewPicture.id, name: initialValues.previewPicture.name, url: initialValues.previewPicture.url }]
                    : [],
            )
        }

    }, [visible, initialValues])

    const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
        setFileList(fileList)
    }

    const handleFormSubmit = (values: PostFormData) => {
        const formData = new FormData()
        formData.append('code', values.code)
        formData.append('title', values.title)
        formData.append('authorId', values.authorId.toString())
        formData.append('text', values.text)
        values.tagIds.forEach((tagId: number) => formData.append('tagIds[]', tagId.toString()))
        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append('previewPicture', fileList[0].originFileObj)
        }
        onFinish(formData)
    }

    return (
        <Modal
            title={initialValues ? 'Редактировать пост' : 'Добавить пост'}
            open={visible}
            onOk={handleSubmit(handleFormSubmit)}
            onCancel={onCancel}
            cancelText='Отменить'
        >
            <Form layout="vertical">
                <Form.Item label="Код" validateStatus={errors.code ? 'error' : ''} help={errors.code?.message}>
                    <Controller name="code" control={control} render={({ field }) => <Input {...field} />} />
                </Form.Item>
                <Form.Item label="Заголовок" validateStatus={errors.title ? 'error' : ''} help={errors.title?.message}>
                    <Controller name="title" control={control} render={({ field }) => <Input {...field} />} />
                </Form.Item>
                <Form.Item label="Автор" validateStatus={errors.authorId ? 'error' : ''} help={errors.authorId?.message}>
                    <Controller
                        name="authorId"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} value={field.value} onChange={(value) => field.onChange(value)}>
                                {authors.map((author) => (
                                    <Select.Option key={author.id} value={author.id}>
                                        {author.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    />
                </Form.Item>
                <Form.Item label="Теги" validateStatus={errors.tagIds ? 'error' : ''} help={errors.tagIds?.message}>
                    <Controller
                        name="tagIds"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} mode="multiple" value={field.value} onChange={(value) => field.onChange(value)}>
                                {tags.map((tag) => (
                                    <Select.Option key={tag.id} value={tag.id}>
                                        {tag.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    />
                </Form.Item>
                <Form.Item label="Текст" validateStatus={errors.text ? 'error' : ''} help={errors.text?.message}>
                    <Controller name="text" control={control} render={({ field }) => <TextArea rows={4} {...field} />} />
                </Form.Item>
                <Form.Item label="Превью">
                    <Upload fileList={fileList} beforeUpload={() => false} onChange={handleFileChange} listType="picture">
                        <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default PostModal
