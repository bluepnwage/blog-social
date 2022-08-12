import Link from "next/link";
import { Image, Text, Title, Anchor } from "@mantine/core";
import { useStyles } from "./styles";
import { ReactNode } from "react";
import { Blog as BlogProps } from "@interfaces/supabase";
import { formatDate } from "@util/formatDate";

interface PropTypes {
  children: ReactNode;
  blog: BlogProps;
}

export function Blog({ children, blog }: PropTypes) {
  const { classes, cx } = useStyles();
  const date = new Date(blog.created_at);
  return (
    <>
      <div className={cx(classes.container, classes.articleContainer)}>
        <article className={classes.descriptionContainer}>
          <Text component="time" color={"dimmed"}>
            {formatDate(date)}
          </Text>
          <Title mt={"xs"} mb={"md"} order={3}>
            {blog.heading}
          </Title>
          <Text mb={"sm"} component="p">
            {blog.description}
          </Text>
          <Link href={`/blogs/${blog.id}`} passHref>
            <Anchor>Read article</Anchor>
          </Link>
        </article>
        <figure className={classes.imageContainer}>
          <Image
            src={blog.thumbnail}
            width={"100%"}
            height={"100%"}
            imageProps={{ loading: "lazy" }}
            alt={"Thumbnail for blog"}
          />
        </figure>
      </div>
      {children}
    </>
  );
}
