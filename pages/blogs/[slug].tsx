import { Blog as BlogProps, BlogJoin, User } from "@interfaces/supabase";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { BlogAuthor, BlogImage, BlogTitle, BlogArticle } from "@components/blog-page";
import { GetStaticPaths, GetStaticProps } from "next";
import { Suspense, lazy } from "react";

const BlogStats = lazy(() => import("@components/blog-page/blog/BlogStats"));
const RelatedBlogs = lazy(() => import("@components/blog-page/relatedBlogs/RelatedList"));

interface PropTypes {
  blog: BlogProps;
  user: User;
  relatedBlogs: BlogProps[];
}

export default function Blog({ blog, user, relatedBlogs }: PropTypes) {
  return (
    <>
      <section className={"section-container"}>
        <Suspense fallback={null}>
          <BlogAuthor slug={blog.slug} blogID={blog.id} user={user} uploadDate={blog.created_at} />
        </Suspense>
        <BlogTitle heading={blog.heading} />
        <BlogImage description={blog.description} image={blog.thumbnail} />
        <BlogArticle content={blog.content} />
        <Suspense fallback={null}>
          <BlogStats slug={blog.slug} likes={blog.likes} />
        </Suspense>
      </section>
      <Suspense fallback={null}>
        <RelatedBlogs blogs={relatedBlogs} />
      </Suspense>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabaseClient.from<BlogProps>("blogs").select("id").eq("published", true);
  const paths = data.map((blog) => {
    return {
      params: { slug: blog.id.toString() }
    };
  });
  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await supabaseClient
    .from<BlogJoin>("blogs")
    .select(`*, profiles (*)`)
    .eq("id", params.slug as string)
    .single();

  const { profiles: user, ...blog } = data;
  const { data: relatedBlogs } = await supabaseClient
    .from<BlogProps>("blogs")
    .select("*")
    .neq("id", params.slug as string)
    .limit(5);

  return {
    props: {
      blog,
      user,
      relatedBlogs
    }
  };
};
