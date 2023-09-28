import express from "express";
import dotenv from "dotenv"
import { usersRouter } from "./Routers/users.js";
import cors from "cors";
import { menuRouter } from "./Routers/menu.js";
import { ordersRouter } from "./Routers/orders.js";
import { sendMailRouter } from "./Routers/sendMail.js";

// configure the envirenment.
dotenv.config()

//initialize express server framework
const PORT=process.env.PORT;
const app=express();

//middleware
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welocome to project1")
})
app.use("/menu",menuRouter);
app.use("/users",usersRouter)   
app.use("/orders",ordersRouter)
app.get("/mail",sendMailRouter)



//listen to a server
app.listen(PORT,()=>console.log( `server started in localhost:9090`));