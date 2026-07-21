const Todo= require("../models/todo")

const createTodo= async(req, res)=>{
    try{
        const{title}=req.body

        const todo= new Todo({
            title,
            user: req.user.id
        })

        await todo.save()

        res.status(201).json(todo);

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getTodo = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });

        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTodo= async(req, res)=>{
    try{
        const{id}= req.params
        
        const updatedTodo= await Todo.findOneAndUpdate({_id: id, user: req.user.id}, req.body, {new: true})

        if(!updatedTodo){
            return res.status(404).json({message:"Todo not found"})
        }

        res.status(200).json(updatedTodo)

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTodo = await Todo.findOneAndDelete({
            _id: id,
            user: req.user.id,
        });

        if (!deletedTodo) {
            return res.status(404).json({
                message: "Todo Not found",
            });
        }

        return res.status(200).json({
            message: "Todo deleted",
            deletedTodo,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports={createTodo, getTodo, updateTodo, deleteTodo}