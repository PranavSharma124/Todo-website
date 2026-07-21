const express= require("express")
const router= express.Router()

const{createTodo, getTodo, updateTodo, deleteTodo}= require("../controllers/todoControllers")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/",authMiddleware, createTodo)

router.get("/",authMiddleware, getTodo)

router.put("/:id",authMiddleware, updateTodo)

router.delete("/:id", authMiddleware, deleteTodo)

module.exports= router