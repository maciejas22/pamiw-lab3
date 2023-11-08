import { Router } from "express";
import authorRoute from "./author.route";
import bookRoute from "./book.route";

const router = Router();

router.use(authorRoute);
router.use(bookRoute);

export default router;
