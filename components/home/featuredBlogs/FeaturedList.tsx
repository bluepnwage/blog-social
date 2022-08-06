import { Title } from "@mantine/core";
import { useRef, memo } from "react";
import { useStyles } from "./styles";
import { FeaturedBlog } from "./FeaturedBlog";
import { BlogJoin } from "@interfaces/supabase";
import { Carousel } from "@mantine/carousel";
import AutoPlay from "embla-carousel-autoplay";

interface PropTypes {
  blogs: BlogJoin[];
}

function FeaturedList({ blogs }: PropTypes) {
  const autoplay = useRef(AutoPlay({ delay: 3500 }));
  const { classes, cx } = useStyles();

  const closeModal = () => {
    autoplay.current.play();
  };

  return (
    <>
      <section className={cx("section-container", classes.container)}>
        <header>
          <Title order={2} mb={44}>
            Most Popular Blogs
          </Title>
        </header>
        <Carousel
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          sx={{ width: "80%" }}
          height={300}
          loop
          withControls={false}
          withIndicators
        >
          {blogs.map(({ profiles: user, ...blog }) => {
            return (
              <Carousel.Slide key={blog.id}>
                <FeaturedBlog onClose={closeModal} user={user} blog={blog} />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </section>
    </>
  );
}

export default memo(FeaturedList);
