import { useEffect, useState } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("pending");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTodos = () => {
      axios
        .get("http://localhost:3000/api/todos", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => console.error("Error fetching todos:", error));
    };

    fetchTodos();
  }, [token]);

  const addTodo = () => {
    if (!title.trim()) {
      alert("Todo title cannot be empty!");
      return;
    }

    axios
      .post(
        "http://localhost:3000/api/todos",
        { title, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setTodos([...todos, response.data]);
        setTitle("");
        setStatus("pending");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  const updateTodo = () => {
    axios
      .put(
        `http://localhost:3000/api/todos/${editTodoId}`,
        { title: editTitle, status: editStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const updatedTodos = todos.map((todo) =>
          todo.id === editTodoId ? response.data : todo
        );
        setTodos(updatedTodos);
        setEditTodoId(null);
        setEditTitle('');
        setEditStatus('pending');
      })
      .catch((error) => console.error("Error updating todo:", error));
  };
  

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Todo List</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
        </select>
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white p-2"
          disabled={title.trim() === ""}
        >
          Add Todo
        </button>
      </div>

      {editTodoId && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Edit Task title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border p-2 mr-2"
          />
          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            className="border p-2 mr-2"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="done">Done</option>
          </select>
          <button onClick={updateTodo} className="bg-green-500 text-white p-2">
            Update Todo
          </button>
        </div>
      )}

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <span>
              {todo.title || "-"} - {todo.status}
            </span>
            <div>
              <button
                onClick={() => {
                  setEditTodoId(todo.id);
                  setEditTitle(todo.title);
                  setEditStatus(todo.status);
                }}
                className="bg-yellow-500 text-white p-1 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white p-1"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
