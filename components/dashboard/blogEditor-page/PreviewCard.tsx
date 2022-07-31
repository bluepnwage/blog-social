import { Card, Text, Title, Anchor, Image, Group, Avatar, Stack } from "@mantine/core";
import { useStyles } from "./styles";
import { formatDate } from "@util/formatDate";
interface PropTypes {
  heading: string;
  description: string;
  image: string;
  created_at: string;
}

export function PreviewCard({ description, heading, image, created_at }: PropTypes) {
  const { classes } = useStyles();
  const date = new Date(created_at);
  return (
    <>
      <Card className={classes.card}>
        <Card.Section component={"figure"} className={classes.imageContainer}>
          <Image
            src={image}
            width={"100%"}
            height={"100%"}
            imageProps={{ loading: "lazy", onLoad: () => URL.revokeObjectURL(image) }}
            alt={"Philipsburg"}
          />
        </Card.Section>
        <Text component="strong">
          Travel —{" "}
          <Text component="time" weight={400} color={"dimmed"}>
            {formatDate(date)}
          </Text>
        </Text>
        <Title mb={"md"} order={3}>
          {heading}
        </Title>
        <Text mb={"md"} component="p">
          {description}
        </Text>

        <Anchor>Read article</Anchor>
        <Group mt={"md"}>
          <Avatar
            imageProps={{ loading: "lazy" }}
            src={"/bluepnwage.jpg"}
            radius={"xl"}
            size={"md"}
            alt={"Profile picture for author"}
          />
          <Stack spacing={0}>
            <Text size="sm" component="strong">
              Agis Carty
            </Text>
            <Text size="sm" component="span" color={"dimmed"}>
              Front-end Developer
            </Text>
          </Stack>
        </Group>
      </Card>
    </>
  );
}
