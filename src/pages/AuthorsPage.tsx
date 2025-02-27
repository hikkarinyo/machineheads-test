import { useEffect } from 'react'

import Table from 'components/table/Table'

import { fetchAuthorsRequest } from 'store/slices/authorsSlice'
import { useAppDispatch, useAppSelector } from 'store/store'


const AuthorsPage = () => {
    const dispatch = useAppDispatch()
    const { authors } = useAppSelector((state) => state.authors)

    useEffect(() => {
        dispatch(fetchAuthorsRequest())
    }, [dispatch])

    const columns = [
        {
            title: 'Фамилия',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Отечество',
            dataIndex: 'secondName',
            key: 'secondName',
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'shortDescription',
        },
    ]

    return <Table data={authors} columns={columns} />
}

export default AuthorsPage
