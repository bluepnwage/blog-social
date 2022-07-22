import { Title, Pagination } from "@mantine/core";
import { useState, useEffect } from "react";
import { useStyles } from "./styles";
import { FeaturedBlog } from "./FeaturedBlog";

export function FeaturedList() {
  const { classes, cx } = useStyles();
  const [activePage, setActivePage] = useState(1);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     togglePage();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

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
        <FeaturedBlog />
        <div>
          <Pagination radius={"xl"} withControls={false} mt={48} onChange={togglePage} page={activePage} total={3} />
        </div>
      </section>
    </>
  );
}
