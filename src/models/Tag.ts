export interface Tag {
    id: number
    name: string
    code: string
    sort: number | null
    updatedAt: string
    createdAt: string
}

export interface TagState {
    tags: Tag[]
    loading: boolean
    error: string | null
}
