import express from "express";
import connectToDatabase from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

connectToDatabase();


const app = express()
const PORT = process.env.PORT || 8080

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use("/api/auth", authRoutes)

app.get("/api/health", (req, res) => {
    res.json({ status: "OK" })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
