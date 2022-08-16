import { Blog } from "@interfaces/supabase";
import { withApiAuth, supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";

const development = process.env.NODE_ENV === "development";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "PUT") {
      const { id, published } = req.body;
      const { error } = await supabaseServerClient({ req, res })
        .from<Blog>("blogs")
        .update({ published }, { returning: "minimal" })
        .eq("id", id);

      if (error) throw new Error(error.message);
      if (!development) {
        await Promise.all([res.revalidate("/"), res.revalidate("/blogs"), res.revalidate(`/blogs/${id}`)]);
      }

      res.json({ message: published ? "Blog published" : "Blog unpublished" });
    } else if (req.method === "POST") {
      const { id } = req.body;
      if (!development) {
        await Promise.all([res.revalidate("/"), res.revalidate("/blogs"), res.revalidate(`/blogs/${id}`)]);
      }
      res.status(200).json({ message: "Blog Published" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default withApiAuth(handler);
