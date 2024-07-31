import * as edgedb from "edgedb";
import { createPost } from "./dbschema/queries";


const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjM1NTI1NTEuNDkxMDAzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjEwNzAxL2RiL21haW4vZXh0L2F1dGgiLCJzdWIiOiI0ODdhYzFmMC00ZTVmLTExZWYtYjcxZS1kMzRhOTlhNzUxMDgifQ.E2xUYxn1Wl_UxCd_0uMSp7S8h7DVb26j2m9M2gjdYiQ'

const client = edgedb.createClient().withGlobals({
    "ext::auth::client_token": auth_token,
});

const x = await createPost(client, {text: 'ciao mondo!'})
console.log(x)

