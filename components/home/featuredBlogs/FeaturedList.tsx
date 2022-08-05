import { Title, Pagination } from "@mantine/core";
import { useState } from "react";
import { useStyles } from "./styles";
import { FeaturedBlog } from "./FeaturedBlog";
import { BlogJoin } from "@interfaces/supabase";

interface PropTypes {
  blogs: BlogJoin[];
}

export function FeaturedList({ blogs }: PropTypes) {
  const { classes, cx } = useStyles();
  const [activePage, setActivePage] = useState(1);

  const togglePage = (num?: number) => {
    if (num) return setActivePage(num);
    setActivePage((prev) => (prev === 3 ? 1 : prev + 1));
  };

  return (
    <>
      <section className={cx("section-container", classes.container)}>
        <header>
          <Title order={2} mb={44}>
            Most Popular Blogs
          </Title>
        </header>
        {blogs.map(({ profiles: user, ...blog }) => {
          return <FeaturedBlog user={user} blog={blog} key={blog.id} />;
        })}
        <div>
          <Pagination radius={"xl"} withControls={false} mt={48} onChange={togglePage} page={activePage} total={3} />
        </div>
      </section>
    </>
  );
}
