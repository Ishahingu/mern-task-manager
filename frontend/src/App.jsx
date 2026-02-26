import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
    
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
  fetchTasks();
}, []);

const fetchTasks = async () => {
  const res = await axios.get("http://localhost:5000/tasks");
  setTasks(res.data);
};

  const addTask = async (text) => {
  if (!text.trim()) return;

  await axios.post("http://localhost:5000/tasks", { text });

  fetchTasks();
};

  const deleteTask = async (id) => {
  await axios.delete(`http://localhost:5000/tasks/${id}`);
  fetchTasks();
};

  const toggleTask = async (id) => {
  await axios.put(`http://localhost:5000/tasks/${id}`);
  fetchTasks();
};

  const filteredTasks =
    filter === "completed"
      ? tasks.filter((t) => t.completed)
      : filter === "pending"
      ? tasks.filter((t) => !t.completed)
      : tasks;

  return (
    <div className="app">
      <Header />
      <TaskForm addTask={addTask} />
      <FilterBar filter={filter} setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
      />
    </div>
  );
}

export default App;