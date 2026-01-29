import React, { useState, useMemo } from 'react';
import TaskItem from './TaskItem';

// Component for displaying task list: Handles filters, search, sorting, and empty state
function TaskList({ tasks, deleteTask, toggleComplete }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Date');

  // Filtered and sorted tasks: Memoized for performance
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      const matchesSearch = task.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'All' ||
        (filter === 'Completed' && task.completed) ||
        (filter === 'Pending' && !task.completed);
      return matchesSearch && matchesFilter;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      if (sortBy === 'Date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'Task name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return filtered;
  }, [tasks, search, filter, sortBy]);

  return (
    <div>
      {/* Filters and search */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="Date">Sort by Date</option>
          <option value="Task name">Sort by Task Name</option>
        </select>
      </div>

      {/* Task table or empty state */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state">No tasks available</div>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Priority</th>
              <th>Done</th>
              <th>Assigned To</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;