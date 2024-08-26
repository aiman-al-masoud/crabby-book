# Crabby Book

_Asocial_ networking service where the only kind of reaction you can have to other people's posts is critical: _if you like something, then shut up about it_.

<img src="src/frontend/images/favicon.ico" />

## Why

This project is just meant to practice using [EdgeDB](https://www.edgedb.com/) and [Solid JS](https://www.solidjs.com/).

## EdgeDB

EdgeDB is a relational database that does not use SQL.

EdgeDB and EdgeQL (EdgeDB's query language) have so many nice features that it was impossible to check them all out, some of the ones I've tried out include:

- polymorphic types (e.g. post extends creatable, reaction extends creatable, dislike extends reaction...).
- composable hierarchical queries.
- auto-generated TS interfaces from EdgeQL schema.
- auto-generated, parametrized TS functions from EdgeQL queries.
- built-in authentication (I used the local email+password auth provider).
- built in authentication UI.
- global user.
- access policies.

## Solid JS

It's a reactive frontend framework based on signals and supporting TSX syntax. It was released in 2020 (~ 7 years after React). Unlike React, Solid does not use a virtual DOM: it compiles down to plain javascript, allowing for faster performance.

From a DX point of view, Solid is a little more intuitive to use than React (at least in my opinion). 

For the styling, I used Bootstrap and SCSS.

## Future Improvements

- Add websockets for faster real-time updates.
- Improve the way static resources are served.
- Improve authentication handling.

## EdgeDB useful commands

```sh

# list versions of edgedb installed on your machine.
edgedb server list-versions --installed-only

# initialize a new project (database) which will be linked to the current folder name.
edgedb project init
# ... in the initialization prompts, to select a specific version of EdgeDB (e.g. version 5.5)
# enter the version name preceeded by an equal sign (e.g. =5.5).
# ... it may take a while to initialize.

# opens up the interactive web UI
edgedb ui

# to run migrations, after editing "dbschema/default.esdl":
edgedb migration create
edgedb migration apply

# to generate TS interfaces from the EdgeQL schema.
npx @edgedb/generate interfaces

# to generate TS functions from EdgeQL queries.
npx @edgedb/generate queries --file

# wipe DB away... wipes away schema too!
edgedb database wipe 

```

## Useful Links

- https://docs.edgedb.com/guides/auth/email_password
- https://docs.edgedb.com/ai
- https://docs.edgedb.com/guides/auth/built_in_ui
- https://www.edgedb.com/showcase/data-modeling
- https://solid-libs.github.io/solid-bootstrap/components/buttons
