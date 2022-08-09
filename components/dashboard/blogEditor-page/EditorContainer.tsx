import { RichTextEditor } from "@mantine/rte";
import { FormEvent, useState, useMemo } from "react";
import { Title, TextInput, Button, Stack, Textarea, Tabs, LoadingOverlay, SimpleGrid } from "@mantine/core";
import { FilePencil, BrandHtml5, Check, X } from "tabler-icons-react";
import { useStyles } from "./styles";
import { ImageUpload } from "./ImageUpload";
import { PreviewCard } from "./PreviewCard";
import { ImagePreview } from "./ImagePreview";
import { Blog } from "@interfaces/supabase";
import { showNotification } from "@mantine/notifications";
import { CloudinaryResponse } from "@interfaces/cloudinary";

interface Form {
  heading: string;
  description: string;
}

interface PropTypes {
  blog: Blog;
  userID: string;
}

export default function EditorContainer({ blog }: PropTypes) {
  const [form, setForm] = useState<Form>({
    heading: blog.heading,
    description: blog.description
  });
  const [content, setContent] = useState(blog.content);
  const [files, setFile] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThubmnail] = useState(blog.thumbnail);

  const { classes, cx } = useStyles();

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
      //Checks to see if there was a previous thumbnail and deletes it
      if (thumbnail && files.length > 0) await deletePrevThumbnail();
      if (files.length > 0) {
        const { secure_url } = await uploadImage();

        const res = await fetch("/api/create-blog", {
          method: "PUT",
          headers: { "Content-Type": "application" },
          body: JSON.stringify({ ...form, id: blog.id, content, thumbnail: secure_url, published: blog.published })
        });

        if (res.ok) {
          showNotification({ message: "Blog saved successfully", title: "Success", color: "green", icon: <Check /> });
          setThubmnail(secure_url);
        } else {
          throw new Error("An error ocurred while updated the blog");
        }
      } else {
        const res = await fetch("/api/create-blog", {
          method: "PUT",
          headers: { "Content-Type": "application" },
          body: JSON.stringify({ ...form, id: blog.id, content, published: blog.published })
        });

        if (res.ok) {
          showNotification({ message: "Blog saved successfully", title: "Success", color: "green", icon: <Check /> });
        } else {
          throw new Error("An error ocurred while updated the blog");
        }
      }
    } catch (error) {
      showNotification({ message: error.message, color: "red", icon: <X />, title: "An error ocurred" });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async () => {
    const [file] = files;
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);
    const res = await fetch(url, {
      method: "POST",
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
      return data as CloudinaryResponse;
    }
    throw new Error("Failed to upload image");
  };

  const deletePrevThumbnail = async () => {
    await fetch("/api/delete-image", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: thumbnail })
    });
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
              <LoadingOverlay zIndex={250} visible={loading} />
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
