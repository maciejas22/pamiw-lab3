import { db } from "../db";

const AUTHORS = [
  { id: 9995, name: "J. K. Rowling" },
  { id: 9996, name: "J. R. R. Tolkien" },
  { id: 9997, name: "Brent Weeks" },
  { id: 9998, name: "Patrick Rothfuss" },
  { id: 9999, name: "Brandon Sanderson" },
];

const BOOKS = [
  { title: "Harry Potter and the Chamber of Secrets", authorId: 9995 },
  { title: "Harry Potter and the Prisoner of Azkaban", authorId: 9995 },

  { title: "The Fellowship of the Ring", authorId: 9996 },
  { title: "The Two Towers", authorId: 9996 },

  { title: "The Way of Shadows", authorId: 9997 },
  { title: "Beyond the Shadows", authorId: 9997 },

  { title: "The Name of the Wind", authorId: 9998 },
];

async function clear() {
  await db.book.deleteMany({});
  await db.author.deleteMany({});
}

async function seed() {
  await clear();

  for (const author of AUTHORS) {
    await db.author.create({ data: author });
  }

  for (const book of BOOKS) {
    await db.book.create({ data: book });
  }
}

seed()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await db.$disconnect();
  });
