import * as edgedb from "edgedb";
import { createComment, createDislike, createPost, getPosts } from "../dbschema/queries";


const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjM1NTI1NTEuNDkxMDAzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjEwNzAxL2RiL21haW4vZXh0L2F1dGgiLCJzdWIiOiI0ODdhYzFmMC00ZTVmLTExZWYtYjcxZS1kMzRhOTlhNzUxMDgifQ.E2xUYxn1Wl_UxCd_0uMSp7S8h7DVb26j2m9M2gjdYiQ'

const client = edgedb.createClient().withGlobals({
    "ext::auth::client_token": auth_token,
});

// const x = await createPost(client, {text: 'ciao mondo!'})

// const x = await createComment(client, {text:'fai schifo', postId: '73fa157e-4f13-11ef-8e21-4ba0190019e5'})
// console.log(x)



// const x = await createDislike(client, {
//     postId: '73fa157e-4f13-11ef-8e21-4ba0190019e5'
// })
// console.log(x)


const x = await getPosts(client, {limit: 100, offset: 0})
console.log(x.at(-1))