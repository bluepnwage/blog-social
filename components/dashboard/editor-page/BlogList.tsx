import { Title, SimpleGrid } from "@mantine/core";
import { BlogCard } from "./BlogCard";
import { CreateBlog } from "./CreateBlog";
import { SearchBlog } from "./SearchBlog";

export function BlogList() {
  const blogs = Array(7).fill(null);
  return (
    <>
      <div className="container">
        <Title mb={"xl"} order={1}>
          Your blogs
        </Title>
        <SearchBlog />
        <SimpleGrid cols={2}>
          <CreateBlog />
          {blogs.map((_, key) => {
            return <BlogCard key={key} />;
          })}
        </SimpleGrid>
      </div>
    </>
  );
}
