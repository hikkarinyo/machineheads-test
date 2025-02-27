import { useEffect, useState } from 'react'

import { Button, Col, Pagination, Spin } from 'antd'

import Posts from 'components/post/Posts'
import PostModal from 'components/postModal/PostModal'

import { fetchAuthorsRequest } from 'store/slices/authorsSlice'
import {
    addPostRequest, deletePostRequest,
    editPostRequest, fetchPostDetailRequest,
    fetchPostsRequest, resetAddPostSuccess,
} from 'store/slices/postsSlice'
import { fetchTagsRequest } from 'store/slices/tagsSlice'
import { useAppDispatch, useAppSelector } from 'store/store'

import styles from './PostsPage.module.scss'


const PostsPage = () => {
    const dispatch = useAppDispatch()
    const { posts, totalPages, success, loading, postDetail } = useAppSelector((state) => state.posts)
    const { tags } = useAppSelector((state) => state.tags)
    const { authors } = useAppSelector((state) => state.authors)

    const [page, setPage] = useState<number>(1)
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [editablePost, setEditablePost] = useState<number | null>(null)

    useEffect(() => {
        dispatch(fetchPostsRequest(page))
        dispatch(fetchTagsRequest())
        dispatch(fetchAuthorsRequest())
    }, [dispatch, page])

    useEffect(() => {
        if (success) {
            setIsModalVisible(false)
            dispatch(resetAddPostSuccess())
        }
    }, [success, dispatch])

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage)
        }
    }

    const handleAddClick = () => {
        setEditablePost(null)
        setIsModalVisible(true)
    }

    const handleEditClick = (postId: number) => {
        setEditablePost(postId)
        dispatch(fetchPostDetailRequest(postId))
        setIsModalVisible(true)
    }

    const handleSubmitPost = (formData: FormData) => {
        if (editablePost) {
            dispatch(editPostRequest({id: editablePost, data: formData}))
        } else {
            dispatch(addPostRequest(formData))
        }
        setIsModalVisible(false)
    }

    const handleDeleteClick = (postId: number) => {
        dispatch(deletePostRequest(postId))
    }

    return (
        <div className={!loading ? styles.posts : styles.loader}>
            <Button type="primary" onClick={handleAddClick}>
                Добавить пост
            </Button>

            <PostModal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onFinish={handleSubmitPost}
                tags={tags}
                authors={authors}
                initialValues={postDetail}
            />

            {loading ? (
                <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <Spin spinning={loading}/>
                </Col>
            ) : (
                <>
                    <Posts
                        posts={posts}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />
                    <Pagination
                        current={page}
                        total={totalPages * 9}
                        pageSize={10}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </>
            )}
        </div>
    )
}

export default PostsPage
