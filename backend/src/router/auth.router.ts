import express from "express";
import { signup } from "../controller/auth.controller";

const router = express.Router();


router.post("/signup", signup);

router.post("/login", async (req, res) => {
    return res.send("login api is working...");
});

router.post("/logout", async (req, res) => {
    return res.send("logout api is working...");
});

export default router;
