import type { CreateAngryFaceArgs, CreateDislikeArgs, CreatePostArgs, GetPostsReturns } from "../../dbschema/queries";

const SERVER_PORT = 3000;
const baseUrl = `http://localhost:${SERVER_PORT}`

export async function getPosts() {

    const results = await fetch(`${baseUrl}/query/get-posts?limit=100&offset=0`)
    const posts = await results.json() as GetPostsReturns
    return posts
}

export async function createPost(post: CreatePostArgs) {

    const response = await fetch(
        `${baseUrl}/query/create-post`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post),
        },
    )

}

export async function createAngryFace(args: CreateAngryFaceArgs) {

    const response = await fetch(
        `${baseUrl}/query/create-angry-face`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(args),
        },
    )
}

export async function createDislike(args: CreateDislikeArgs) {

    const response = await fetch(
        `${baseUrl}/query/create-dislike`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(args),
        },
    )
}

