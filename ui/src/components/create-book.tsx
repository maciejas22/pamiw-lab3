import { Button, Modal, Select, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { links } from "../routes/api-routes";
import { IAuthor } from "../types";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";

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

export function CreateBook({ refetch }: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const [authors, setAuthors] = useState<IAuthor[]>([]);

  useEffect(() => {
    fetchAuthors().then((data) => {
      setAuthors(data);
    });
  }, []);

  const form = useForm({
    initialValues: {
      title: "",
      authorId: "",
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
        title: "Creating book...",
        message: "Please wait",
        loading: true,
      });

      const response = await fetch(
        `http://${import.meta.env.VITE_API_HOST}:${
          import.meta.env.VITE_API_PORT
        }${links.getBooks}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      notifications.clean();

      if (!response.ok) {
        notifications.show({
          title: "Failed to create book",
          message: "Failed to create book",
          color: "red",
          autoClose: 3000,
        });
      } else {
        notifications.clean();
        notifications.show({
          title: "Book created",
          message: "Book created successfully",
          color: "green",
          autoClose: 3000,
        });
      }
    } catch (error) {
      notifications.show({
        title: "Failed to create book",
        message: "Unexpected error occured",
        color: "red",
        autoClose: 3000,
      });
    } finally {
      refetch();
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Book" centered>
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

      <Button onClick={open}>Add Book</Button>
    </>
  );
}
