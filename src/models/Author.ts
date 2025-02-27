export interface Author {
    id: number
    name: string
    lastName: string
    secondName: string
    avatar: string | null
    updatedAt: string
    createdAt: string
}

export interface AuthorsState {
    authors: Author[]
    loading: boolean
    error: string | null
}
