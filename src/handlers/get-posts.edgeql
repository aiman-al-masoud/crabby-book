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
order by .created_at
offset <int32>$offset
limit <int32>$limit
