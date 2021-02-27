import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Home() {
  const [pirates, setPirates] = useState([]);

  function getPirates() {
    axios
      .get("/pirates")
      .then((res) => {
        console.log(res.data.data);
        setPirates(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getPirates();
  }, []);

  function throwPirateAboard(id) {
    axios
      .delete(`/pirates/${id}`)
      .then((res) => {
        getPirates();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="Home">
      <Card>
        <Card.Header>
          <h1 className="header">
            Pirate Crew
            <LinkContainer to="/pirate/new" className="right">
              <Button>Add pirate</Button>
            </LinkContainer>
          </h1>
        </Card.Header>
        <Card.Body>
          {pirates.map((pirate) => (
            <Card body>
              <Row>
                <Col xs={12} className="align-center">
                  <h4>{pirate.name}</h4>
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <Image width="100" src={pirate.imageUrl} rounded />
                </Col>
                <Col xs={4}>
                  <LinkContainer to={`/pirate/${pirate._id}`}>
                    <Button>View Pirate</Button>
                  </LinkContainer>
                </Col>
                <Col xs={4}>
                  <Button
                    onClick={() => throwPirateAboard(pirate._id)}
                    variant="danger"
                  >
                    Walk The Plank
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;
