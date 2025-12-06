import express from "express";
import cors from "cors";
import authRouter from "./router/auth.router";
import dotenv from 'dotenv';
import { connectDB } from "./lib/db";

dotenv.config(); // Load env variables first

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON body

// Routes
app.get("/", (req, res) => {
    res.send("Backend running...");
});
app.use("/api/auth", authRouter);

// Connect to DB first, then start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
});
