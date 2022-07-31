import { RichTextEditor } from "@mantine/rte";
import { FormEvent, useState, useMemo, useEffect } from "react";
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
  blog: Blog;
  userID: string;
}

export default function EditorContainer({ blog, userID }: PropTypes) {
  const [form, setForm] = useState<Form>({
    heading: blog.heading,
    description: blog.description
  });
  const [content, setContent] = useState(blog.content);
  const [files, setFile] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThubmnail] = useState("");

  const { classes, cx } = useStyles();

  useEffect(() => {
    if(!blog.thumbnail) return
    downloadImage();
  }, []);

  const previewDisabled = !form.heading || !form.description || (files.length === 0 && !thumbnail);
  const buttonDisabled = !form.heading || !form.description || (files.length === 0 && !thumbnail) || !content;

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

  const downloadImage = async () => {
    try {
      const thumbnailKey = blog.thumbnail.slice(4);
      const { data, error } = await supabaseClient.storage.from("img").download(thumbnailKey);
      console.log(thumbnailKey);
      if (error) throw new Error(error.message);
      const url = URL.createObjectURL(data);
      setThubmnail(url);
    } catch (error) {
      alert(error.message);
    }
  };

  const uploadImage = async () => {
    const [file] = files;
    const filePath = `${userID}/thumbnails/${file.name}`;
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
                <ImagePreview src={imageURL || thumbnail} />
              </SimpleGrid>
              <RichTextEditor value={content} onChange={setContent} />
              <Button onClick={handleSubmit} disabled={buttonDisabled} color={"green"}>
                Submit
              </Button>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel className={cx(classes.flex, classes.previewTab)} pt={"md"} value="preview">
            <PreviewCard created_at={blog.created_at} {...form} image={imageURL || thumbnail} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
}
