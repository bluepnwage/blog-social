import { RichTextEditor } from "@mantine/rte";
import { FormEvent, useState, useMemo } from "react";
import { Title, TextInput, Button, Stack, Textarea, Tabs, LoadingOverlay } from "@mantine/core";
import { FilePencil, BrandHtml5 } from "tabler-icons-react";
import { useStyles } from "./styles";
import { ImageUpload } from "./ImageUpload";
import { PreviewCard } from "./PreviewCard";
import { Blog } from "pages/dashboard/[id]/editor/[slug]";

interface Form {
  heading: string;
  description: string;
  content: string;
}

export default function EditorContainer(blog: Blog) {
  const [form, setForm] = useState<Form>({
    heading: blog.heading,
    description: blog.description,
    content: blog.content
  });
  const [value, setValue] = useState("");
  const [files, setFile] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { classes, cx } = useStyles();

  const previewDisabled = !form.heading || !form.description || files.length === 0;
  const buttonDisabled = !form.heading || !form.description || files.length === 0 || !value;

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.currentTarget;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-blog", {
        method: "PUT",
        headers: { "Content-Type": "application" },
        body: JSON.stringify({ ...form, id: blog.id })
      });
      if (res.ok) {
        const json = await res.json();
        console.log(json);
      } else {
        throw new Error("Something happened");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const imageURL = useMemo(() => {
    const [file] = files;

    return file ? URL.createObjectURL(file) : "";
  }, [files]);

  return (
    <>
      <div className={cx(classes.container, classes.flex)}>
        <Title order={1} mb={"xl"}>
          {blog.title}
        </Title>
        <Tabs defaultValue="editor" style={{ width: "80%" }}>
          <Tabs.List position="right">
            <Tabs.Tab icon={<FilePencil size={22} className={classes.icon} />} value="editor">
              Editor
            </Tabs.Tab>
            <Tabs.Tab
              disabled={previewDisabled}
              icon={<BrandHtml5 size={22} className={classes.icon} />}
              value="preview"
            >
              Preview
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel pt={"md"} value="editor">
            <Stack style={{ position: "relative" }}>
              <LoadingOverlay visible={loading} />
              <TextInput
                onChange={handleChange}
                name={"heading"}
                value={form.heading}
                required
                label={"Heading"}
                placeholder={"Random blog heading that looks interesting"}
              />
              <Textarea
                onChange={handleChange}
                value={form.description}
                name={"description"}
                required
                label="Description"
                placeholder="Random placeholder"
              />
              <ImageUpload onDrop={setFile} />
              <RichTextEditor value={value} onChange={setValue} />
              <Button onClick={handleSubmit} disabled={buttonDisabled} color={"green"}>
                Submit
              </Button>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel className={cx(classes.flex, classes.previewTab)} pt={"md"} value="preview">
            <PreviewCard {...form} image={imageURL} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
}
