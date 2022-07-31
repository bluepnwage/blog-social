import { RichTextEditor } from "@mantine/rte";
import { FormEvent, useState, useMemo } from "react";
import { Title, TextInput, Button, Stack, Textarea, Tabs, LoadingOverlay, SimpleGrid } from "@mantine/core";
import { FilePencil, BrandHtml5 } from "tabler-icons-react";
import { useStyles } from "./styles";
import { ImageUpload } from "./ImageUpload";
import { PreviewCard } from "./PreviewCard";
import { ImagePreview } from "./ImagePreview";
import { Blog } from "@interfaces/supabase";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

interface Form {
  heading: string;
  description: string;
}

interface PropTypes {
  image: string;
  blog: Blog;
}

export default function EditorContainer({ image, blog }: PropTypes) {
  const [form, setForm] = useState<Form>({
    heading: blog.heading,
    description: blog.description
  });
  const [content, setContent] = useState(blog.content);
  const [files, setFile] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { classes, cx } = useStyles();

  const previewDisabled = !form.heading || !form.description || (files.length === 0 && !image);
  const buttonDisabled = !form.heading || !form.description || (files.length === 0 && !image) || !content;

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
      const thumbnail = await uploadImage();
      const res = await fetch("/api/create-blog", {
        method: "PUT",
        headers: { "Content-Type": "application" },
        body: JSON.stringify({ ...form, id: blog.id, content, thumbnail })
      });
      if (res.ok) {
        const json = await res.json();
        console.log(json);
      } else {
        throw new Error("Something happened");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async () => {
    const user = supabaseClient.auth.user();
    const [file] = files;
    const filePath = `${user.id}/thumbnails/${file.name}`;
    console.log(filePath);
    const { data, error } = await supabaseClient.storage.from("img").upload(filePath, file, { contentType: file.type });
    if (error) throw new Error(error.message);
    return data.Key;
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
              <SimpleGrid cols={2}>
                <ImageUpload onDrop={setFile} />
                <ImagePreview src={imageURL} />
              </SimpleGrid>
              <RichTextEditor value={content} onChange={setContent} />
              <Button onClick={handleSubmit} disabled={buttonDisabled} color={"green"}>
                Submit
              </Button>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel className={cx(classes.flex, classes.previewTab)} pt={"md"} value="preview">
            <PreviewCard created_at={blog.created_at} {...form} image={imageURL || image} />
          </Tabs.Panel>
        </Tabs>
        <Button onClick={uploadImage}>Test</Button>
      </div>
    </>
  );
}
