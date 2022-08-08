import React from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";

const CreateReview = () => {
  return (
    <Container>
      <Row>
        <Col md={8}>
          <Card className="border-0 rounded shadow">
            <Card.Header>Create Your Review</Card.Header>
            <Card.Subtitle>
              Please be honest, and don't worry, you will be 100% anonymous
            </Card.Subtitle>
            <Card.Body>
              <Form></Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateReview;
