import {fetchJson} from "./tools/request";

export interface IPost {
    id: number,
    userId: number,
    title: string,
    body: string
}

const BASE_PATH = import.meta.env.VITE_JSON_PLACEHOLDER_API_BASE_URL

export async function apiPostsGetAll(init?: RequestInit): Promise<IPost[]> {
    return fetchJson(`${BASE_PATH}/posts`, {
        method: 'GET',
        ...init
    })
}

export async function apiPostById(params: {
    id: number | string
}, init?: RequestInit): Promise<IPost> {
    return fetchJson(`${BASE_PATH}/posts/${params.id}`, {
        method: 'GET',
        ...init
    })
}
