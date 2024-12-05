import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Icons for show/hide password

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true); // State to toggle password visibility
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', { username, email, password });
      nav('/login');
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://www.shutterstock.com/shutterstock/photos/2292832921/display_1500/stock-vector-vector-d-icon-of-registration-or-app-login-user-account-security-illustration-on-dark-background-2292832921.jpg")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <div
              className="p-4 border rounded bg-light shadow"
              style={{ backdropFilter: 'blur(10px)' }}
            >
              <h3 className="text-center mb-4">Register</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"} // Toggle password visibility
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                    />
                    <Button
                      variant="outline-info"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ zIndex: 0 }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Button variant="btn btn-outline-success" type="submit" className="w-100">
                  Register
                </Button>
              </Form>
              <div className="text-center mt-3">
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-link">Login</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
