import { Router } from "express";

export const exerciseRouter = Router({ mergeParams: true });

exerciseRouter.post("/workout", async (req, res) => {});
