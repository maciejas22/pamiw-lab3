import { useQuery } from "@tanstack/react-query";
import { Center, Group, Space, Table } from "@mantine/core";

import { IBook } from "../types";
import { links } from "../routes/api-routes";
import { CreateBook } from "../components/create-book";
import { ModifyBook } from "../components/modify-book";
import { DeleteBook } from "../components/delete-book";

const fetchBooks = async () => {
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

export function BooksList() {
  const { data, error, isLoading, refetch } = useQuery<IBook[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const rows = data?.map((book) => (
    <Table.Tr key={book.id}>
      <Table.Td>{book.title}</Table.Td>
      <Table.Td>{book.author}</Table.Td>
      <Table.Td>
        <Group>
          <ModifyBook
            id={book.id}
            bookTitle={book.title}
            bookAuthor={book.author}
            refetch={refetch}
          />

          <DeleteBook id={book.id} refetch={refetch} />
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Book Title</Table.Th>
            <Table.Th>Book Author</Table.Th>
            <Table.Th>Modifiers</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Space h="md" />
      <Center>
        <CreateBook refetch={refetch} />
      </Center>
    </>
  );
}
