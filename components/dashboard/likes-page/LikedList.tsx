import { SimpleGrid, Title, Divider, Text } from "@mantine/core";
import { useStyles } from "./styles";
import { LikedBlog } from "./LikedBlog";
import { useState } from "react";
import { SortLikes } from "./SortLikes";
import { Blog } from "@interfaces/supabase";

type SortMethod = "newest" | "oldest";

interface PropTypes {
  blogs: Blog[];
}

export function LikedList({ blogs }: PropTypes) {
  const [sort, setSort] = useState<SortMethod>("newest");
  const { classes } = useStyles();

  const handleChange = (value: SortMethod) => {
    setSort(value);
  };

  const sortedBlogs = sorter(blogs, sort);

  return (
    <>
      <Title mb={"xl"} order={1}>
        Liked blogs
      </Title>
      <SortLikes onChange={handleChange} value={sort} />
      <Divider my={"xl"} className="container" />
      {sortedBlogs.length === 0 && <Text component="p">You haven&apos;t liked any blogs yet</Text>}
      {sortedBlogs.length > 0 && (
        <SimpleGrid spacing={44} className={classes.container} cols={1}>
          {sortedBlogs.map((blog, key) => {
            return <LikedBlog blog={blog} key={key} />;
          })}
        </SimpleGrid>
      )}
    </>
  );
}

function sorter(blogs: Blog[], sort: SortMethod) {
  switch (sort) {
    case "newest": {
      const filtered = blogs.sort((a, b) => {
        return Date.parse(b.created_at) - Date.parse(a.created_at);
      });
      return filtered;
    }
    case "oldest": {
      const filtered = blogs.sort((a, b) => {
        return Date.parse(a.created_at) - Date.parse(b.created_at);
      });
      return filtered;
    }
    default:
      return blogs;
  }
}
