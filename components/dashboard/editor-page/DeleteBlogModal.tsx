import { Button, Card, Group, LoadingOverlay, Modal, Text, ThemeIcon } from "@mantine/core";
import { AlertTriangle } from "tabler-icons-react";
import { useStyles } from "./styles";

interface PropTypes {
  loading: boolean;
  opened: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

export function DeleteBlogModal({ loading, onClose, onDelete, opened }: PropTypes) {
  const { classes } = useStyles();
  return (
    <>
      <Modal classNames={{ header: classes.deleteBlogHeader }} opened={opened} onClose={onClose}>
        <Card style={{ position: "relative" }}>
          <LoadingOverlay visible={loading} />
          <Group mb={"md"}>
            <ThemeIcon color={"orange"} variant={"light"}>
              <AlertTriangle />
            </ThemeIcon>
            <Text component="strong">Confirm deletion</Text>
          </Group>
          <Text component="p" mb={"md"}>
            Are you sure you want to delete this project? This action is irreversible
          </Text>
          <Group position="right">
            <Button variant={"default"} onClick={onClose}>
              Keep project
            </Button>
            <Button onClick={onDelete} color={"red"}>
              Delete project
            </Button>
          </Group>
        </Card>
      </Modal>
    </>
  );
}
