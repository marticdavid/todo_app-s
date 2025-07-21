import { useState, useContext } from "react";
import { storeContext } from "../context/storeContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const {
    password,
    setPassword,
    email,
    setEmail,
    apiUrl,
    isLoading,
    setIsLoading,
    showPassword,
    setShowPassword,
    userName,
    setUserName,
    contact,
    setContact,
    birthDate,
    setBirthDate,
    gender,
    setGender,
  } = useContext(storeContext);

  const navigate = useNavigate();

  function clearForm() {
    setEmail("");
    setPassword("");
  }

  async function submitHandler(e) {
    e.preventDefault();
    setIsLoading(true);

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (email.length < 6) {
      toast.error("Email must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          userName: userName,
          name: userName,
          contact: contact,
          gender: gender,
          birthDate: birthDate,
        }),
      });
      console.log("object")
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(
          data.message[0]?.message || data.message || "Registration failed"
        );
        setIsLoading(false);
      }
      
      if (response.ok) {
        toast.success(data.message);
        clearForm();
        setIsLoading(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  function toggle() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
            Register on ToDo App
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Create an account to start organizing your tasks and boost
            productivity.
          </p>

          <form
            onSubmit={submitHandler}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Create an account with us today
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-blue-200 p-4 pe-12 text-xs text-gray-700 shadow-sm"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
            </div>


            <div>
              <label htmlFor="gender" className="sr-only">
                Gender
              </label>

              <div className="relative">
                <input
                  type= "text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-xs text-gray-700 shadow-sm"
                  placeholder="gender"
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact" className="sr-only">
                Contact
              </label>

              <div className="relative">
                <input
                  type= "text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-xs text-gray-700 shadow-sm"
                  placeholder="Enter contact"
                  onChange={(e) => setContact(e.target.value)}
                  value={contact}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>

              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-xs text-gray-700 shadow-sm"
                  placeholder="Enter username"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="birthDate" className="sr-only">
                Date of birth
              </label>

              <div className="relative">
                <input
                  type="date"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-xs text-gray-700 shadow-sm"
                  placeholder="Enter birthDate"
                  onChange={(e) => setBirthDate(e.target.value)}
                  value={birthDate}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-xs text-gray-700 shadow-sm"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <span
                  className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                  onClick={toggle}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-500">
              Have an account?{" "}
              <Link className="underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
