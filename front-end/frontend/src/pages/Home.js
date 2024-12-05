import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null); // for editing existing tasks
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Fetch tasks if token exists
  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:5000/api/tasks', {
          headers: { Authorization: token },
        })
        .then((res) => setTasks(res.data))
        .catch((err) => console.error('Error fetching tasks', err));
    }
  }, [token]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');  // Redirect to login page
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?t=st=1732861292~exp=1732864892~hmac=93495421dcc9f374f295cda779478e9ebe52bbb1e9d606e0f1fbb1c84e8a2401&w=1380")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '30px',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="bg-light p-4 rounded shadow">
              {/* Header with Logout Button */}
              <header className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Task Manager</h2>
                <Button variant="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </header>

              {/* Task Form */}
              <TaskForm setTasks={setTasks} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
            </div>
          </Col>
        </Row>

        <Row className="mt-5 justify-content-center">
          <Col md={8}>
            <div className="bg-light p-4 rounded shadow">
              <h3 className="text-center mb-4">Your Tasks</h3>
              <TaskList tasks={tasks} setTasks={setTasks} setTaskToEdit={setTaskToEdit} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
