import { Modal, TextInput, Button, LoadingOverlay } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import { X } from "tabler-icons-react";

interface PropTypes {
  opened: boolean;
  onClose: () => void;
}

export default function CreateBlogModal({ onClose, opened }: PropTypes) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });
      if (res.ok) {
        const json = await res.json();
        router.push(`/dashboard/editor/${json.id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        showNotification({ message: error.message, title: "Failed to create blog", color: "red", icon: <X /> });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal zIndex={305} opened={opened} onClose={onClose} title="Create a new blog project">
        <div style={{ position: "relative" }}>
          <LoadingOverlay visible={loading} />
          <TextInput
            value={title}
            onChange={({ currentTarget }) => setTitle(currentTarget.value)}
            mb={"md"}
            label="Title for your project"
          />
          <Button onClick={handleSubmit} disabled={!title}>
            Create new blog
          </Button>
        </div>
      </Modal>
    </>
  );
}
