import { createSignal } from "solid-js";
import type { GetPostsReturns } from "../../dbschema/queries";
import { Container, Row, Col, CardHeader } from "solid-bootstrap";
import { getPosts } from './api'
import { CrabbyBookLogo } from "./components/crabby-book-logo";
import { PostEditor } from "./components/post-editor";
import { Posts } from "./components/posts";
import "./scss/app.css";


export default function App() {

  const [posts, setPosts] = createSignal([] as GetPostsReturns)
  const [textNewRant, setTextNewRant] = createSignal('')

  setInterval(async () => {
    setPosts(await getPosts())
  }, 1000)

  return <>
    <Container>
      <Row>
        <CardHeader>
          <CrabbyBookLogo />
        </CardHeader>
      </Row>

      <Row>
        <Col><Posts posts={posts()} /></Col>
        <Col><PostEditor text={textNewRant()} setText={setTextNewRant} /></Col>
      </Row>
    </Container>
  </>

}