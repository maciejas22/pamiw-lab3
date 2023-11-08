import { db } from "../db";

export const createAuthor = async (name: string) => {
  return await db.author.create({
    data: { name },
  });
};

export const getAuthor = async (id: number) => {
  return await db.author.findUnique({ where: { id } });
};

export const getAuthors = async () => {
  return await db.author.findMany();
};

export const updateAuthor = async (id: number, name: string) => {
  return await db.author.update({ where: { id }, data: { name } });
};

export const deleteAuthor = async (id: number) => {
  return await db.author.delete({ where: { id } });
};
