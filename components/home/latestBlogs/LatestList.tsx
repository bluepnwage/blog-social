import { Title, SimpleGrid } from "@mantine/core";
import { useStyles } from "./styles";
import { LatestBlog } from "./LatestBlog";

export function LatestBlogs() {
  const { classes, cx } = useStyles();
  const blogs = Array(6).fill(null);
  return (
    <>
      <section className={cx("section-container", classes.sectionContainer)}>
        <header className="container">
          <Title order={1} mb={"lg"}>
            Latest blogs
          </Title>
        </header>
        <SimpleGrid breakpoints={[{ maxWidth: "sm", cols: 1 }]} cols={3} className={cx("container", classes.grid)}>
          {blogs.map((_, index) => (
            <LatestBlog key={index} />
          ))}
        </SimpleGrid>
      </section>
    </>
  );
}
