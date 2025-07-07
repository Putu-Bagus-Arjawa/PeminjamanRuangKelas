import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from "./Middleware/Auth.js";
import userRoutes from "./controller/User.js";



dotenv.config()

const app = express()
const PORT = process.env.PORT ||5000


app.use(cors({credentials: true, origin: ["http://localhost:5173", 
    "http://localhost:5174"]}))
app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoutes)
app.use(userRoutes)

app.listen(PORT, ()=> console.log(`server succesfully run at port ${PORT}`))



