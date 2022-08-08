import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CreateReview = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [inputFields, setInputFields] = useState([
    {
      good: "",
      bad: "",
    },
  ]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Card className="border-0 rounded shadow bg-dark text-white">
            <Card.Header>
              <h5>Create Your Review</h5>
              <p>
                Please be honest! Because all your input will be used for
                research purposes
              </p>
            </Card.Header>
            <Card.Body>
              <Form>
                {inputFields.map((inputField, index) => (
                  <Form.Group key={index} className="mb-3"></Form.Group>
                ))}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateReview;
