import { Title, Divider, createStyles, Select } from "@mantine/core";
import { Filters } from "components/blogs/filters/Filters";
import { BlogList } from "components/blogs/blogList/BlogList";
export default function Blogs() {
  return (
    <>
      <section className={"section-container"}>
        <Filters />
        <BlogList />
      </section>
    </>
  );
}
