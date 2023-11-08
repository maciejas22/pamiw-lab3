import { Request, Response } from "express";
import { z } from "zod";
import * as bookService from "../services/book.service";

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, authorId } = z
      .object({ title: z.string(), authorId: z.number().int() })
      .parse(req.body);
    const book = await bookService.createBook(title, authorId);
    res.json(book);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Invalid input data", details: error.issues });
    } else {
      console.error("Error creating book:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = parseInt(idParam, 10);
    const parsedId = z.object({ id: z.number().int() }).parse({ id }).id;
    const book = await bookService.getBook(parsedId);
    res.json(book);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Invalid input data", details: error.issues });
    } else {
      console.error("Error getting book:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getBooks();
    res.json(books);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id, title, authorId } = z
      .object({
        id: z.number().int(),
        title: z.string(),
        authorId: z.number().int(),
      })
      .parse(req.body);
    const book = await bookService.updateBook(id, title, authorId);
    res.json(book);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Invalid input data", details: error.issues });
    } else {
      console.error("Error updating book:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = parseInt(idParam, 10);
    const parsedId = z.object({ id: z.number().int() }).parse({ id }).id;
    const book = await bookService.deleteBook(parsedId);
    res.json(book);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Invalid input data", details: error.issues });
    } else {
      console.error("Error deleting book:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
