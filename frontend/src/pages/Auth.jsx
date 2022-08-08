import React from "react";
import { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [authError, setAuthError] = useState(false);
  const [authErrorMsg, setAuthErrorMsg] = useState("");

  const switchMode = () => {
    setIsRegister(!isRegister);
    setUserData({
      username: "",
      password: "",
    });
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      axios
        .post("/register", userData)
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("/login", userData)
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          {authError && (
            <div
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>{authErrorMsg}</strong>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          <Card className="border-1 border-secondary rounded shadow p-5 bg-dark text-white">
            <Card.Header>
              <h3 className="text-center">
                {isRegister ? "Create New Anonymous Account" : "Login"}
              </h3>
            </Card.Header>
            <Form onSubmit={onSubmit} autoComplete="off" method="POST">
              {/* Username  */}
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  id="username"
                  autoFocus
                  value={userData.username}
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  Don't worry, your username will not be shown
                </Form.Text>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
                <button
                  className="btn btn-sm btn-dark mt-2"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"} Password
                </button>
              </Form.Group>

              {/* Buttons */}
              <div className="mb-3 d-flex flex-column align-items-center">
                <button className="btn btn-primary mb-5" type="submit">
                  {isRegister ? "Create" : "Login"}
                </button>
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={switchMode}
                >
                  {isRegister
                    ? "Already have an account? Login here!"
                    : "Don't have an account? Create a new one here!"}
                </button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
