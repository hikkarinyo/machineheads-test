import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Input, message } from 'antd'
import * as yup from 'yup'

import { RoutesEnum } from 'routes/RoutesEnum'
import { login } from 'store/slices/authSlice'
import { useAppDispatch, useAppSelector } from 'store/store'


const schema = yup.object().shape({
    email: yup.string().email('Некорректный email').required('Email обязателен'),
    password: yup.string().required('Пароль обязателен'),
})

const LoginForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const dispatch = useAppDispatch()
    const history = useHistory()
    const error = useAppSelector((state) => state.auth.error)
    const isLoading = useAppSelector((state) => state.auth.isLoading)
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

    useEffect(() => {
        if (error) {
            message.error(error)
        }

        if (isAuthenticated) {
            history.push(RoutesEnum.Posts)
        }
    }, [error, isAuthenticated, history])

    const onSubmit = (data: { email: string; password: string }) => {
        dispatch(login(data))
    }

    return (
        <Form onFinish={handleSubmit(onSubmit)} layout='vertical'>
            <Form.Item
                label="Email"
                validateStatus={errors.email ? 'error' : ''}
                help={errors.email?.message}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <Input {...field} placeholder="Введите ваш email" />}
                />
            </Form.Item>
            <Form.Item
                label="Пароль"
                validateStatus={errors.password ? 'error' : ''}
                help={errors.password?.message}
            >
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <Input.Password {...field} placeholder="Введите ваш пароль" />}
                />
            </Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={isLoading}
                disabled={isLoading}
            >
                {isLoading ? 'Выполняется запрос' : 'Войти'}
            </Button>
        </Form>
    )
}

export default LoginForm
