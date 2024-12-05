import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const TaskForm = ({ setTasks, taskToEdit, setTaskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [date, setDate] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setCompleted(taskToEdit.completed);
      setDate(taskToEdit.date || ''); // Use task's date if available
    } else {
      resetForm();
    }
  }, [taskToEdit]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCompleted(false);
    setDate('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const taskData = { title, description, completed, date };

    try {
      let response;
      if (taskToEdit) {
        // Update task
        response = await axios.put(
          `http://localhost:5000/api/tasks/${taskToEdit._id}`,
          taskData,
          { headers: { Authorization: token } }
        );
      } else {
        // Create new task
        response = await axios.post(
          'http://localhost:5000/api/tasks',
          taskData,
          { headers: { Authorization: token } }
        );
      }

      setTasks((prevTasks) =>
        taskToEdit
          ? prevTasks.map((task) =>
              task._id === taskToEdit._id ? response.data : task
            )
          : [...prevTasks, response.data]
      );

      resetForm();
      setTaskToEdit(null);
    } catch (err) {
      console.error('Error creating/updating task', err);
    }
  };

  return (
    <Container
      style={{
        backgroundImage: 'url("https://as2.ftcdn.net/v2/jpg/08/55/27/37/1000_F_855273733_mqUxfUP3dxAJwDmIDFR2duGVWiKWHqYm.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '30px',
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <Form
        onSubmit={handleSubmit}
        className="bg-light p-4 rounded shadow"
        style={{
          maxWidth: '500px',
          width: '100%',
          opacity: 0.9,
        }}
      >
        <h3 className="text-center mb-4">{taskToEdit ? 'Update Task' : 'Create Task'}</h3>

        {/* Task Title */}
        <Form.Group className="mb-3">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        {/* Task Description */}
        <Form.Group className="mb-3">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        {/* Task Date */}
        <Form.Group className="mb-3">
          <Form.Label>Task Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>

        {/* Task Completion Status */}
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </Form.Group>

        {/* Submit Button */}
        <Button
          variant="btn btn-outline-primary"
          type="submit"
          className="w-100"
        >
          {taskToEdit ? 'Update Task' : 'Create Task'}
        </Button>
      </Form>
    </Container>
  );
};

export default TaskForm;
