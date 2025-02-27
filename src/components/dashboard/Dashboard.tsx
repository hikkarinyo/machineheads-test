import { ReactNode } from 'react'
import { useHistory } from 'react-router-dom'

import { FileTextOutlined, LogoutOutlined, TagsOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Layout, Menu } from 'antd'
import Cookies from 'js-cookie'

import { RoutesEnum } from 'routes/RoutesEnum'
import { logout } from 'store/slices/authSlice'
import { useAppDispatch } from 'store/store'

import styles from './Dashboard.module.scss'

const { Header, Content, Sider } = Layout

type DashboardProps = {
    children: ReactNode
}

const Dashboard = ({ children }: DashboardProps) => {
    const history = useHistory()
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        
        dispatch(logout())
    }

    const items = [
        {
            key: RoutesEnum.Posts,
            icon: <FileTextOutlined />,
            label: 'Посты',
        },
        {
            key: RoutesEnum.Authors,
            icon: <UserOutlined />,
            label: 'Авторы',
        },
        {
            key: RoutesEnum.Tags,
            icon: <TagsOutlined />,
            label: 'Теги',
        },
    ]

    return (
        <Layout className={styles.dashboard}>
            <Sider collapsible breakpoint="lg" collapsedWidth="80">
                <div className={styles.dashboard__menu}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        onClick={({key}) => history.push(key)}
                        items={items}
                    />
                </div>
            </Sider>

            <Layout>
                <Header className={styles.header}>
                    <div className={styles.header__title}>Панель администратора</div>
                    <div className={styles.logoutButton}>
                        <Button type="primary" danger icon={<LogoutOutlined/>} block onClick={handleLogout}>
                            Выйти
                        </Button>
                    </div>
                </Header>

                <Content className={styles.content}>
                    <div className={styles.content__inner}>{children}</div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard
