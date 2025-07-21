import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Navigation from "./layout/Navigation";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/wallet";
import Signout from "./pages/signout";
import Profile from "./pages/profile";
function App() {
  return (
    <>
      <Router>
        <Navigation />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
