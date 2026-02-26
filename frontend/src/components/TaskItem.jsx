function TaskItem({ task, deleteTask, toggleTask }) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task._id)}
      />

      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          marginLeft: "10px",
          flex: 1,
        }}
      >
        {task.text}
      </span>

      <button
        className="delete"
        onClick={() => deleteTask(task._id)}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;