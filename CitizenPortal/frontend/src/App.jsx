import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/login";
import SignUp from "./Components/signup";
import Home from "./Components/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
