import { SimpleGrid } from "@mantine/core";
import { useStyles } from "./styles";
import { Blog } from "./Blog";

export function BlogList() {
  const { classes, cx, theme } = useStyles();
  const blogs = Array(6).fill(null);
  return (
    <>
      <SimpleGrid
        breakpoints={[{ maxWidth: "sm", cols: 1, spacing: theme.spacing.xl * 1.5 }]}
        cols={3}
        className={cx("container", classes.grid)}
      >
        {blogs.map((_, index) => (
          <Blog key={index} />
        ))}
      </SimpleGrid>
    </>
  );
}
