import { Router, Request, Response } from "express";
import {
  getExs,
  getEx,
  updateEx,
  createEx,
  deleteEx,
} from "../controllers/exerciseControl";

const router = Router();

router.get("/", (req: Request, res: Response) => getExs(req, res));
router.get("/:id", (req: Request, res: Response) => getEx(req, res));
router.put("/:id", (req: Request, res: Response) => updateEx(req, res));
router.post("/", (req: Request, res: Response) => createEx(req, res));
router.delete("/:id", (req: Request, res: Response) => deleteEx(req, res));

export default router;
