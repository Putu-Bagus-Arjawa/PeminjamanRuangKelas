import cors from "cors";
import express from "express";
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
app.use()
app.use(cors({credentials: true, origin: "http://localhost:5173"}))


app.listen(PORT, ()=> console.log(`server jalan di  port ${PORT}`)
)
