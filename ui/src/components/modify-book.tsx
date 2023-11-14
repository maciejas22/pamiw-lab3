import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Space, Select } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { IAuthor } from "../types";
import { links } from "../routes/api-routes";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { updateBook } from "../controllers/book";

const fetchAuthors = async () => {
  const response = await fetch(
    `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${
      links.getAuthors
    }`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch authors");
  }
  const data: IAuthor[] = await response.json();
  return data;
};

export function ModifyBook({
  id,
  bookTitle,
  bookAuthor,
  refetch,
}: {
  id: number;
  bookTitle: string;
  bookAuthor: string;
  refetch: any;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [authors, setAuthors] = useState<IAuthor[]>([]);

  useEffect(() => {
    fetchAuthors().then((data) => {
      setAuthors(data);
    });
  }, []);

  const form = useForm({
    initialValues: {
      title: bookTitle,
      authorId:
        authors.find((author) => author.name === bookAuthor)?.id.toString() ??
        "",
    },
    validate: {
      title: (value) => (value.trim().length < 2 ? "Cannot be empty" : null),
      authorId: (value) => (value.trim().length < 1 ? "Cannot be empty" : null),
    },
    transformValues: (values) => ({
      title: values.title.trim(),
      authorId: parseInt(values.authorId, 10),
    }),
  });

  const handleSubmit = async (values: { title: string; authorId: number }) => {
    try {
      notifications.show({
        title: "Modifying book...",
        message: "Please wait",
        loading: true,
      });

      const response = await updateBook(id, values);

      notifications.clean();
      if (!response.ok) {
        notifications.show({
          title: "Failed to modify book",
          message: "Failed to modify book",
          color: "red",
          autoClose: 3000,
        });
      } else {
        notifications.clean();
        notifications.show({
          title: "Book modify",
          message: "Book modify successfully",
          color: "green",
          autoClose: 3000,
        });
        close();
      }
    } catch (error) {
      notifications.show({
        title: "Failed to modify book",
        message: "Unexpected error occured",
        color: "red",
        autoClose: 3000,
      });
    } finally {
      refetch();
      close();
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Modify Book" centered>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Book Title"
            placeholder="Book Title"
            {...form.getInputProps("title")}
          />
          <Space h="md" />
          <Select
            label="Author"
            placeholder="Select author"
            data={authors.map((autor) => {
              return { value: autor.id.toString(), label: autor.name };
            })}
            searchable
            {...form.getInputProps("authorId")}
          />
          <Space h="md" />
          <Button variant="filled" type="submit">
            Create
          </Button>
        </form>
      </Modal>

      <Button onClick={open} variant="outline" size="compact-md">
        <IconPencil />
      </Button>
    </>
  );
}
