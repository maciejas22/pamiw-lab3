import { links } from "../routes/api-routes";

export const fetchAuthors = async () => {
  const response = await fetch(
    `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${
      links.getAuthors
    }`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch authors");
  }
  const data = await response.json();
  return data;
};

export const createAuthor = async (values: { name: string }) => {
  return await fetch(
    `http://${import.meta.env.VITE_API_HOST}:${
      import.meta.env.VITE_API_PORT
    }/authors`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
};

export const deleteAuthor = async (id: number) => {
  return await fetch(
    `http://${import.meta.env.VITE_API_HOST}:${
      import.meta.env.VITE_API_PORT
    }/authors/${id}`,
    {
      method: "DELETE",
    }
  );
};

export const updateAuthor = async (id: number, values: { name: string }) => {
  return await fetch(
    `http://${import.meta.env.VITE_API_HOST}:${
      import.meta.env.VITE_API_PORT
    }/authors`,
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
