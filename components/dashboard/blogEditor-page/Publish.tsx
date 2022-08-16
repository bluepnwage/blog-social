import { Title, Text, Stack, Image, Button, Group } from "@mantine/core";
import { useState } from "react";

interface PropTypes {
  thumbnail: string;
  heading: string;
  description: string;
  published: boolean;
  onPublish: () => Promise<void>;
}

export function Publish({ thumbnail, description, heading, published, onPublish }: PropTypes) {
  const [loading, setLoading] = useState(false);
  const status = published ? "Published" : "Unpublished";
  const action = published ? "Unpublish" : "Publish";

  const handleClick = async () => {
    setLoading(true);
    try {
      await onPublish();
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Group mt={"md"} position="center">
        <Stack>
          <Title align="center" order={2}>
            Overview
          </Title>
          <Stack spacing={5}>
            <Text component="strong" align="center">
              Heading:
            </Text>
            <Text component="span" align="center">
              {heading}
            </Text>
          </Stack>
          <Stack spacing={5}>
            <Text component="strong" align="center">
              Description:
            </Text>
            <Text component="span" align="center">
              {description}
            </Text>
          </Stack>
          <Text component="strong" align="center">
            Thumbnail:
          </Text>
          <figure>
            <Image alt={"Blog thumbnail"} src={thumbnail} />
          </figure>
          <Group position="apart">
            <Text component="strong">
              Status:{" "}
              <Text weight={400} color={published ? "green" : "orange"} component="span">
                {status}
              </Text>
            </Text>
            <Button loading={loading} onClick={handleClick} color={published ? "orange" : "green"}>
              {action}
            </Button>
          </Group>
        </Stack>
      </Group>
    </>
  );
}
