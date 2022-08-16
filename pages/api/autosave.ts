import { Blog } from "@interfaces/supabase";
import { supabaseServerClient, withApiAuth } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "PUT") {
      const { id, content } = req.body;
      const { error } = await supabaseServerClient({ req, res })
        .from<Blog>("blogs")
        .update({ content }, { returning: "minimal" })
        .eq("id", id);
      if (error) throw new Error(error.message);
      res.status(200).json({ message: "Blog saved" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error ocurred on the server", errorMessage: error.message });
  }
};

export default withApiAuth(handler);
