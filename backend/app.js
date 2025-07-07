import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import routes from "./controller/Middleware.js";
import authRoutes from "./Middleware/Auth.js";



dotenv.config()

const app = express()
const PORT = process.env.PORT ||5000


app.use(cors({credentials: true, origin: ["http://localhost:5173", "http://localhost:5174","http://localhost:5175"]}))
app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoutes)
app.use(routes)

app.listen(PORT, ()=> console.log(`server succesfully run at port ${PORT}`))



