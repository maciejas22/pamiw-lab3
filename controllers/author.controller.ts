import { Request, Response } from "express";
import { z } from "zod";
import * as authorService from "../services/author.service";

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const name = z.object({ name: z.string() }).parse(req.body).name;
    const author = await authorService.createAuthor(name);
    res.json(author);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Invalid input data", details: error.issues });
    } else {
      console.error("Error creating author:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getAuthor = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = parseInt(idParam, 10);
    const parsedId = z.object({ id: z.number().int() }).parse({ id }).id;
    const author = await authorService.getAuthor(parsedId);
    res.json(author);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Invalid input data", details: error.issues });
    } else {
      console.error("Error getting author:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await authorService.getAuthors();
    res.json(authors);
  } catch (error) {
    console.error("Error getting authors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { id, name } = z
      .object({ id: z.number().int(), name: z.string() })
      .parse(req.body);
    const author = await authorService.updateAuthor(id, name);
    res.json(author);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Invalid input data", details: error.issues });
    } else {
      console.error("Error updating author:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = parseInt(idParam, 10);
    const parsedId = z.object({ id: z.number().int() }).parse({ id }).id;
    const author = await authorService.deleteAuthor(parsedId);
    res.json(author);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Invalid input data", details: error.issues });
    } else {
      console.error("Error deleting author:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
