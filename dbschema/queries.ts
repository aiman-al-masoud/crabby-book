// GENERATED by @edgedb/generate v0.5.4

import type {Executor} from "edgedb";

export type CreateAngryFaceArgs = {
  readonly "postId": string;
};

export type CreateAngryFaceReturns = {
  "id": string;
};

export function createAngryFace(client: Executor, args: CreateAngryFaceArgs): Promise<CreateAngryFaceReturns> {
  return client.queryRequiredSingle(`\
insert AngryFace{
    author := global current_user,
    post := assert_single((select Post filter <str>Post.id = <str>$postId)),
}`, args);

}


export type CreateDislikeArgs = {
  readonly "postId": string;
};

export type CreateDislikeReturns = {
  "id": string;
};

export function createDislike(client: Executor, args: CreateDislikeArgs): Promise<CreateDislikeReturns> {
  return client.queryRequiredSingle(`\
insert Dislike{
    author := global current_user,
    post := assert_single((select Post filter <str>Post.id = <str>$postId)),
}`, args);

}


export type CreateCommentArgs = {
  readonly "text": string;
  readonly "postId": string;
};

export type CreateCommentReturns = {
  "id": string;
};

export function createComment(client: Executor, args: CreateCommentArgs): Promise<CreateCommentReturns> {
  return client.queryRequiredSingle(`\
insert Comment {
    text := <str>$text,
    author := global current_user,
    post := assert_single((select Post filter <str>Post.id = <str>$postId)),
}`, args);

}


export type CreatePostArgs = {
  readonly "text": string;
};

export type CreatePostReturns = {
  "id": string;
};

export function createPost(client: Executor, args: CreatePostArgs): Promise<CreatePostReturns> {
  return client.queryRequiredSingle(`\
insert Post {
    text := <str>$text,
    author := global current_user,
}`, args);

}


export type GetPostsArgs = {
  readonly "offset": number;
  readonly "limit": number;
};

export type GetPostsReturns = Array<{
  "id": string;
  "text": string;
  "author_details": {
    "email": string;
  } | null;
  "created_at": Date | null;
  "comments": Array<{
    "text": string;
    "created_at": Date | null;
    "author_details": {
      "email": string;
    } | null;
  }>;
  "dislikes": number;
  "angry_faces": number;
}>;

export function getPosts(client: Executor, args: GetPostsArgs): Promise<GetPostsReturns> {
  return client.query(`\
select Post {
    id,
    text,
    author_details := (select ext::auth::EmailPasswordFactor { email } filter ext::auth::EmailPasswordFactor.identity = Post.author),
    created_at,
    comments := (select Comment {
        text,
        created_at,
        author_details := (select ext::auth::EmailPasswordFactor { email } filter ext::auth::EmailPasswordFactor.identity = Comment.author),
    } filter Comment.post = Post),
    dislikes := count((select Dislike filter Dislike.post = Post)),
    angry_faces := count((select AngryFace filter AngryFace.post = Post)),
}
order by .created_at desc
offset <int32>$offset
limit <int32>$limit`, args);

}
