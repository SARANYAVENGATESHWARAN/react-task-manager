import React from 'react';

// Component for individual task row: Displays task data and handles actions
function TaskItem({ task, deleteTask, toggleComplete }) {
  // Get priority class for badge
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-med';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  // Get avatar initials
  const getAvatarInitials = (assignedTo) => assignedTo.charAt(0).toUpperCase();

  return (
    <tr>
      <td className={task.completed ? 'completed' : ''}>{task.name}</td>
      <td>
        <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
      </td>
      <td>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="checkbox"
        />
      </td>
      <td>
        <div className="avatar">{getAvatarInitials(task.assignedTo)}</div>
      </td>
      <td>
        <button className="btn btn-delete" onClick={() => deleteTask(task.id)}>
          🗑️
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;