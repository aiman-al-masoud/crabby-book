import type { GetPostsReturns } from "../../../dbschema/queries";
import { Button, ButtonGroup, Card, Image } from "solid-bootstrap";
import { createAngryFace, createDislike } from '../api'


export function Posts(props: { posts: GetPostsReturns }) {
    return <>{props.posts.map(p => <Post post={p} />)}</>
}

function Post(props: { post: GetPostsReturns[0] }) {

    return <Card
        style={{ width: "18rem" }}
        class="m-2"
    >
        <Card.Header>
            By: {props.post.author_details?.email}
            <Image src="http://localhost:3000/auth/builtin/res/favicon.ico" width={30} roundedCircle></Image>
        </Card.Header>

        <Card.Body>
            {props.post.text}
        </Card.Body>

        <ButtonGroup>
            <Button onClick={() => createDislike({ postId: props.post.id })}>{props.post.dislikes} 👎</Button>
            <Button onClick={() => createAngryFace({ postId: props.post.id })}>{props.post.angry_faces} 😠</Button>
        </ButtonGroup>

        <Card.Footer>
            {props.post.created_at?.toString()}
        </Card.Footer>

    </Card>
}