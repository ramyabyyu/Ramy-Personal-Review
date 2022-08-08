import React from "react";
import { useEffect } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Container>
      {user ? (
        <div className="d-flex mb-5">
          <h3 className="me-5">Hello {user.user.username}</h3>
          <Link className="btn btn-success mb-5" to="/create">
            Add New Review
          </Link>
        </div>
      ) : (
        <h5 className="mb-3">
          Please{" "}
          <Link to="/auth" className="text-decoration-none">
            Login
          </Link>{" "}
          to participate in this review
        </h5>
      )}
      <Row>
        <Col md={12} className="mb-5">
          <Card className="border-1 border-secondary rounded shadow p-5 bg-dark text-white">
            <Card.Header>
              <h3>Someone</h3>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-column">
                <div className="mb-5">
                  <Card.Text>
                    For me, <strong>Good</strong> things about Ramy is :{" "}
                  </Card.Text>
                  <ListGroup>
                    <ListGroup.Item>Apa</ListGroup.Item>
                    <ListGroup.Item>Apa</ListGroup.Item>
                    <ListGroup.Item>Apa</ListGroup.Item>
                    <ListGroup.Item>Apa</ListGroup.Item>
                  </ListGroup>
                </div>
                <div>
                  <Card.Text>
                    And <strong>Bad</strong> things about Ramy is :{" "}
                  </Card.Text>
                  <ListGroup>
                    <ListGroup.Item>Apa</ListGroup.Item>
                    <ListGroup.Item>Apa</ListGroup.Item>
                    <ListGroup.Item>Apa</ListGroup.Item>
                    <ListGroup.Item>Apa</ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
