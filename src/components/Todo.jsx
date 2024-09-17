/* eslint-disable react/prop-types */
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const Todo = ({ value, editTodo, deleteTodo }) => {
  return (
    <li className="rounded-md flex justify-between w-72 p-3 shadow-item my-2">
      <p className="">{value}</p>
      <div className="update-delete flex items-center gap-3">
        <FaEdit
          className=" text-sky-700 hover:cursor-pointer"
          onClick={editTodo}
        />
        <FaTrashAlt
          className="text-red-600  hover:cursor-pointer"
          onClick={deleteTodo}
        />
      </div>
    </li>
  );
};

export default Todo;
