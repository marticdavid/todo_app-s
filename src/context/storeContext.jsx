import { createContext, useState, useEffect } from "react";

export const storeContext = createContext();

export const StoreProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [birthDate, setBirthDate] = useState()
  const [contact, setContact]= useState()
  const [gender, setGender] = useState()
  const [ amount, setAmount ] = useState(0) // [amount, setAmount]
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [token, setToken] = useState(() =>
    localStorage.getItem("todoApp_token")
  );
  const [singleTodo, setSingleTodo] = useState(null);
  const [profile, setProfile] = useState(null);
  const [todos, setTodos] = useState([]); // You were using setTodos without declaring it

  const apiUrl = import.meta.env.VITE_BACKEND_URL_TODO;

  function isTokenExpired(token) {
    if (!token) return true;
    try {
      const [, payload] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.exp * 1000 < Date.now();
    } catch (error) {
      console.error("Token parse error:", error);
      return true;
    }
  }

  useEffect(() => {
    const localStorageToken = localStorage.getItem("todoApp_token");
    const tokenExpired = isTokenExpired(localStorageToken);

    if (!tokenExpired) {
      setToken(localStorageToken);
      setAuth(true);
    } else {
      setAuth(false);
      localStorage.removeItem("todoApp_token");
    }
  }, []);

  async function fetchTodos() {
    try {
      const res = await fetch(`${apiUrl}/todo/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("todoApp_token")}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to fetch todos:", errorData.message);
        return;
      }

      const data = await res.json();
      setTodos(data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchTodo(todoId) {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/todo/${todoId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("todoApp_token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to fetch todo:", data.message);
        return;
      }

      setSingleTodo(data.todo);
    } catch (error) {
      console.error("Fetch single todo error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchProfile() {
    try {
      const response = await fetch(`${apiUrl}/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("todoApp_token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to fetch profile:", data.message);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error("Fetch profile error:", error);
    }
  }

  async function fetchTransactions() {
    try {
      const res = await fetch(`${apiUrl}/transaction/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTransactions(
        (data || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } catch (err) {
      toast.error("Failed to fetch transactions");
    }
  }

  

  const contextObj = {
    auth,
    setAuth,
    isLoading,
    setIsLoading,
    apiUrl,
    password,
    setPassword,
    email,
    setEmail,
    showPassword,
    setShowPassword,
    userName,
    setUserName,
    token,
    setToken,
    fetchTodos,
    todos,
    setTodos,
    fetchTodo,
    singleTodo,
    setSingleTodo,
    fetchProfile,
    profile,
    setProfile,
    setBirthDate,
    birthDate,
    contact,
    setContact,
    gender,
    setGender,
    amount,
    setAmount,
    wallet,
    setWallet,
    fetchTransactions,
    transactions,
    setTransactions
  };

  return (
    <storeContext.Provider value={contextObj}>{children}</storeContext.Provider>
  );
};
