import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark as faX } from "@fortawesome/free-solid-svg-icons";
import "../../styles/index.css";

function ToDoList() {
  const [items, setItems] = useState([]);
  const baseUrl = 'https://playground.4geeks.com/todo';
  const user = "J0nathanCR";

  const getTodos = async () => {
    const response = await fetch(`${baseUrl}/users/${user}`);
    if (!response.ok) return;
    const todos = await response.json();
    setItems(todos.todos);
  };

  const posTodo = async (value) => {
    const todo = {
      label: value,
      is_done: false
    };
    const response = await fetch(`${baseUrl}/todos/${user}`, {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw console.error(response);
    const newTodo = await response.json();
    setItems([...items, newTodo]);
    return newTodo;
  };

  const deletePost = async (postId) => {
    await fetch(`${baseUrl}/todos/${postId}`, { method: 'DELETE' });
    getTodos();
  };

  const clearAll = async () => {
    for (const post of items) {
      await fetch(`${baseUrl}/todos/${post.id}`, { method: 'DELETE' });
    }
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="d-block">
      <h1 className="mx-auto title">Todos</h1>
      <ul className="list-group list-group-flush border mx-auto todo-list" style={{ width: '40%' }}>
        <li className="list-group-item d-flex gap-2">
          <input
            className="border-0 w-100"
            type="text"
            placeholder="Escribe una tarea..."
            id="todo-input"
            onKeyDown={(e) =>
              e.key === "Enter" && posTodo(e.target.value)
            }
          />
          <button
            className="btn-add"
            onClick={() => {
              const input = document.getElementById("todo-input");
              if (input.value.trim()) {
                posTodo(input.value);
                input.value = "";
              }
            }}
          >
            Agregar
          </button>
          <button className="btn-clear" onClick={clearAll}>
            Borrar todo
          </button>
        </li>

        {items.map((post) => (
          <li
            key={post.id}
            className="list-group-item d-flex justify-content-between"
          >
            {post.label}
            <FontAwesomeIcon
              onClick={() => deletePost(post.id)}
              style={{ color: "red", cursor: "pointer" }}
              icon={faX}
            />
          </li>
        ))}

        <a href="#" className="list-group-item list-group-item-light">
          {items.length} item left
        </a>
      </ul>
    </div>
  );
}

export default ToDoList;
