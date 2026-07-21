import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Register from "./pages/register";
import ProtectedRoute from "./components/protectedRoute";
import PublicRoute from "./components/publicRoute";

function App() {
  return(
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
    <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
  </Routes>
)}

export default App;