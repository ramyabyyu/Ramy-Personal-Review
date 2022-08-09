import React, { useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import Male from "../image/male.png";
import Female from "../image/female.png";
import Secret from "../image/secret.jpg";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [postReviews, setPostReviews] = useState([]);

  const userAvatar = (gender) => {
    let ava;

    if (gender === "Male") ava = Male;
    else if (gender === "Female") ava = Female;
    else ava = Secret;

    return ava;
  };

  useEffect(() => {
    axios
      .get("/review")
      .then((response) => setPostReviews(response.data))
      .catch((err) => console.log(err));
  }, []);

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
                src={userAvatar(user?.user.gender)}
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
        {postReviews?.map((post, index) => (
          <Col md={12} className="mb-5" key={index}>
            <Card className="border-1 border-secondary rounded shadow p-5 bg-dark text-white">
              <Card.Header>
                <div className="d-flex align-items-center">
                  <div className="me-4">
                    <img
                      src={userAvatar(post.userGender)}
                      alt="gender"
                      style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  </div>
                  <div>
                    <h3>Someone</h3>
                    <p>{moment(post.createdAt).fromNow()}</p>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-column">
                  <div className="mb-5">
                    <Card.Text>
                      For me, <strong>Good</strong> things about Ramy is :{" "}
                    </Card.Text>
                    <ListGroup>
                      {post.good.map((g, i) => (
                        <ListGroup.Item key={i}>{g}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                  <div>
                    <Card.Text>
                      And <strong>Bad</strong> things about Ramy is :{" "}
                    </Card.Text>
                    <ListGroup>
                      {post.bad.map((b, i) => (
                        <ListGroup.Item key={i}>{b}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
