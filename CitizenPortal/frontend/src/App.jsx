import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/login";
import SignUp from "./Components/signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
