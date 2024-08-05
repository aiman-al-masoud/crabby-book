// import * as edgedb from "edgedb";
// import { createComment, createDislike, createPost, getPosts } from "../dbschema/queries";


// const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjM4MDQ0ODUuNTgwMjUsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MTA3MDEvZGIvbWFpbi9leHQvYXV0aCIsInN1YiI6IjQ4N2FjMWYwLTRlNWYtMTFlZi1iNzFlLWQzNGE5OWE3NTEwOCJ9.Ec3V6Iooqco-XiLj-7S-9vekEwVs5_7zgggeg10pWbs'

// const client = edgedb.createClient().withGlobals({
//     "ext::auth::client_token": auth_token,
// });

// const x = await createPost(client, {text: 'ciao mondo!'})
// console.log(x)


// const x = await createComment(client, {text:'fai schifo', postId: '73fa157e-4f13-11ef-8e21-4ba0190019e5'})
// console.log(x)

// const x = await createDislike(client, {
//     postId: '73fa157e-4f13-11ef-8e21-4ba0190019e5'
// })
// console.log(x)


// const x = await getPosts(client, {limit: 100, offset: 0})
// console.log(x.at(-1))