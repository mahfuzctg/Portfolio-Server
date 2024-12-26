import express from "express";
import { login, register } from "./auth.controllers";
import { validateAuth } from "./auth.validations";

const router = express.Router();

router.post("/register", validateAuth, register);
router.post("/login", validateAuth, login);

export const AuthRoutes = router;
