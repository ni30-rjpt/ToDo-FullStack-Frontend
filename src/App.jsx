/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import "./App.css";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import Todo from "./components/Todo";

function App() {
  const [userInput, setUserInput] = useState("");
  let [todos, setTodos] = useState([]);
  const [id, setId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const url = "https://todo-backend-1hj0.onrender.com";

  useEffect(() => {
    fetchTodos(`${url}/todo`);
  }, []);

  const fetchTodos = (url) => {
    axios
      .get(url)
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const todo = {
      value: userInput,
    };

    if (!isUpdate) {
      axios
        .post(`${url}/todo/add`, todo)
        .then((res) => {
          const { _id, value } = res.data;
          setUserInput("");
          setTodos((prev) => {
            return [...prev, { _id, value }];
          });
        })
        .catch((error) => console.log(error.message));
    } else {
      axios
        .patch(`${url}/todo/${id}`, todo)
        .then((res) => {
          const { _id, value } = res.data;
          setTodos((prev) => {
            return prev.map((todo) =>
              todo._id === _id ? { _id, value } : todo
            );
          });
          setUserInput("");
          setIsUpdate(false);
        })
        .catch((error) => console.log(error.message));
    }
  };

  const getTodoById = (id) => {
    axios
      .get(`${url}/todo/${id}`)
      .then((response) => {
        setUserInput(response.data.value);
      })
      .catch((error) => console.log(error));
  };

  const editTodo = (id) => {
    setIsUpdate(true);
    getTodoById(id);
    setId(id);
  };

  const deleteTodo = (id) => {
    axios
      .delete(`${url}/todo/${id}`)
      .then((response) => {
        todos = todos.filter((todo) => todo._id !== id);
        setTodos(todos);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="moderustic-12345 w-full h-screen flex flex-col">
        <h1 className="text-3xl font-bold text-center mt-12 ">ToDo List</h1>
        <div className="flex justify-center my-8">
          <form onSubmit={handleSubmit} className="flex justify-evenly gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter ToDos..."
              className="shadow border rounded w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit">
              <IoIosAddCircle className="text-5xl " />
            </button>
          </form>
        </div>
        <ul className="todos flex justify-center flex-col items-center">
          {todos?.map((todo) => {
            return (
              <Todo
                key={todo._id}
                _id={todo._id}
                value={todo.value}
                editTodo={() => editTodo(todo._id)}
                deleteTodo={() => deleteTodo(todo._id)}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
