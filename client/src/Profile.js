import React, { useEffect, useState } from "react";
import { Card, Row, Col, Image, Toast } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

function Profile() {
  const [pirate, setPirate] = useState([]);
  const { id } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [globalError, setGlobalError] = useState("");

  useEffect(() => {
    axios
      .get(`/pirates/${id}`)
      .then((res) => {
        setPirate(res.data.data);
      })
      .catch((err) => {
        setGlobalError(err.response.data.error);
        setShowToast(true);
      });
  }, [id]);

  return (
    <div className="Home">
      <Toast
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 99,
          backgroundColor: "#fc4503",
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
          <h1 className="header">{pirate.name}</h1>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xs="3">
              <Image width="250" src={pirate.imageUrl} />
            </Col>
            <Col xs="9">
              <Card>
                <Card.Header>
                  <h1 className="header">About</h1>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col xs="4">
                      <span>Position: </span>
                    </Col>
                    <Col xs="8">
                      <span>{pirate.position}</span>
                    </Col>
                    <Col xs="4">
                      <span>Treasures: </span>
                    </Col>
                    <Col xs="8">
                      <span>{pirate.nbTreasureChest}</span>
                    </Col>
                    <Col xs="4">
                      <span>Peg Leg: </span>
                    </Col>
                    <Col xs="8">
                      <span>{(pirate.pegLeg && "Yes") || "No"}</span>
                    </Col>
                    <Col xs="4">
                      <span>Eye Patch: </span>
                    </Col>
                    <Col xs="8">
                      <span>{(pirate.eyePatch && "Yes") || "No"}</span>
                    </Col>
                    <Col xs="4">
                      <span>Hook Hand: </span>
                    </Col>
                    <Col xs="8">
                      <span>{(pirate.hookHand && "Yes") || "No"}</span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="3">
              <h1>"{pirate.catchPhrase}"</h1>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
