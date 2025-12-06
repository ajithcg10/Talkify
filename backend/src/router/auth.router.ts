import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  return res.send("signup api is working...");
});

router.get("/login", (req, res) => {
    return res.send("login api is working...");
  });

router.get("/logout", (req, res) => {
    return res.send("logout api is working...");
  });

export default router;
