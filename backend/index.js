import express from "express";
import mongoose from "mongoose";
import { ExceutionModel, NodesModel, UserModel, WorkflowModel } from "./db";
import { SignupSchema, SigninSchema, CreateWorkflowSchema, UpdateworklfowSchema } from "./types";
import jwt from "jsonwebtoken"
import { authMiddleware } from "./middleware";

mongoose.connect(process.env.MONGO_URL);
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();

app.use(express.json());

app.post("/signup", async (req, res)=>{
    const {success, data} = SignupSchema.safeParse(req.body);
    if(!success){
        res.status(403).json({
            message: "Incorrect Inputs"
        })
        return
    }
    try{
        const user = await UserModel.create({
        username: data.username,
        password: data.password
        })
        res.json({
            id: user._id,
        })

    }
    catch(e){
        res.status(411).json({
            message: "User already exists"
        })
    }
    
})

app.post("/signin", async (req, res)=>{
    const {success, data} = SigninSchema.safeParse(req.body);
    if(!success){
        res.status(403).json({
            message: "Incorrect Inputs"
        })
        return
    }
    try{
        const user = await UserModel.findOne({
        username: data.username,
        password: data.password
        })
        if(user){
            // return the jwt token of the user
            const token = jwt.sign({
            id:user._id
            }, JWT_SECRET)
            res.json({
            id: user._id,
            token
        })
        }
        else{
            res.status(403).json({
                message:"Incorrect Credentials"
            })
        }
       

    }
    catch(e){
        res.status(411).json({
            message: "User already exists"
        })
    }
})

app.post("/workflow",authMiddleware,  async (req, res)=>{
    const userId = req.userId;
    const {success, data} = CreateWorkflowSchema.safeParse(req.body);
    if(!success){
        res.status(403).json({
            message: "Incorrect Inputs"
        })
        return;
    }
    try {
        const workflow = await WorkflowModel.create({
            userId,
            nodes: data.nodes,
            edges: data.edges
        })
        res.json({
            id: workflow._id
        })

    } catch (e) {
        res.status(411).json({
            message: "Failed to correct workflow"
        })
    }
})

app.put("/workflow/:workflowId", async (req, res)=>{
    const {success, data} = UpdateworklfowSchema.safeParse(req.body);
    if(!success){
        res.status(403).json({
            message: "Incorrect Inputs"
        })
        return
    }
    try {
        const workflow = await WorkflowModel.findByIdAndUpdate(req.params.workflowId, data, {new:true});
        if(!workflow){
            res.status(404).json({
                message: "Workflow not found"
            })
            return
        }
        res.json({
            id: workflow._id
        })
    } catch (e) {
        res.status(411).json({
            message: "Failed to update workflow"
        })
    }
})

app.get("/workflow/:workflowId", async (req, res)=>{

    const workflow = await WorkflowModel.findById(
        req.params.workflowId
    )
    if(!workflow || workflow.userId.toString() != req.userId){
        res.status(404).json({
            message: "Workflow not found"
        })
        return
    }
    res.json(workflow)
})

app.get("/workflows", authMiddleware, async (req, res)=>{
    const workflows = await WorkflowModel.find({userId: req.userId});
    res.json(workflows)
})

app.get("/workflow/executions/:workflowId", async(req, res)=>{
    // TODO: make sure user gets to see only his not anyone else
    const executions = await ExceutionModel.find({workflowId: req.params.workflowId})
    res.json(executions);
})

// app.post("/credentials", (req, res)=>{

// })

// app.get("/credentials", (req, res)=>{

// })

app.get("/nodes", async (req, res)=>{
    const nodes = await NodesModel.find();
    res.json(nodes)
})


app.listen(process.env.PORT || 3000);


