import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthContext"
import Dashboard from "../Component/Dashboard";


const Protected = () => {
    const user = localStorage.getItem("user");


    return user ? <div><Dashboard /><Outlet /></div> : <Navigate to="/login" />;
}

export default Protected;