import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

export function DeleteAuthor({ id, refetch }: { id: number; refetch: any }) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async () => {
    try {
      notifications.show({
        title: "Deleting author...",
        message: "Please wait",
        loading: true,
      });

      const response = await fetch(
        `http://${import.meta.env.VITE_API_HOST}:${
          import.meta.env.VITE_API_PORT
        }/authors/${id}`,
        {
          method: "DELETE",
        }
      );
      notifications.clean();

      if (!response.ok) {
        notifications.show({
          title: "Failed to delete author",
          message: "Failed to delete author",
          color: "red",
          autoClose: 3000,
        });
      } else {
        notifications.show({
          title: "Author deleted",
          message: "Author deleted successfully",
          color: "green",
          autoClose: 3000,
        });
      }
    } catch (error) {
      notifications.show({
        title: "Failed to delete author",
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
      <Modal opened={opened} onClose={close} title="Are you sure?" centered>
        <Button variant="filled" color="red" onClick={handleDelete}>
          Delete Author
        </Button>
      </Modal>

      <Button onClick={open} variant="outline" size="compact-md">
        <IconX />
      </Button>
    </>
  );
}
