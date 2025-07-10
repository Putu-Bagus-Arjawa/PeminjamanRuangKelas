import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from "./Middleware/Auth.js";
import userRoutes from "./controller/User.js";
import roomRoutes from "./controller/roomController.js";
import bookingRoutes from "./controller/booking.js";
import riwayatRoutes from "./controller/riwayat.js";
import approveRoutes from "./controller/approval.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



dotenv.config()

const app = express()
const PORT = process.env.PORT ||5000


app.use(cors({credentials: true, origin: ["http://localhost:5173", 
    "http://localhost:5174", "http://localhost:5175"]}))

app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoutes)
app.use("/room", roomRoutes)
app.use("/booking", bookingRoutes)
app.use("/riwayat", riwayatRoutes)
app.use("/approve", approveRoutes)

app.use(userRoutes)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(PORT, ()=> console.log(`server succesfully run at port ${PORT}`))



