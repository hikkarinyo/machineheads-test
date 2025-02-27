import { Col, Layout, Row, Typography } from 'antd'

import LoginForm from 'components/loginForm/LoginForm'

const { Content } = Layout
const { Title } = Typography

const LoginPage = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Row justify="center" align="middle" style={{ width: '100%' }}>
                    <Col xs={24} sm={18} md={12} lg={8} xl={6}>
                        <div style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Title level={3} style={{ textAlign: 'center' }}>
                                Войдите в систему
                            </Title>
                            <LoginForm />
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default LoginPage
