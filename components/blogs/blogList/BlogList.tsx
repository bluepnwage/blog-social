import { SimpleGrid } from "@mantine/core";
import { useStyles } from "./styles";
import { Blog } from "./Blog";
import { BlogJoin } from "@interfaces/supabase";
import { Filters } from "./Filters";
import { useState } from "react";

interface PropTypes {
  blogs: BlogJoin[];
}

type FilterTypes = "popular" | "recent" | "least popular";

export function BlogList({ blogs }: PropTypes) {
  const { classes, cx, theme } = useStyles();
  const [filter, setFilter] = useState<FilterTypes>("popular");

  const sortedBlogs = sorter(blogs, filter);
  return (
    <>
      <Filters filter={filter} onChange={(value: FilterTypes) => setFilter(value)} />
      <SimpleGrid
        breakpoints={[{ maxWidth: "sm", cols: 1, spacing: theme.spacing.xl * 1.5 }]}
        cols={3}
        className={cx("container", classes.grid)}
      >
        {sortedBlogs.map(({ profiles: user, ...blog }, index) => (
          <Blog blog={blog} key={index} user={user} />
        ))}
      </SimpleGrid>
    </>
  );
}

function sorter(blogs: BlogJoin[], filter: FilterTypes) {
  switch (filter) {
    case "recent": {
      const filtered = blogs.sort((a, b) => {
        return Date.parse(b.created_at) - Date.parse(a.created_at);
      });
      return filtered;
    }
    case "popular": {
      const filtered = blogs.sort((a, b) => {
        return b.likes - a.likes;
      });
      return filtered;
    }
    case "least popular": {
      const filtered = blogs.sort((a, b) => {
        return a.likes - b.likes;
      });
      return filtered;
    }
    default:
      return blogs;
  }
}
