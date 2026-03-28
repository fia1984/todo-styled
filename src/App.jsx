import { useState } from "react";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Buy milk" },
    { id: 2, text: "Study React" },
  ]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = () => {
    if (task.trim() === "") return;

    if (editId !== null) {
      const updatedTasks = tasks.map((item) =>
        item.id === editId ? { ...item, text: task } : item
      );
      setTasks(updatedTasks);
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: task,
      };
      setTasks([...tasks, newTask]);
    }

    setTask("");
  };

  const handleEdit = (id) => {
    const selectedTask = tasks.find((item) => item.id === id);
    setTask(selectedTask.text);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));

    if (editId === id) {
      setEditId(null);
      setTask("");
    }
  };

  return (
    <div className="app">
      <h1>Todo List</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleSubmit}>
          {editId !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      <ul>
        {tasks.map((item) => (
          <li key={item.id}>
            <span>{item.text}</span>
            <div>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}