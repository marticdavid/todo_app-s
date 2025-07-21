import { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa"; // Changed icon
import { storeContext } from "../context/storeContext";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = useContext(storeContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar border-b border-slate-700 bg-gradient-to-r from-[#2294ff] to-[#000080] text-black shadow p-4 width-full z-20 top-0 left-0">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center pl-2">
          <FaClipboardList className="text-yellow-400 text-2xl mr-2" />
          <h1 className="text-white text-xl font-bold">Taskify</h1>
        </Link>

        {/* Toggle Button (for mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 5h14a1 1 0 010 2H3a1 1 0 010-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`w-full md:flex md:items-center md:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 text-center text-black md:mt-0 mt-4 md:text-sm font-medium">
            {auth ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="block py-2 px-3 text-black hover:text-yellow-400"
                    activeclassname="active"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className="block py-2 px-3 text-black hover:text-yellow-400"
                    activeclassname="active"
                  >
                    Account
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/wallet"
                    className="block py-2 px-3 text-black hover:text-yellow-400"
                    activeclassname="active"
                  >
                    Wallet
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signout"
                    className="block py-2 px-3 text-black hover:text-yellow-400"
                    activeclassname="active"
                  >
                    Sign Out
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/"
                    className="block py-2 px-3 text-black hover:text-yellow-400"
                    activeclassname="active"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="block py-2 px-3 text-black hover:text-yellow-400"
                    activeclassname="active"
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="block py-2 px-3 text-black hover:text-yellow-400"
                    activeclassname="active"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
