import { links } from "../routes/api-routes";

export const fetchBooks = async () => {
  const response = await fetch(
    `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${
      links.getBooks
    }`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  const data = await response.json();
  return data;
};

export const createBook = async (values: {
  title: string;
  authorId: number;
}) => {
  return await fetch(
    `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${
      links.getBooks
    }`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
};

export const deleteBook = async (id: number) => {
  return await fetch(
    `http://${import.meta.env.VITE_API_HOST}:${
      import.meta.env.VITE_API_PORT
    }/books/${id}`,
    {
      method: "DELETE",
    }
  );
};

export const updateBook = async (id: number, values: {}) => {
  return await fetch(
    `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${
      links.getBooks
    }`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        ...values,
      }),
    }
  );
};
