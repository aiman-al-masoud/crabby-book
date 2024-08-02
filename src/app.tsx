import { createSignal } from "solid-js";
import "./app.css";
import type { GetPostsReturns } from "../dbschema/queries";
import { Accordion, Button, ButtonGroup, Card, Container, Image, Row, Col, Form, CardHeader } from "solid-bootstrap";


const initialPosts: GetPostsReturns = [
  { text: 'Despite the negative press covfefe', dislikes: 0, id: '', author_details: { email: 'capra@gmail.com' }, created_at: new Date(), comments: [], angry_faces: 0 },
  { text: 'MAKE AMERICA GREAT AGAIN!', dislikes: 0, id: '', author_details: { email: 'capra@gmail.com' }, created_at: new Date(), comments: [], angry_faces: 0 },
  { text: 'The democrats!', dislikes: 0, id: '', author_details: { email: 'capra@gmail.com' }, created_at: new Date(), comments: [], angry_faces: 0 },
  { text: 'BUILD THAT WALL', dislikes: 0, id: '', author_details: { email: 'capra@gmail.com' }, created_at: new Date(), comments: [], angry_faces: 0 },
]

const [posts, setPosts] = createSignal(initialPosts)

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
      <Button>{post.dislikes} 👎</Button>
      <Button>{post.angry_faces} 😠</Button>
    </ButtonGroup>

    <Card.Footer>
      {post.created_at?.toDateString()} {post.created_at?.getHours()}:{post.created_at?.getMinutes()}
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
        <Button onClick={createPost}>Post!</Button>

      </Card.Body>
    </Card>

  </>
}

function createPost() {

  setPosts([ {text:textNewRant()},  ...posts()])
}



export default function App() {

  // const [count, setCount] = createSignal(0);

  // return showPosts()

  return <>
    <Container>

      <Row>
        
        <CardHeader>

          <h1>
            <span style={{
              color:'orange', 
              "text-shadow": "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000"
            }}>Crabby</span>
            <span
              style={{
                color:'black',
                "text-shadow": "2px 0 #ffa500, -2px 0 #ffa500, 0 2px #ffa500, 0 -2px #ffa500, 1px 1px #ffa500, -1px -1px #ffa500, 1px -1px #ffa500, -1px 1px #ffa500"
              }}
            >Book</span>
          </h1>

        </CardHeader>

        {/* <Col></Col> */}
        {/* <Col><h1>Crabby Book</h1></Col> */}
        {/* <Col></Col> */}
        {/* <h1>Crabby Book</h1> */}
        {/* <Card>Crabby Book</Card> */}

        
      </Row>
      <Row>

        <Col>{showPosts()}</Col>
        <Col>{showEditor()}</Col>

      </Row>
    </Container>
  </>


}


