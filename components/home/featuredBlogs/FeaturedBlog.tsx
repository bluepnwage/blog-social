import Link from "next/link";
import { Anchor, Avatar, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useStyles } from "./styles";

interface PropTypes {}

export function FeaturedBlog() {
  const { classes, cx } = useStyles();
  return (
    <>
      <div className={cx("container", classes.blogContainer)}>
        <figure className={classes.imageContainer}>
          <Image
            src={"/phili.webp"}
            height={"100%"}
            width={"100%"}
            imageProps={{ loading: "lazy" }}
            alt={"Philipsburg"}
          />
        </figure>
        <div className={classes.descriptionContainer}>
          <Text component="strong">
            Travel —{" "}
            <Text weight={400} color={"dimmed"} component={"time"}>
              Jul 21, 2022
            </Text>
          </Text>
          <Title mb={"md"} order={3}>
            Amet non laborum aliquip tempor laboris est incididunt eiusmod pariatur ullamco tempor.
          </Title>
          <article>
            <Text mb={"md"} component="p">
              Quis amet incididunt et voluptate laboris. Eiusmod et nostrud Lorem anim eu aute. Eiusmod aliqua anim
              mollit officia. Quis nisi irure eiusmod sint sit irure dolor dolore nostrud ea reprehenderit sit aliquip
              ea. Occaecat ullamco qui fugiat quis. Ex incididunt aute pariatur ad laborum qui et veniam.
            </Text>
          </article>
          <Link passHref href={"/"}>
            <Anchor>Read article</Anchor>
          </Link>
          <Group mt={"md"}>
            <Avatar
              imageProps={{ loading: "lazy" }}
              src={"bluepnwage.jpg"}
              radius={"xl"}
              size={"lg"}
              alt={"Profile picture for author"}
            />
            <Stack spacing={5}>
              <Text component="strong">Agis Carty</Text>
              <Text component="span" color={"dimmed"}>
                Front-end Developer
              </Text>
            </Stack>
          </Group>
        </div>
      </div>
    </>
  );
}