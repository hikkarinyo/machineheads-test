import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card, Col, Row } from 'antd'

import { Post } from 'models/Post'

import styles from './Posts.module.scss'

const { Meta } = Card


interface PostsProps {
    posts: Post[]
    onEdit: (postId: number) => void
    onDelete: (postId: number) => void
}

const Posts = ({ posts, onEdit, onDelete }: PostsProps) => {
    return (
        <Row gutter={[16, 16]}>
            {posts.map((post) => (
                <Col span={8} key={post.id}>
                    <Card
                        hoverable
                        cover={<img alt={post.title} src={post.previewPicture?.url} className={styles.card__image} />}
                        className={styles.card}
                        actions={[
                            <EditOutlined key="edit" onClick={() => onEdit(post.id)} />,
                            <DeleteOutlined key="delete" onClick={() => onDelete(post.id)} />,
                        ]}
                    >
                        <Meta
                            title={post.title}
                            description={
                                <>
                                    <div className={styles.card__author}>Автор: {post.authorName ? post.authorName : 'Не указано'}</div>
                                    <div className={styles.card__tags}>
                                        {post.tagNames?.map((tag, index) => (
                                            <span key={index} className={styles.card__tag}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            }
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default Posts
