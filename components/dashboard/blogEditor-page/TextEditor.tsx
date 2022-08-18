import RichTextEditor from "@mantine/rte";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { Dispatch, SetStateAction, useState, useEffect, lazy, Suspense } from "react";
import { Check } from "tabler-icons-react";
import { Group, Text, Loader, Button } from "@mantine/core";
import { useStyles } from "./styles";

const MarkdownEditor = lazy(() => import("./MarkdownEditor"));

interface PropTypes {
  content: string;
  onChange: Dispatch<SetStateAction<string>>;
  id: number;
  published: boolean;
  originalContent: string;
}

export function TextEditor({ content, onChange, id, published, originalContent }: PropTypes) {
  const [autosave, setSaving] = useState({ loading: false, success: false });
  const [loading, loadHandler] = useDisclosure(false);
  const [firstMount, setFirstMount] = useState(true);
  const [debounced] = useDebouncedValue(content, 2000);
  const [markdown, markdownHandler] = useDisclosure(false);
  const { classes, cx } = useStyles();

  useEffect(() => {
    setFirstMount(false);
  }, []);

  useEffect(() => {
    if (!firstMount) {
      handleAutosave();
    }
  }, [debounced]);

  const handleAutosave = async () => {
    setSaving((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch("/api/autosave", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, content })
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message);
      } else {
        setSaving((prev) => ({ ...prev, success: true }));
        setTimeout(() => {
          setSaving((prev) => ({ ...prev, success: false }));
        }, 3000);
      }
    } catch (error) {
      showNotification({ title: "Autosave failed", color: "red", message: error.message });
    } finally {
      setSaving((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleClick = async () => {
    loadHandler.open();
    try {
      const res = await fetch("/api/publish-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        const json = await res.json();
        showNotification({ message: json.message, title: "Success", color: "green" });
      } else {
        throw new Error("Failed to save blog, please try again");
      }
    } catch (error) {
      showNotification({ color: "red", message: error.message, title: "Error" });
    } finally {
      loadHandler.close();
    }
  };

  const edited = debounced !== originalContent;

  return (
    <>
      <Button variant="light" mb={"md"} onClick={markdownHandler.toggle}>
        {markdown ? "Use Rich text editor" : "Use markdown"}
      </Button>
      {!markdown && <RichTextEditor stickyOffset={70} value={content} onChange={onChange} />}
      <Suspense
        fallback={
          <Group position="center">
            <Loader size={"xl"} />
          </Group>
        }
      >
        {markdown && <MarkdownEditor onChange={onChange} content={content} />}
      </Suspense>
      <div className={cx(classes.loader, classes.flex)}>
        {autosave.loading && <Loader />}
        {autosave.success && (
          <Group spacing={5}>
            <Text>Blog saved</Text>
            <Check className={classes.successIcon} />
          </Group>
        )}
      </div>
      {published && edited && (
        <Button loading={loading} color={"green"} onClick={handleClick} mt={"md"}>
          Publish changes
        </Button>
      )}
    </>
  );
}
