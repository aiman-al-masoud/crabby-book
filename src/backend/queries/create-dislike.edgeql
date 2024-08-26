insert Dislike{
    author := global current_user,
    post := assert_single((select Post filter <str>Post.id = <str>$postId)),
}