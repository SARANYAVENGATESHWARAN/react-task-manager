import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

// Main App component: Manages global state for tasks, theme, user name, sidebar, and persistence
function App() {
  // State for tasks: Array of task objects
  const [tasks, setTasks] = useState([]);
  // State for theme: 'light' or 'dark'
  const [theme, setTheme] = useState('light');
  // State for user name
  const [userName, setUserName] = useState('');
  // State for active sidebar view
  const [activeView, setActiveView] = useState('Dashboard');
  // State for showing name prompt
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  // Load tasks, theme, and user name from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      document.body.className = 'light';
    }
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    } else {
      setShowNamePrompt(true); // Prompt for name on first visit
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  // Handle name submission
  const handleNameSubmit = (name) => {
    setUserName(name);
    localStorage.setItem('userName', name);
    setShowNamePrompt(false);
  };

  // Add a new task
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false, createdAt: new Date().toISOString() }]);
  };

  // Delete a task by ID
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // Clear all completed tasks with confirmation
  const clearCompleted = () => {
    if (window.confirm('Are you sure you want to clear all completed tasks?')) {
      setTasks(tasks.filter(task => !task.completed));
    }
  };

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter(task => task.priority === 'High').length;

  // Filter tasks based on active view
  const getFilteredTasks = () => {
    switch (activeView) {
      case 'All Tasks': return tasks;
      case 'Completed Tasks': return tasks.filter(task => task.completed);
      case 'Pending Tasks': return tasks.filter(task => !task.completed);
      default: return tasks;
    }
  };

  // Name prompt modal
  if (showNamePrompt) {
    return (
      <div className="name-prompt-overlay">
        <div className="name-prompt">
          <h2>Welcome to Task Manager!</h2>
          <p>Please enter your name:</p>
          <input
            type="text"
            placeholder="Your Name"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                handleNameSubmit(e.target.value.trim());
              }
            }}
          />
          <button onClick={() => {
            const name = document.querySelector('.name-prompt input').value.trim();
            if (name) handleNameSubmit(name);
          }}>Submit</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app fade-in">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Task Manager</h2>
        <nav>
          {['Dashboard', 'All Tasks', 'Completed Tasks', 'Pending Tasks', 'Settings'].map(view => (
            <button
              key={view}
              className={activeView === view ? 'active' : ''}
              onClick={() => setActiveView(view)}
            >
              {view}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="app-header">
          <div className="welcome">
            <h1>Welcome back, {userName} 👋</h1>
            <p>You have {pendingTasks} pending tasks today</p>
          </div>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </header>

        {/* Dashboard or Task Views */}
        {activeView === 'Dashboard' ? (
          <section className="dashboard">
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <h3>Total Tasks</h3>
                <p>{totalTasks}</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <h3>Completed</h3>
                <p>{completedTasks}</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <h3>Pending</h3>
                <p>{pendingTasks}</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🔥</div>
                <h3>High Priority</h3>
                <p>{highPriorityTasks}</p>
              </div>
            </div>
          </section>
        ) : activeView === 'Settings' ? (
          <section className="settings">
            <h2>Settings</h2>
            <p>Theme and other preferences are managed via the header toggle.</p>
          </section>
        ) : (
          <section className="tasks-section">
            <TaskInput addTask={addTask} />
            <TaskList
              tasks={getFilteredTasks()}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
              clearCompleted={clearCompleted}
            />
          </section>
        )}
      </div>
    </div>
  );
}

export default App;