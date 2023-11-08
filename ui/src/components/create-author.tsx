import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

export function CreateAuthor({ refetch }: any) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? "Cannot be empty" : null),
    },
  });

  const handleSubmit = async (values: { name: string }) => {
    try {
      notifications.show({
        title: "Creating author...",
        message: "Please wait",
        loading: true,
      });

      const response = await fetch(
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
      notifications.clean();

      if (!response.ok) {
        notifications.show({
          title: "Failed to create author",
          message: "Failed to create author",
          color: "red",
          autoClose: 3000,
        });
      } else {
        notifications.clean();
        notifications.show({
          title: "Author created",
          message: "Author created successfully",
          color: "green",
          autoClose: 3000,
        });
        close();
      }
    } catch (error) {
      notifications.show({
        title: "Failed to create author",
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
      <Modal opened={opened} onClose={close} title="Create Author" centered>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Author name"
            placeholder="Author name"
            {...form.getInputProps("name")}
          />
          <Space h="md" />
          <Button variant="filled" type="submit">
            Create
          </Button>
        </form>
      </Modal>

      <Button onClick={open}>Add author</Button>
    </>
  );
}
