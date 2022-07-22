import { Anchor, Avatar, Card, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useStyles } from "./styles";

export function LatestBlog() {
  const { classes } = useStyles();
  return (
    <>
      <Card className={classes.card}>
        <Card.Section component={"figure"} className={classes.imageContainer}>
          <Image
            src={"/phili.webp"}
            width={"100%"}
            height={"100%"}
            imageProps={{ loading: "lazy" }}
            alt={"Philipsburg"}
          />
        </Card.Section>
        <Text component="strong">
          Travel —{" "}
          <Text component="time" weight={400} color={"dimmed"}>
            Jul 21, 2022
          </Text>
        </Text>
        <Title mb={"md"} order={3}>
          Culpa amet culpa do esse Lorem excepteur sunt ad non eu Lorem.
        </Title>
        <Text mb={"md"} component="p">
          Non magna sit eu velit esse et est mollit dolor laboris. In ea irure enim tempor pariatur non ex adipisicing
          dolor consectetur magna elit. Mollit excepteur sint irure consequat ipsum esse reprehenderit exercitation
          consectetur occaecat.
        </Text>
        <Anchor>Read article</Anchor>
        <Group mt={"md"}>
          <Avatar
            imageProps={{ loading: "lazy" }}
            src={"bluepnwage.jpg"}
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
