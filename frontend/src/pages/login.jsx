import api from "../services/api"
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Login(){

    const navigate= useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const[email, setEmail]= useState("")
    const[password, setPassword]= useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/users/login", {email,password,});

            localStorage.setItem("token", response.data.token);

            navigate("/dashboard");
        }catch(error) {
            console.log(error.response.data);
        }
    };

    return(
        <>
        <div className="container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <label>Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

                <label>Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                <button type="submit">Login</button>

                <p style={{ marginTop: "15px", textAlign: "center" }}>
                    Don't have an account?{" "}<Link to="/register">Register</Link>
                </p>

            </form>
        </div>
        </>
    )
}

export default Login
