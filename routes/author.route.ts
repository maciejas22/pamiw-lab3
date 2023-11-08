import { Router } from "express";
import * as authorController from "../controllers/author.controller";
import { routes } from "../configs/routes";

const router = Router();

router.post(routes.authors.create, authorController.createAuthor);
router.get(routes.authors.get, authorController.getAuthor);
router.get(routes.authors.getAll, authorController.getAuthors);
router.put(routes.authors.update, authorController.updateAuthor);
router.delete(routes.authors.delete, authorController.deleteAuthor);

export default router;
