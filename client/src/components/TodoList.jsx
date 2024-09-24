import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./NavBar";

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
        .get("https://task-management-app-7goy.onrender.com/api/todos", {
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
        "https://task-management-app-7goy.onrender.com/api/todos",
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
        `https://task-management-app-7goy.onrender.com/api/todos/${editTodoId}`,
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
        setEditTitle("");
        setEditStatus("pending");
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`https://task-management-app-7goy.onrender.com/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="container mx-auto p-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-gray-100 mb-6">
          Manage Your Daily Tasks
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-700 bg-gray-800 p-3 rounded w-full sm:w-2/3 text-white"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-700 bg-gray-800 p-3 rounded w-full sm:w-1/3 text-white"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
          </select>
          <button
            onClick={addTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded lg:w-1/4 sm:w-auto transition"
            disabled={title.trim() === ""}
          >
            Add Todo
          </button>
        </div>

        {editTodoId && (
          <div className="mb-8 bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Edit Todo</h3>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Edit Task title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border border-gray-700 bg-gray-800 p-3 rounded w-full sm:w-2/3 text-white"
              />
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="border border-gray-700 bg-gray-800 p-3 rounded w-full sm:w-1/3 text-white"
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="done">Done</option>
              </select>
              <button
                onClick={updateTodo}
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded lg:w-1/4 sm:w-auto transition"
              >
                Update Todo
              </button>
            </div>
          </div>
        )}

        <ul className="divide-y divide-gray-700">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition my-2"
            >
              <span className="font-medium text-lg text-gray-300">
                {todo.title || "-"} -{" "}
                <span className="italic text-gray-500">{todo.status}</span>
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditTodoId(todo.id);
                    setEditTitle(todo.title);
                    setEditStatus(todo.status);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
