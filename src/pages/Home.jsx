import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-[73vh] w-full flex flex-col items-start justify-center bg-gradient-to-r from-[#274B74] to-[#8233CF] via-[#E963FD] px-8">
      <h1 className="text-3xl font-bold text-white">ToDo Task Manager</h1>
      <p className="text-lg text-white mt-2">
        Stay organized and boost your productivity. Manage your tasks easily.
      </p>
      <div className="flex justify-center space-x-4 mt-6">
        <Link to="/register">
          <button className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
