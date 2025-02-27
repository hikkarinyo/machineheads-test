import { useEffect } from 'react'

import Table from 'components/table/Table'

import { fetchTagsRequest} from 'store/slices/tagsSlice'
import { useAppDispatch, useAppSelector } from 'store/store'

const TagsPage = () => {
    const dispatch = useAppDispatch()
    const { tags } = useAppSelector((state) => state.tags)

    useEffect(() => {
        dispatch(fetchTagsRequest())
    }, [dispatch])

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Код',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Сортировка',
            dataIndex: 'sort',
            key: 'sort',
        },
    ]

    return <Table data={tags} columns={columns} />
}

export default TagsPage
