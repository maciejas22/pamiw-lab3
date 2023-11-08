import { z } from "zod";
import { Author } from "./author";

export const Book = z.object({
  id: z.number().int(),
  title: z.string(),
  author: Author,
  authorId: z.number().int(),
});
