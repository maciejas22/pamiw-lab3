import { z } from "zod";

export const Author = z.object({
  id: z.number().int(),
  name: z.string(),
  books: z.array(z.number().int()).optional(),
});
