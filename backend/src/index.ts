import express from "express";
import cors from "cors";
import authRouter from "./router/auth.router";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running...");
});

// FIX: use the router here
app.use("/api/auth", authRouter);

app.listen(5000, () => console.log("Server started on port 5000"));
