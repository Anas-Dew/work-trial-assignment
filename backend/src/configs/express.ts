import { Router } from "express";
import { example_router } from "routes";
import { recognitions } from "routes";
export const router = Router();

router.use("/example", example_router);
router.use("/recognitions", recognitions)
