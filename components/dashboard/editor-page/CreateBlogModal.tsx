import { Modal, Card, TextInput, Button, LoadingOverlay } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/router";

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
        console.log(json);
        router.push(`/dashboard/bluepnwage/editor/${json.id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Create a new blog project">
        <Card style={{ position: "relative" }}>
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
        </Card>
      </Modal>
    </>
  );
}
