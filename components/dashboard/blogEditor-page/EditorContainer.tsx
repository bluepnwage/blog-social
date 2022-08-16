import { FormEvent, useState, useMemo } from "react";
import { Title, Tabs } from "@mantine/core";
import { FilePencil, BrandHtml5, Check, X, InfoCircle, File, Upload } from "tabler-icons-react";
import { useStyles } from "./styles";
import { ImageUpload } from "./ImageUpload";
import { PreviewCard } from "./PreviewCard";
import { ImagePreview } from "./ImagePreview";
import { TextEditor } from "./TextEditor";
import { BlogPreview } from "./BlogPreview";
import { Publish } from "./Publish";
import { Blog, User } from "@interfaces/supabase";
import { showNotification } from "@mantine/notifications";
import { CloudinaryResponse } from "@interfaces/cloudinary";
import { BlogInfo } from "./BlogInfo";
import { useDisclosure } from "@mantine/hooks";

interface Form {
  heading: string;
  description: string;
}

interface PropTypes {
  blog: Blog;
  user: User;
}

export default function EditorContainer({ blog, user }: PropTypes) {
  const [form, setForm] = useState<Form>({
    heading: blog.heading,
    description: blog.description
  });
  const [content, setContent] = useState(blog.content);
  const [files, setFile] = useState<File[]>([]);
  const [thumbnail, setThubmnail] = useState(blog.thumbnail);
  const [published, handler] = useDisclosure(blog.published);
  const { classes, cx } = useStyles();

  const previewDisabled = !form.heading || !form.description || (files.length === 0 && !thumbnail);
  const buttonDisabled = !form.heading || !form.description || !content || (files.length === 0 && !thumbnail);

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.currentTarget;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submit = async () => {
    try {
      //Checks to see if there was a previous thumbnail and deletes it
      if (thumbnail && files.length > 0) await deletePrevThumbnail();
      if (files.length > 0) {
        const { secure_url } = await uploadImage();

        const res = await fetch("/api/create-blog", {
          method: "PUT",
          headers: { "Content-Type": "application" },
          body: JSON.stringify({ ...form, id: blog.id, content, thumbnail: secure_url, published })
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
          body: JSON.stringify({ ...form, id: blog.id, content, published })
        });

        if (res.ok) {
          showNotification({ message: "Blog saved successfully", title: "Success", color: "green", icon: <Check /> });
        } else {
          throw new Error("An error ocurred while updated the blog");
        }
      }
    } catch (error) {
      showNotification({ message: error.message, color: "red", icon: <X />, title: "An error ocurred" });
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

  const togglePublish = async () => {
    try {
      const res = await fetch("/api/publish-blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: blog.id, published: published ? false : true })
      });
      if (res.ok) {
        const json = await res.json();
        showNotification({ message: json.message, title: "Success", color: "green" });
        handler.toggle();
      } else {
        throw new Error("Failed to publish blog. Please try again.");
      }
    } catch (error) {
      showNotification({ message: error.message, color: "red", title: "Error" });
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
        <Tabs defaultValue="information" style={{ width: "80%" }}>
          <Tabs.List position="apart">
            <Tabs.Tab icon={<InfoCircle size={22} className={classes.icon} />} value={"information"}>
              Information
            </Tabs.Tab>
            <Tabs.Tab icon={<FilePencil size={22} className={classes.icon} />} value="editor">
              Editor
            </Tabs.Tab>
            <Tabs.Tab icon={<File size={22} className={classes.icon} />} disabled={buttonDisabled} value="blog-preview">
              Blog Preview
            </Tabs.Tab>
            <Tabs.Tab
              disabled={previewDisabled}
              icon={<BrandHtml5 size={22} className={classes.icon} />}
              value="preview"
            >
              Card Preview
            </Tabs.Tab>
            <Tabs.Tab disabled={buttonDisabled} icon={<Upload size={22} className={classes.icon} />} value={"publish"}>
              Publish
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value={"information"}>
            <BlogInfo {...form} submit={submit} onChange={handleChange}>
              <ImageUpload onDrop={setFile} />
              <ImagePreview src={imageURL || thumbnail} />
            </BlogInfo>
          </Tabs.Panel>
          <Tabs.Panel style={{ position: "relative" }} pt={"md"} value="editor">
            <TextEditor
              originalContent={blog.content}
              published={published}
              id={blog.id}
              content={content}
              onChange={setContent}
            />
          </Tabs.Panel>
          <Tabs.Panel className={cx(classes.flex, classes.previewTab)} pt={"md"} value="preview">
            <PreviewCard user={user} created_at={blog.created_at} {...form} image={imageURL || thumbnail} />
          </Tabs.Panel>
          <Tabs.Panel value="blog-preview">
            <BlogPreview {...form} content={content} thumbnail={imageURL || thumbnail} />
          </Tabs.Panel>
          <Tabs.Panel value="publish">
            <Publish onPublish={togglePublish} {...form} published={published} thumbnail={imageURL || thumbnail} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
}
