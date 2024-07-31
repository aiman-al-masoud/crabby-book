# CrabbyBook

A project to practice using EdgeDB and Solid JS.

## Model & Features

A basic stupid social network. 

- creatable (polymorphic)
    - posts
    - reactions (polymorphic)
        - dislike
        - angry face
        - sad face
        - comments
- auto generated interfaces and TS functions from queries
- authentication
- global user
- built in authentication UI

# 

edgedb server list-versions --installed-only
edgedb project init
use =5.5 for exact version 5.5
takes a lot of time to initialize
create types in dbschema/default.esdl
https://docs.edgedb.com/guides/auth/email_password
edgedb ui
https://docs.edgedb.com/ai
add "using extension auth;" to schema
edgedb migration create
edgedb migration apply
open up edgedb ui to manage auth (auth panel)
set auth signing key
providers > add providers > local > email+password
require_verification=false to skip email verification setup
install and test mailpit
https://mailpit.axllent.org
http://localhost:10701/db/main/ext/auth/ui/signin
http://localhost:10701/db/main/ext/auth/ui/signup
User should signup up from here: http://localhost:3000/auth/ui/signup

npx @edgedb/generate interfaces
npx @edgedb/generate queries --file

https://docs.edgedb.com/guides/auth/built_in_ui

edgedb database wipe # wipes away schema too!

https://www.edgedb.com/showcase/data-modeling


https://github.com/t3dotgg/solid-trpc




