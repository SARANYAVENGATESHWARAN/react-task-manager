import React, { useState } from 'react';

// Component for adding new tasks: Handles form input and validation
function TaskInput({ addTask }) {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('Work');
  const [assignedTo, setAssignedTo] = useState('User1');

  // Handle form submission: Validate and add task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Task name cannot be empty');
      return;
    }
    addTask({ name, priority, category, assignedTo });
    // Reset form
    setName('');
    setPriority('Low');
    setCategory('Work');
    setAssignedTo('User1');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
      </select>
      <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
        <option value="User1">User1</option>
        <option value="User2">User2</option>
        <option value="User3">User3</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskInput;