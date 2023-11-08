import { db } from "../db";

export const createBook = async (title: string, authorId: number) => {
  const book = await db.book.create({
    data: { title, authorId },
    include: { author: { select: { name: true } } },
  });

  return {
    id: book.id,
    title: book.title,
    author: book.author.name,
  };
};

export const getBook = async (id: number) => {
  const book = await db.book.findUnique({
    where: { id },
    include: { author: { select: { name: true } } },
  });

  return book
    ? { id: book.id, title: book.title, author: book.author.name }
    : null;
};

export const getBooks = async () => {
  const books = await db.book.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return books.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author.name,
  }));
};

export const updateBook = async (
  id: number,
  title: string,
  authorId: number
) => {
  const book = await db.book.update({
    where: { id },
    data: { title, authorId },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    id: book.id,
    title: book.title,
    author: book.author.name,
  };
};

export const deleteBook = async (id: number) => {
  const book = await db.book.delete({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    id: book.id,
    title: book.title,
    author: book.author.name,
  };
};
