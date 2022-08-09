import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateReview = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [goodFields, setGoodFields] = useState([{ good: "" }]);
  const [badFields, setBadFields] = useState([{ bad: "" }]);
  const [reviewData, setReviewData] = useState({ good: [], bad: [] });

  // Modal
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (index, event, inputField, isGood) => {
    const values = [...inputField];
    values[index][event.target.name] = event.target.value;
    if (isGood) {
      setGoodFields(values);
    } else {
      setBadFields(values);
    }
  };

  const handleAdd = (isGood) => {
    if (isGood) {
      setGoodFields([...goodFields, { good: "" }]);
    } else {
      setBadFields([...badFields, { bad: "" }]);
    }
  };

  const handleRemove = (index, inputField, isGood) => {
    const values = [...inputField];
    values.splice(index, 1);
    if (isGood) {
      setGoodFields(values);
    } else {
      setBadFields(values);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let i = 0; i < goodFields.length; i++) {
      setReviewData({
        ...reviewData,
        good: reviewData.good.push(goodFields[i].good),
      });
    }

    for (let i = 0; i < badFields.length; i++) {
      setReviewData({
        ...reviewData,
        bad: reviewData.bad.push(badFields[i].bad),
      });
    }

    // console.log(reviewData);

    const token = user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("/review", reviewData, config)
      .then((response) => {
        setShow(true);
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <Container>
      {/* Modal */}
      <Modal show={show} onHide={handleClose} className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>New Review Created Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thanks for your participation. I'm sure Ramy will sleep easy tonight
          XD
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <Link to="/" className="text-decoration-none text-white">
              Go Home
            </Link>
          </Button>
          <Button variant="primary" onClick={handleClose}>
            <Link to="/" className="text-decoration-none text-white">
              Same Button to Go Home
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col md={8}>
          <Card className="border-0 rounded shadow bg-dark text-white">
            <Card.Header>
              <h5>Ok, here's the deal</h5>
              <p>
                I want you to write a <strong>Good</strong> and{" "}
                <strong>Bad</strong> things about Ramy based on what your
                thinking about him
              </p>
              <p>
                Please, write it honestly, because all your input will be used
                for <strong>Research</strong> purposes
              </p>
              <p>
                You can press <strong>Add</strong> button to add a new field and{" "}
                <strong>Remove</strong> button to delete the field that you
                don't need
              </p>
              <p>
                Make sure you <strong>fill</strong> all the field before
                submitting and don't left them <strong>empty</strong>. Otherwise
                the system will crash and Ramy doesn't <strong>Smart</strong>{" "}
                enough to handle it
              </p>
              <p>
                <strong className="text-warning">
                  Again, don't worry about privacy. All your information will be
                  encrypted in the database
                </strong>
              </p>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} method="POST" autoComplete="off">
                <h3>Good</h3>
                <p>
                  Please write good things about Ramy based on what you think of
                  him
                </p>

                {goodFields.map((gf, index) => (
                  <div key={index} className="mb-5">
                    <Form.Group className="mb-3">
                      <Form.Control
                        name="good"
                        value={gf.good}
                        onChange={(event) =>
                          handleChange(index, event, goodFields, true)
                        }
                      />
                    </Form.Group>

                    <div className="d-flex">
                      <button
                        className="btn btn-success me-3"
                        type="button"
                        onClick={() => handleAdd(true)}
                      >
                        Add
                      </button>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => handleRemove(index, goodFields, true)}
                        disabled={goodFields.length - 1 == 0 ? true : false}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <h3>Bad</h3>
                <p>Write everything that you don't like about Ramy.</p>
                <p>
                  <strong>Insult</strong> him, <strong>Curse</strong> him or
                  whatever. No hard feeling. Don't mind him, His heart is
                  already broken from the start, tho.
                </p>
                <p>
                  Ahh poor Ramy, he messed up with a pillow full of tears last
                  night, lol.
                </p>
                <p>A'ight quit playing, and do your job</p>

                {badFields.map((bf, index) => (
                  <div key={index} className="mb-5">
                    <Form.Group className="mb-3">
                      <Form.Control
                        name="bad"
                        value={bf.bad}
                        onChange={(event) =>
                          handleChange(index, event, badFields, false)
                        }
                      />
                    </Form.Group>

                    <div className="d-flex">
                      <button
                        className="btn btn-success me-3"
                        type="button"
                        onClick={() => handleAdd(false)}
                      >
                        Add
                      </button>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => handleRemove(index, badFields, false)}
                        disabled={badFields.length - 1 == 0 ? true : false}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mb-3">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateReview;
