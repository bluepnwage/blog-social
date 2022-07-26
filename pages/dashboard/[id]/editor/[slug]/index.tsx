import dynamic from "next/dynamic";
import { Layout } from "@components/dashboard";
import { EditorLoading } from "@components/dashboard/blogEditor-page/EditorLoading";

const EditorContainer = dynamic(() => import("@components/dashboard/blogEditor-page/EditorContainer"), {
  ssr: false,
  loading: () => <EditorLoading />
});

export default function BlogProject() {
  return (
    <>
      <Layout>
        <EditorContainer />
      </Layout>
    </>
  );
}
