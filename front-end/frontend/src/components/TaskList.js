import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, setTasks, setTaskToEdit }) => {
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: token },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Error deleting task', err);
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://www.computerworld.com/wp-content/uploads/2024/03/android-dark-mode-100785923-orig.jpg?quality=50&strip=all")', // Set background image here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '50px',
        paddingBottom: '50px',
      }}
    >
      <div className="container">
        <h3 className="text-center text-white mb-4">Your Tasks</h3>

        {tasks.length === 0 ? (
          <p className="text-center text-white">No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-card p-4 mb-3 bg-light rounded shadow-sm">
              <h4 className="text-dark">{task.title}</h4>
              <p className="text-muted">{task.description}</p>
              <p className="text-muted">Status: {task.completed ? 'Completed' : 'Pending'}</p>

              <div className="task-actions">
                <button
                  onClick={() => handleEdit(task)}
                  className="btn btn-warning mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
