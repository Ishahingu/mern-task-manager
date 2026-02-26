import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleTask }) {
  if (tasks.length === 0) {
    return <p style={{ textAlign: "center" }}>No tasks yet</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;