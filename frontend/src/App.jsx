import react from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/Not-Found"
import ProtectedRoute from "./components/ProtectedRoutes"

function Logout() {
  localStorage.clear();
  return <Navigate to="/login"/>
}

//clears out localstorage data when user is creating another account
function RegisterAndLogout() {
  localStorage.clear();
  return <Register/>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/register" element={<RegisterAndLogout/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
