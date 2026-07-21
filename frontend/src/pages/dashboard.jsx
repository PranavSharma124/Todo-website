import api from "../services/api"
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"

function Dashboard() {
    const navigate = useNavigate();

    const [todos, setTodos]= useState([])
    const [title, setTitle]= useState("")

    const handleSubmit= async(e)=>{
        try{
            e.preventDefault()

            await api.post("/todos", {title})

            await fetchTodo()

            setTitle("")
        }catch(error){
            console.log(error)
        }
    }

    const deleteTodo = async (id) => {
    try {
        await api.delete(`/todos/${id}`);
        await fetchTodo();
    } catch (error) {
        console.error(error);
    }
    };

    const toggleTodo= async(todo)=>{
        try{
            await api.put(`/todos/${todo._id}`, {completed: !todo.completed});
            await fetchTodo()
        }catch(error){
            console.error(error)
        }
    }

    
    const fetchTodo = async () => {
        try {
            const response = await api.get("/todos");
            console.log(response.data);
            setTodos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(()=>{
        fetchTodo()
    },[])

    return <>
        <div className="container">
            <h1>Dashboard</h1>

        <button className="logout" onClick={logout}>Logout</button>

        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="enter a todo" />
            <button type="submit">add</button>
        </form>

        {todos.map((todo) => (<div className="todo" key={todo._id}>
            <p style={{textDecoration: todo.completed ? "line-through" : "none", color: todo.completed ? "gray" : "black"}}>{todo.title}</p>
            <div className="todo-buttons">
            <button onClick={()=>toggleTodo(todo)}>{todo.completed ? "Undo" : "Complete"}</button>
            <button onClick={()=>deleteTodo(todo._id)}>delete</button>
            </div>
        </div>))}

        </div>
    </>;
}

export default Dashboard;