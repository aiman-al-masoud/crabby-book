import { Button, Card, Form } from "solid-bootstrap";
import { createPost } from '../api'

export function PostEditor(props: {
    text: string,
    setText: (string: string) => void,
}) {

    return <>

        <Card>

            <Card.Header>
                New Rant
            </Card.Header>

            <Card.Body>

                <Form.Control
                    as='textarea'
                    value={props.text}
                    oninput={e => props.setText(e.target.value)}
                    rows={3}
                    id="ciao"
                    placeholder="Your rant goes here..." />

                <Button
                    onClick={() => {
                        createPost({ text: props.text })
                        props.setText('')
                    }}
                >Post!</Button>

            </Card.Body>
        </Card>

    </>
}