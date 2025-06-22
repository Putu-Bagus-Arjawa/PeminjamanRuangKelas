import express from "express";
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT ||5000
app.use(cors({credentials: true, origin: "http://localhost:5173"}))

app.listen(PORT, ()=> console.log(`server succesfully run at port ${PORT}`))



