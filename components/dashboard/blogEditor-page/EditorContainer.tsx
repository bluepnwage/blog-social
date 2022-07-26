import { RichTextEditor } from "@mantine/rte";
import { FormEvent, useState, useMemo } from "react";
import { Title, TextInput, Button, Stack, Textarea, Tabs } from "@mantine/core";
import { FilePencil, BrandHtml5 } from "tabler-icons-react";
import { useStyles } from "./styles";
import { ImageUpload } from "./ImageUpload";
import { PreviewCard } from "./PreviewCard";

interface Form {
  heading: string;
  description: string;
}

export default function EditorContainer() {
  const [form, setForm] = useState<Form>({ heading: "", description: "" });
  const [value, setValue] = useState("");
  const [files, setFile] = useState<File[]>([]);
  const [showEditor, setShow] = useState(true);
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

  const handleSubmit = () => {
    setForm({ heading: "", description: "" });
    setValue("");
    setFile([]);
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 50);
  };

  const imageURL = useMemo(() => {
    const [file] = files;

    return file ? URL.createObjectURL(file) : "";
  }, [files]);

  return (
    <>
      <div className={cx(classes.container, classes.flex)}>
        <Title order={1} mb={"xl"}>
          My first blog
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
            <Stack>
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
              {showEditor && <RichTextEditor value={value} onChange={setValue} />}
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
