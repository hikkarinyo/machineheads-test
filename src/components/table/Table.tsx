import { Table as TableAntd } from 'antd'

const Table = ({ data, columns }: any) => {
    return <TableAntd dataSource={data} columns={columns} rowKey="id" />
}

export default Table
