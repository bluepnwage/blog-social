import { Blog as BlogProps, BlogJoin, CommentsJoin, User } from "@interfaces/supabase";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { BlogAuthor, BlogImage, BlogTitle, BlogArticle } from "@components/blog-page";
import { GetStaticPaths, GetStaticProps } from "next";
import { Suspense, lazy, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const BlogStats = lazy(() => import("@components/blog-page/blog/BlogStats"));
const RelatedBlogs = lazy(() => import("@components/blog-page/relatedBlogs/RelatedList"));
const CommentsList = lazy(() => import("@components/blog-page/comments/CommentsList"));

interface PropTypes {
  blog: BlogProps;
  user: User;
  relatedBlogs: BlogProps[];
  comments: CommentsJoin[];
}

export default function Blog({ blog, user, relatedBlogs, comments }: PropTypes) {
  const [mount, setMount] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const toggleMount = () => {
      setMount(false);
      setTimeout(() => {
        setMount(true);
      }, 100);
    };
    router.events.on("routeChangeComplete", toggleMount);
    return () => {
      router.events.off("routeChangeComplete", toggleMount);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Blog Social | {blog.heading}</title>
        <meta name="description" content={blog.description} />
      </Head>
      <section className={"section-container"}>
        <Suspense fallback={null}>
          {mount && (
            <BlogAuthor
              readTime={blog.read_time}
              slug={blog.slug}
              blogID={blog.id}
              user={user}
              uploadDate={blog.created_at}
            />
          )}
          {!mount && (
            <BlogAuthor
              readTime={blog.read_time}
              slug={blog.slug}
              blogID={blog.id}
              user={user}
              uploadDate={blog.created_at}
            />
          )}
        </Suspense>
        <BlogTitle heading={blog.heading} />
        <BlogImage description={blog.description} image={blog.thumbnail} />
        <BlogArticle content={blog.content} />
        <Suspense fallback={null}>
          <BlogStats lastUpdate={blog.updated_at} slug={blog.slug} likes={blog.likes} />
        </Suspense>
      </section>
      <Suspense fallback={null}>
        <CommentsList blogID={blog.id} comments={comments} />
      </Suspense>
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

  const { data: comments } = await supabaseClient
    .from<CommentsJoin>("comments")
    .select("*, profiles(*)")
    .eq("blog_id", params.slug as string);

  const { profiles: user, ...blog } = data;
  const { data: relatedBlogs } = await supabaseClient
    .from<BlogProps>("blogs")
    .select("*")
    .neq("id", params.slug as string)
    .eq("published", true)
    .limit(5);

  return {
    props: {
      blog,
      user,
      relatedBlogs,
      comments
    }
  };
};
