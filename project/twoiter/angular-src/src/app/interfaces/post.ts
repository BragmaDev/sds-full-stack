import { Timestamp } from "rxjs";

export interface Post {
    posterId: string,
    content: string,
    createdAt: number,
    updatedAt: number
}