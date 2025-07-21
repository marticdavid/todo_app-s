import { useState, useContext, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { storeContext } from "../context/storeContext";
import Spinner from "../layout/spinner";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const {
    password,
    setPassword,
    email,
    setEmail,
    apiUrl,
    isLoading,
    setIsLoading,
    setAuth,
    auth,
  } = useContext(storeContext);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (auth) {
  //     navigate("/dashboard");
  //   }
  // }, [auth, navigate]);

  async function submitHandler(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          data?.message?.[0]?.message || data?.message || "Login failed";
        toast.error(message);
        return;
      }

      localStorage.setItem("todoApp_token", data.access_token);
      toast.success("Login successful");
      setAuth(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  function toggle() {
    setShowPassword((prev) => !prev);
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="mx-auto max-w-screen-xl bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center shadow-2xl">
        <h1 className="text-center text-2xl font-bold text-black sm:text-3xl">
          Login to Your ToDo App
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Stay organized. Log in to manage your tasks and stay productive!
        </p>

        <form
          className="mx-auto mt-8 mb-0 max-w-md space-y-4"
          onSubmit={submitHandler}
        >
          <input
            type="email"
            className="block w-full rounded-lg border-gray-200 p-4 text-xs text-gray-700 shadow-sm"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-xs text-gray-700 shadow-sm"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            <span
              className="absolute inset-y-0 end-0 grid place-content-center px-4 text-black cursor-pointer"
              onClick={toggle}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link className="underline" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
