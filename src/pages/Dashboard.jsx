import { useState, useEffect, useContext} from "react";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";
import Spinner from "../layout/spinner";

function Dashboard() {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([]);

  const { token, apiUrl, isLoading, setIsLoading } = useContext(storeContext);

  useEffect(() => {
    fetchTodos();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  function handleToggleComplete(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }
  

  function clearForm() {
    setDescription("");
    setTitle("");
    setEditMode(false);
    setTodoId(null);
  }

  async function fetchTodos() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/todo/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("todoApp_token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error("Unable to fetch Todos, try again later");
        setIsLoading(false);
        return;
      }

      setTodos(data.todos);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  function updateHandler(todo) {
    setEditMode(true);
    setTitle(todo.title);
    setDescription(todo.description);
    setTodoId(todo.id);
  }

  async function deleteTodo(id) {
    if (!id) {
      toast.error("Todo ID is missing");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirmDelete) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/todo/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("todoApp_token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        fetchTodos();
      } else {
        toast.error(data.message || "Failed to delete todo");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting");
    } finally {
      setIsLoading(false);
    }
  }

  
  async function updateTodoHandler() {
    if (!todoId) {
      toast.error("No todo selected to update");
      return;
    }

    if (!title || !description) {
      toast.error("Both title and description are required");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/todo/update/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("todoApp_token")}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        clearForm(); // clear input and reset state
        fetchTodos(); // refresh the list
      } else {
        toast.error(data.message || "Failed to update todo");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Something went wrong while updating");
    } finally {
      setIsLoading(false);
    }
  }
  

  async function submitTodoHandler() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/todo/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: title, description: description }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error("Unable to add a Todo, try again later");
        setIsLoading(false);
        return;
      }

      toast.success(data.message);
      fetchTodos();
      clearForm();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto mt-20 shadow-lg">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <form
        className="bg-white shadow-md mt-14 rounded px-8 pt-6 pb-8 mb-4 mx-auto w-1/2"
        onSubmit={(e) => {
          e.preventDefault();
          editMode ? updateTodoHandler() : submitTodoHandler();
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Add Todo</h2>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className={
              editMode
                ? "text-white bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded"
                : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            }
            type="submit"
          >
            {editMode ? "Update Todo" : "Add Todo"}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Select
              </th>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => handleToggleComplete(todo.id)}
                  />
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 ">
                  {todo.title}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900">
                  {todo.description}
                </td>
                <td className="text-green-600 font-semibold">
                  {todo.isCompleted ? "Completed" : "Pending"}
                </td>
                <td>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-1">
                    View more
                  </button>
                  <button
                    className="bg-yellow-400 text-white px-2 py-1 rounded mr-1"
                    onClick={() => {
                      updateTodoHandler(todo.id);
                      setEditMode(true);
                      setTitle(todo.title);
                      setDescription(todo.description);
                      setTodoId(todo.id); 
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;



