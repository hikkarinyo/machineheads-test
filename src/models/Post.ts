import { Tag } from 'models/Tag'


export interface PreviewPicture {
    id: number
    name: string
    url: string
}

export interface Post {
    id: number
    title: string
    code: string
    authorName: string
    previewPicture: PreviewPicture
    tagNames: string[]
    updatedAt: string
    createdAt: string
}

export interface PostDetail {
    id: number
    title: string
    code: string
    text: string
    previewPicture: PreviewPicture
    author: {
        id: number
        fullName: string
        avatar?: any
    }
    tags: Tag[]
    updatedAt: string
    createdAt: string
}

export interface PostState {
    posts: Post[]
    loading: boolean
    error: any
    totalPages: number
    currentPage: number
    success: boolean
    postDetail: PostDetail | null,
}

export interface PostFormData {
    code: string
    title: string
    authorId: number
    tagIds: number[]
    text: string
    previewPicture?: File | null
}
