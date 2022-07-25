import { Filters, BlogList } from "components/blogs";

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
