import Link from "next/link";
import { Blog } from "@interfaces/supabase";
import { Anchor, Image, Text, Title } from "@mantine/core";
import { formatDate } from "@util/formatDate";
import { useStyles } from "./styles";

interface PropTypes {
  blog: Blog;
}

export function LikedBlog({ blog }: PropTypes) {
  const { classes } = useStyles();
  const date = new Date(blog.created_at);
  return (
    <div className={classes.blogContainer}>
      <div className={classes.articleContainer}>
        <time className={classes.dimmedText}>{formatDate(date)}</time>
        <Title mt={5} mb={"md"} order={2}>
          {blog.title}
        </Title>
        <Text mb={"md"} component="p">
          {blog.description}
        </Text>
        <Link href={`/blogs/${blog.id}`} passHref>
          <Anchor>Read article</Anchor>
        </Link>
      </div>
      <figure className={classes.imageContainer}>
        <Image imageProps={{ loading: "lazy" }} src={blog.thumbnail} width={"100%"} alt={"Thumbnail for blog"} />
      </figure>
    </div>
  );
}
