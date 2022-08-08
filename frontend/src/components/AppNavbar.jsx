import React from "react";
import { Container, Navbar } from "react-bootstrap";

const AppNavbar = () => {
  return (
    <Navbar bg="secondary" expand="lg" variant="dark" className="mb-5">
      <Container>
        <Navbar.Brand href="/">Ramy Personal Review</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
