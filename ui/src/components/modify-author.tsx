import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Space } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPencil } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { updateAuthor } from "../controllers/author";

export function ModifyAuthor({
  id,
  authorName,
  refetch,
}: {
  id: number;
  authorName: string;
  refetch: any;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: authorName,
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? "Cannot be empty" : null),
    },
  });

  const handleSubmit = async (values: { name: string }) => {
    try {
      notifications.show({
        title: "Modifying author...",
        message: "Please wait",
        loading: true,
      });

      const response = await updateAuthor(id, values);
      notifications.clean();

      if (!response.ok) {
        notifications.show({
          title: "Failed to modify author",
          message: "Failed to modify author",
          color: "red",
          autoClose: 3000,
        });
      } else {
        notifications.clean();
        notifications.show({
          title: "Author modified",
          message: "Author modified successfully",
          color: "green",
          autoClose: 3000,
        });
        close();
      }
    } catch (error) {
      notifications.show({
        title: "Failed to modify author",
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
      <Modal opened={opened} onClose={close} title="Modify Author" centered>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            label="Author name"
            placeholder="Author name"
            {...form.getInputProps("name")}
          />
          <Space h="md" />
          <Button variant="filled" type="submit">
            Update
          </Button>
        </form>
      </Modal>

      <Button onClick={open} variant="outline" size="compact-md">
        <IconPencil />
      </Button>
    </>
  );
}
