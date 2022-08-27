import { SimpleGrid, Text, Title } from "@mantine/core";
import { useStyles } from "./styles";
import { Blog } from "./Blog";
import { BlogJoin } from "@interfaces/supabase";
import { Filters } from "./Filters";
import { useState, useEffect } from "react";
import { Topics, FilterTypes } from "@interfaces/blogs";
import { sortBlogs } from "@util/sortBlogs";
import { useRouter } from "next/router";

interface PropTypes {
  blogs: BlogJoin[];
}

export function BlogList({ blogs }: PropTypes) {
  const { classes, cx, theme } = useStyles();
  const [chip, setChip] = useState<Topics>("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterTypes>("popular");
  const router = useRouter();

  useEffect(() => {
    const query = router.query;
    if ("topic" in query) {
      setChip(query.topic as Topics);
    }
  }, []);

  const sortedBlogs = sortBlogs(blogs, chip, filter, search);

  const searchProps = {
    value: search,
    change(value: string) {
      setSearch(value);
    }
  };

  const categoryProps = {
    chip,
    change: setChip
  };

  const filterProps = {
    value: filter,
    change: setFilter
  };

  return (
    <>
      <Title order={1} mt={"xl"}>
        Browse our blogs
      </Title>
      <div className={classes.container}>
        <SimpleGrid
          breakpoints={[{ maxWidth: "sm", cols: 1, spacing: theme.spacing.xl * 1.5 }]}
          cols={3}
          className={cx(classes.grid)}
        >
          <Filters search={searchProps} category={categoryProps} filter={filterProps} />
          {sortedBlogs.length > 0 &&
            sortedBlogs.map(({ profiles: user, ...blog }, index) => <Blog blog={blog} key={index} user={user} />)}
          {sortedBlogs.length === 0 && <Text>No blogs found!</Text>}
        </SimpleGrid>
      </div>
    </>
  );
}
