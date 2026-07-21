require("dotenv").config();

const express= require("express")
const cors = require("cors");

const connectDb= require("./config/db")
const todoRoutes= require("./routes/todoRoutes")
const userRoutes= require("./routes/userRoutes")

const app= express()

connectDb()

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes)
app.use("/todos", todoRoutes)

app.get("/", (req, res)=>{
    res.send("Backend is running")
})

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})