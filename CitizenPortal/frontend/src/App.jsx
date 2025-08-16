import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/login";
import SignUp from "./Components/signup";
import Home from "./Components/home";
import Profile from "./Components/profile";
import AppointmentsPage from "./Components/AppointmentsPage.jsx"; // add this import

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile onLogout={() => window.location.href="/login"} />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
    </Routes>
  );
}

export default App;
