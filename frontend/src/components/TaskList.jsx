import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function TaskList({ tasks, fetchTasks }) {
  const toggleStatus = async (id, status) => {
    await axios.put(`${API}/api/tasks/${id}`, {
      status: status === "Pending" ? "Completed" : "Pending",
    });
    fetchTasks();
  };

  const remove = async (id) => {
    await axios.delete(`${API}/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      {tasks.map((t) => (
        <div className="task-card" key={t._id}>
          <h3>{t.title}</h3>
          <p>{t.description}</p>
          <p>Priority: {t.priority}</p>

          <span
            className={`badge ${
              t.status === "Pending" ? "pending" : "completed"
            }`}
          >
            {t.status}
          </span>

          <div style={{ marginTop: 10 }}>
            <button onClick={() => toggleStatus(t._id, t.status)}>
              Toggle
            </button>
            <button onClick={() => remove(t._id)} style={{ marginLeft: 8 }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
