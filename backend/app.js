import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./controller/Auth.js";
import cookieParser from "cookie-parser";
import routes from "./controller/Middleware.js";



dotenv.config()

const app = express()
const PORT = process.env.PORT ||5000


app.use(cors({credentials: true, origin: "http://localhost:5173"}))
app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoutes)
app.use(routes)

app.listen(PORT, ()=> console.log(`server succesfully run at port ${PORT}`))



