import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function TaskForm({ fetchTasks }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    status: "Pending",
  });

  const isValid = task.title.trim() && task.dueDate;

  const submit = async () => {
    if (!isValid) return;

    await axios.post(`${API}/api/tasks`, task);
    setTask({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      status: "Pending",
    });
    fetchTasks();
  };

  return (
    <div className="task-form">
      <input
        placeholder="Title *"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        className="full"
      />

      <input
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="full"
      />

      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="date"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
      />

      <button className="full" disabled={!isValid} onClick={submit}>
        Add Task
      </button>
    </div>
  );
}
