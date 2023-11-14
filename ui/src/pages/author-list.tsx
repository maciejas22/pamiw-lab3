import { useQuery } from "@tanstack/react-query";
import { Center, Group, Space, Table } from "@mantine/core";

import { IAuthor } from "../types";
import { CreateAuthor } from "../components/create-author";
import { DeleteAuthor } from "../components/delete-author";
import { ModifyAuthor } from "../components/modify-author";
import { fetchAuthors } from "../controllers/author";

export function AuthorList() {
  const { data, error, isLoading, refetch } = useQuery<IAuthor[]>({
    queryKey: ["authors"],
    queryFn: fetchAuthors,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const rows = data?.map((author) => (
    <Table.Tr key={author.id}>
      <Table.Td>{author.id}</Table.Td>
      <Table.Td>{author.name}</Table.Td>
      <Table.Td>
        <Group>
          <ModifyAuthor
            id={author.id}
            authorName={author.name}
            refetch={refetch}
          />
          <DeleteAuthor id={author.id} refetch={refetch} />
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Author ID</Table.Th>
            <Table.Th>Author Name</Table.Th>
            <Table.Th>Modifiers</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Space h="md" />
      <Center>
        <CreateAuthor refetch={refetch} />
      </Center>
    </>
  );
}
