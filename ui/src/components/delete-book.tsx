import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { deleteBook } from "../controllers/book";

export function DeleteBook({ id, refetch }: { id: number; refetch: any }) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async () => {
    try {
      notifications.show({
        title: "Deleting book...",
        message: "Please wait",
        loading: true,
      });

      const response = await deleteBook(id);
      notifications.clean();

      if (!response.ok) {
        notifications.show({
          title: "Failed to delete book",
          message: "Failed to delete book",
          color: "red",
          autoClose: 3000,
        });
      } else {
        notifications.show({
          title: "Book deleted",
          message: "Book deleted successfully",
          color: "green",
          autoClose: 3000,
        });
      }
    } catch (error) {
      notifications.show({
        title: "Failed to delete book",
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
          Delete Book
        </Button>
      </Modal>

      <Button onClick={open} variant="outline" size="compact-md">
        <IconX />
      </Button>
    </>
  );
}
