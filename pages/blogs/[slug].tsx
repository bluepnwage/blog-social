import { BlogAuthor, BlogImage, BlogTitle, BlogArticle } from "components/blog-page";
import { Suspense, lazy } from "react";

const BlogStats = lazy(() => import("components/blog-page/blog/BlogStats"));

export default function Blog() {
  return (
    <>
      <section className={"section-container"}>
        <Suspense fallback={null}>
          <BlogAuthor />
        </Suspense>
        <BlogTitle />
        <BlogImage />
        <BlogArticle />
        <Suspense fallback={null}>
          <BlogStats />
        </Suspense>
      </section>
    </>
  );
}
