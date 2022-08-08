import React, { useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import male from "../image/male.png";
import female from "../image/female.png";
import secret from "../image/secret.jpg";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  let userAvatar;

  if (user?.user.gender === "Male") userAvatar = male;
  else if (user?.user.gender === "Female") userAvatar = female;
  else userAvatar = secret;

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Logout
  const logout = async () => {
    localStorage.removeItem("user");
  };

  return (
    <Container>
      {user ? (
        <div className="d-flex mb-5 flex-column">
          <div className="d-flex mb-4 align-items-center">
            <div className="me-3">
              <img
                src={userAvatar}
                alt="avatar"
                width="80"
                height="80"
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            </div>
            <div>
              <h3>Hello {user.user.username}</h3>
              <p>
                Here you can write what Good or Bad things about Ramy, please
                write it honestly
              </p>
            </div>
          </div>
          <div>
            <Link className="btn btn-success me-3" to="/create">
              Add New Review
            </Link>
            <Button variant="dark" type="button" onClick={handleShow}>
              Logout
            </Button>
            <ConfirmModal
              modalTitle="Logout"
              modalBody="Are you sure want to logout?"
              handleConfirm={logout}
              handleClose={handleClose}
              show={show}
            />
          </div>
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
