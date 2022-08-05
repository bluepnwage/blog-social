import { Title, SimpleGrid } from "@mantine/core";
import { useStyles } from "./styles";
import { LatestBlog } from "./LatestBlog";
import { BlogJoin } from "@interfaces/supabase";

interface PropTypes {
  blogs: BlogJoin[];
}

export function LatestBlogs({ blogs }: PropTypes) {
  const { classes, cx, theme } = useStyles();

  return (
    <>
      <section className={cx("section-container", classes.sectionContainer)}>
        <header className="container">
          <Title order={2} mb={"lg"}>
            Latest blogs
          </Title>
        </header>
        <SimpleGrid
          breakpoints={[{ maxWidth: "sm", cols: 1, spacing: theme.spacing.xl * 1.5 }]}
          cols={3}
          className={cx("container", classes.grid)}
        >
          {blogs.map(({ profiles: user, ...blog }) => (
            <LatestBlog key={blog.id} blog={blog} user={user} />
          ))}
        </SimpleGrid>
      </section>
    </>
  );
}
