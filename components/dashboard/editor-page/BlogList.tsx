import { Title, SimpleGrid } from "@mantine/core";
import { BlogCard } from "./BlogCard";
import { CreateBlog } from "./CreateBlog";
import { SearchBlog } from "./SearchBlog";
import { useState, useTransition } from "react";
import { Blog } from "@interfaces/supabase";
import { useStyles } from "./styles";

interface PropTypes {
  blogs: Blog[];
}

export function BlogList({ blogs }: PropTypes) {
  const [, startTransition] = useTransition();
  const [blogList, setBlogList] = useState(blogs);
  const [filter, setFilter] = useState("");
  const { classes } = useStyles();

  const deleteBlog = (id: number) => {
    startTransition(() => {
      setBlogList((prev) => prev.filter((blog) => blog.id !== id));
    });
  };

  const filterBlogs = () => {
    return blogList.filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase()));
  };

  const filteredBlogs = filter ? filterBlogs() : blogList;
  return (
    <>
      <div className="container">
        <Title mb={"xl"} order={1}>
          Your blogs
        </Title>
        <SearchBlog filter={filter} onFilter={setFilter} />
        <SimpleGrid className={classes.grid} cols={2}>
          <CreateBlog />
          {filteredBlogs.map((blog) => {
            return <BlogCard onDelete={deleteBlog} blog={blog} key={blog.id} />;
          })}
        </SimpleGrid>
      </div>
    </>
  );
}
