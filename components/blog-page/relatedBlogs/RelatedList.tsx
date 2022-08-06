import { Divider, Title } from "@mantine/core";
import { useStyles } from "./styles";
import { Blog } from "./Blog";
import { Blog as BlogProps } from "@interfaces/supabase";

interface PropTypes {
  blogs: BlogProps[];
}

export default function RelatedList({ blogs }: PropTypes) {
  const { classes, cx } = useStyles();
  return (
    <>
      <section className={cx("section-container", classes.sectionContainer)}>
        <header className={classes.container}>
          <Title mb={"xl"} order={2}>
            Related Blogs
          </Title>
        </header>
        {blogs.map((blog, key) => {
          const notLast = key !== blogs.length - 1;
          return (
            <Blog key={blog.id} blog={blog}>
              {notLast && <Divider className={classes.container} my={"xl"} />}
            </Blog>
          );
        })}
      </section>
    </>
  );
}
