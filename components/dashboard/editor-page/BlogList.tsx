import { Title, SimpleGrid } from "@mantine/core";
import { Blog } from "pages/dashboard/[id]/editor/[slug]";
import { BlogCard } from "./BlogCard";
import { CreateBlog } from "./CreateBlog";
import { SearchBlog } from "./SearchBlog";
import { useState } from "react";

interface PropTypes {
  blogs: Blog[];
}

export function BlogList({ blogs }: PropTypes) {
  const [blogList, setBlogList] = useState<Blog[]>(blogs);

  const deleteBlog = async (id: number) => {
    try {
      const res = await fetch("/api/create-blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        setBlogList((prev) => {
          return prev.filter((blog) => blog.id !== id);
        });
      } else {
        throw new Error("An error occureed");
      }
    } catch (error) {
      alert("An error ocurred");
    }
  };

  return (
    <>
      <div className="container">
        <Title mb={"xl"} order={1}>
          Your blogs
        </Title>
        <SearchBlog />
        <SimpleGrid cols={2}>
          <CreateBlog />
          {blogList.map((blog) => {
            return <BlogCard onDelete={deleteBlog} blog={blog} key={blog.id} />;
          })}
        </SimpleGrid>
      </div>
    </>
  );
}
