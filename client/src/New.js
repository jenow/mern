import React, { useState } from "react";
import { Card, Button, Row, Col, Image, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import "./New.css";

function New() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("Captain");
  const [imageUrl, setImageUrl] = useState("");
  const [nbTreasureChest, setNbTreasureChest] = useState(3);
  const [pegLeg, setPegLeg] = useState(true);
  const [eyePatch, setEyePatch] = useState(true);
  const [hookHand, setHookHand] = useState(true);
  const [catchPhrase, setCatchPrase] = useState("");
  const [captainExists, setCaptainExists] = useState(false);
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    console.log(name);
    console.log(position);
    console.log(imageUrl);
    console.log(nbTreasureChest);
    console.log(pegLeg);
    console.log(eyePatch);
    console.log(hookHand);
    console.log(catchPhrase);
    axios
      .post("/pirates", {
        name,
        position,
        imageUrl,
        nbTreasureChest,
        pegLeg,
        eyePatch,
        hookHand,
        catchPhrase,
      })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        if (err.response.data.error) {
          setCaptainExists(true);
        }
      });
  }

  return (
    <div>
      <div className="New">
        <Card>
          <Card.Header>
            <h1 className="header">
              Add Pirate
              <LinkContainer to="/" className="right">
                <Button>Crew Board</Button>
              </LinkContainer>
            </h1>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <Col xs={6}>
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Pirate Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Pirate Name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group as={Col} controlId="position">
                    <Form.Label>Crew Position</Form.Label>
                    <Form.Control
                      as="select"
                      custom
                      onChange={(e) => setPosition(e.target.value)}
                      required
                      isInvalid={captainExists}
                    >
                      <option>Captain</option>
                      <option>First Mate</option>
                      <option>Quarter Master</option>
                      <option>Boatswain</option>
                      <option>Powder Monkey</option>
                    </Form.Control>
                    { captainExists && <div className="fieldError">Arrrr, a Captain is already there!</div>}
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col xs={6}>
                  <Form.Group as={Col} controlId="imageUrl">
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Image Url"
                      onChange={(e) => setImageUrl(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
              <Col xs={6}>
                  <Form.Group as={Col} controlId="nbTreasureChest">
                    <Form.Label># Treasure Chest</Form.Label>
                    <Form.Control
                      type="number"
                      value={nbTreasureChest}
                      min="0"
                      onChange={(e) => setNbTreasureChest(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group as={Col} controlId="caracteristic">
                    <Form.Label></Form.Label>
                    <Form.Check
                      custom
                      type="checkbox"
                      id="Peg Leg"
                      label="Peg Leg"
                      onChange={(e) => setPegLeg(e.target.checked)}
                      checked={pegLeg}
                    />
                    <Form.Check
                      custom
                      type="checkbox"
                      id="Eye Patch"
                      label="Eye Patch"
                      onChange={(e) => setEyePatch(e.target.checked)}
                      checked={eyePatch}
                    />
                    <Form.Check
                      custom
                      type="checkbox"
                      id="Hook Hand"
                      label="Hook Hand"
                      onChange={(e) => setHookHand(e.target.checked)}
                      checked={hookHand}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
              <Col xs={6}>
                  <Form.Group as={Col} controlId="catchPhrase">
                    <Form.Label>Catch Phrase</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Catch Phrase"
                      onChange={(e) => setCatchPrase(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Button variant="primary" type="submit" className="mt-5">
                    Add Pirate
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default New;
