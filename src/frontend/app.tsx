import { createSignal } from "solid-js";
import "./scss/app.css";
import type { CreateAngryFaceArgs, CreateDislikeArgs, CreatePostArgs, GetPostsReturns } from "../../dbschema/queries";
import { Button, ButtonGroup, Card, Container, Image, Row, Col, Form, CardHeader } from "solid-bootstrap";


const [posts, setPosts] = createSignal([] as GetPostsReturns)
const [textNewRant, setTextNewRant] = createSignal('')

function showPosts() {
  return <>{posts().map(x => showPost(x))}</>
}

function showPost(post: GetPostsReturns[0]) {

  return <Card
    style={{ width: "18rem" }}
    class="m-2"
  >
    <Card.Header>
      By: {post.author_details?.email}
      <Image src="https://s.abcnews.com/images/Politics/GTY_donald_trump_ml_160304_16x9_992.jpg" width={60} roundedCircle></Image>
    </Card.Header>
    <Card.Body>
      {post.text}
    </Card.Body>

    <ButtonGroup>
      <Button onClick={() => createDislike({ postId: post.id })}>{post.dislikes} 👎</Button>
      <Button onClick={() => createAngryFace({ postId: post.id })}>{post.angry_faces} 😠</Button>
    </ButtonGroup>

    <Card.Footer>
      {post.created_at?.toString()}
    </Card.Footer>

  </Card>
}


function showEditor() {


  return <>

    <Card>

      <Card.Header>
        New Rant
      </Card.Header>

      <Card.Body>

        <Form.Control as='textarea' value={textNewRant()} oninput={e => setTextNewRant(e.target.value)} rows={3} id="ciao" placeholder="Your rant goes here..." />
        <Button onClick={() => createPost({ text: textNewRant() })}>Post!</Button>

      </Card.Body>
    </Card>

  </>
}

export default function App() {

  setInterval(() => {
    getPosts()
  }, 1000)

  return <>
    <Container>

      <Row>

        <CardHeader>

          <h1>
            <span style={{
              color: 'orange',
              "text-shadow": "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000"
            }}>Crabby</span>
            <span
              style={{
                color: 'black',
                "text-shadow": "2px 0 #ffa500, -2px 0 #ffa500, 0 2px #ffa500, 0 -2px #ffa500, 1px 1px #ffa500, -1px -1px #ffa500, 1px -1px #ffa500, -1px 1px #ffa500"
              }}
            >Book</span>
          </h1>

        </CardHeader>

      </Row>
      <Row>

        <Col>{showPosts()}</Col>
        <Col>{showEditor()}</Col>

      </Row>
    </Container>
  </>


}

const SERVER_PORT = 3000;

async function getPosts() {

  const results = await fetch(`http://localhost:${SERVER_PORT}/query/get-posts?limit=100&offset=0`)
  const posts = await results.json() as GetPostsReturns
  setPosts(posts)
}

async function createPost(post: CreatePostArgs) {

  const response = await fetch(
    `http://localhost:${SERVER_PORT}/query/create-post`,
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

async function createAngryFace(args: CreateAngryFaceArgs) {

  const response = await fetch(
    `http://localhost:${SERVER_PORT}/query/create-angry-face`,
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

async function createDislike(args: CreateDislikeArgs) {

  const response = await fetch(
    `http://localhost:${SERVER_PORT}/query/create-dislike`,
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



