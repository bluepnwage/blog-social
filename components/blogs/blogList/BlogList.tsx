import { SimpleGrid } from "@mantine/core";
import { useStyles } from "./styles";
import { Blog } from "./Blog";
import { Blog as BlogProps } from "@interfaces/supabase";

interface PropTypes {
  blogs: BlogProps[];
}

export function BlogList({ blogs }: PropTypes) {
  const { classes, cx, theme } = useStyles();
  return (
    <>
      <SimpleGrid
        breakpoints={[{ maxWidth: "sm", cols: 1, spacing: theme.spacing.xl * 1.5 }]}
        cols={3}
        className={cx("container", classes.grid)}
      >
        {blogs.map((blog, index) => (
          <Blog blog={blog} key={index} />
        ))}
      </SimpleGrid>
    </>
  );
}
