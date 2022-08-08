import React, { useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const AppNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = async () => {
    localStorage.removeItem("user");
  };

  return (
    <Navbar bg="secondary" expand="lg" variant="dark" className="mb-5">
      <Container>
        <Navbar.Brand href="/">Personal Review</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Button variant="dark" type="button" onClick={handleShow}>
                  Logout
                </Button>
                <ConfirmModal
                  modalTitle="Logout"
                  modalBody="Are you sure want to logout?"
                  handleConfirm={logout}
                  handleClose={handleClose}
                  show={show}
                  confirmBtnType="submit"
                />
              </>
            ) : (
              <button className="btn btn-dark">
                <Link to="/auth" className="text-white text-decoration-none">
                  Login
                </Link>
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
