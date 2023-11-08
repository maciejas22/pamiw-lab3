import { Router } from "express";
import * as bookController from "../controllers/book.controller";
import { routes } from "../configs/routes";

const router = Router();

router.post(routes.books.create, bookController.createBook);
router.get(routes.books.get, bookController.getBook);
router.get(routes.books.getAll, bookController.getBooks);
router.put(routes.books.update, bookController.updateBook);
router.delete(routes.books.delete, bookController.deleteBook);

export default router;
