import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import the Link component
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Icons for password visibility toggle

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div
      style={{

       backgroundImage: 'url("https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg")', // Replace with your image URL
        // backgroundSize: 'cover',
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
              <h3 className="text-center mb-4">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'} // Toggle password visibility
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
                  </div>
                </Form.Group>

                <Button variant="btn btn-outline-success" type="submit" className="w-100">
                  Login
                </Button>
              </Form>

              {/* Add the link below the form */}
              <div className="text-center mt-3">
                <p>Don't have an account?</p>
                {/* Link to the Register page */}
                <Link to="/register" className="btn btn-link">Register </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
