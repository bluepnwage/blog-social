import { Stack, TextInput, Textarea, SimpleGrid, Button } from "@mantine/core";
import { FormEvent, ReactNode, useState } from "react";

interface PropTypes {
  description: string;
  heading: string;
  onChange: (e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => void;
  children: ReactNode;
  submit: () => Promise<void>;
}

export function BlogInfo({ description, heading, children, onChange, submit }: PropTypes) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack style={{ position: "relative" }}>
        <TextInput
          onChange={onChange}
          name={"heading"}
          value={heading}
          required
          label={"Heading"}
          placeholder={"Random blog heading that looks interesting"}
        />
        <Textarea
          onChange={onChange}
          value={description}
          name={"description"}
          required
          label="Description"
          placeholder="Random placeholder"
        />
        <SimpleGrid cols={2}>{children}</SimpleGrid>
        <Button loading={loading} color={"green"} onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </>
  );
}
