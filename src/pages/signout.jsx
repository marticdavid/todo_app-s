//sign out page

import { useContext } from "react";
import { storeContext } from "../context/storeContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signout() {
  const { auth, setAuth } = useContext(storeContext);

  const navigate = useNavigate();

  function signOutHandler() {
    localStorage.removeItem("bookApp_token");
    setAuth(false);
    navigate("/login");
  }

  function cancelHandler() {
    navigate("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-sky-400 to-indigo-500">
      <div className="p-6 rounded-lg shadow-lg bg-indigo-300 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Sign out</h2>
        <p className="text-xl text-center">
          Are you sure you want to sign out?
        </p>
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={signOutHandler}
          >
            Sign out
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default Signout;
