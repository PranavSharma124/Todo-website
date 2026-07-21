import { useState, useEffect } from "react";
import api from "../services/api";
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";


function Register() {

    const navigate= useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const[name, setName]= useState("")
    const[email, setEmail]= useState("")
    const[password, setPassword]= useState("")
    
    const handleSubmit= async(e) =>{
        e.preventDefault()
        try{
            await api.post("/users/register",{name, email, password})

            navigate("/login")

        }catch(error){
            console.log(error.response.data)
        }
    }


    return(
    <>

    <div className="container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

        <label>Name</label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>

        <label>Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

        <button type="submit">Register</button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
            Already have an account?{" "}<Link to="/login">Login</Link>
        </p>

        </form>
    </div>

    
    </>
)}

export default Register;