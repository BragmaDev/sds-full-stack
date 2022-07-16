export interface Post {
    _id: string,
    posterId: string,
    content: string,
    createdAt: number,
    updatedAt: number,
    formattedTimestamp: string,
    poster: string
}