import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [theme, setTheme] = useState("dark");

  const fetchTasks = useCallback(async () => {
    const res = await axios.get(`${API}/api/tasks`);
    setTasks(res.data);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const filteredTasks = tasks.filter((t) =>
    filter === "All" ? true : t.status === filter
  );

  return (
    <div className="container">
      <h1>Task Tracker</h1>

      <div className="theme-toggle">
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>

      <TaskForm fetchTasks={fetchTasks} />
      <FilterBar setFilter={setFilter} />
      <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
    </div>
  );
}
