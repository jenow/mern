import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { Card, Button, Row, Col, Image, Toast } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Home() {
  const [pirates, setPirates] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [globalError, setGlobalError] = useState("");

  function getPirates() {
    axios
      .get("/pirates")
      .then((res) => {
        setPirates(res.data.data);
      })
      .catch((err) => {
        setGlobalError(err.response.data.error);
        setShowToast(true);
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
        setGlobalError(err.response.data.error);
        setShowToast(true);
      });
  }

  return (
    <div className="Home">
      <Toast
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 99,
          backgroundColor: '#fc4503'
        }}
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={2000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{globalError}</Toast.Body>
      </Toast>
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
            <Card body key={pirate._id}>
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
