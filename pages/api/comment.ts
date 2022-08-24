import { Comment } from "@interfaces/supabase";
import { withApiAuth, getUser, supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const user = await getUser({ req, res });
    if (req.method === "POST") {
      const { comment, id } = req.body;

      const { error } = await supabaseServerClient({ req, res })
        .from<Comment>("comments")
        .insert([{ content: comment, user_id: user.user.id, blog_id: id, replies: [] }], {
          returning: "minimal"
        });
      if (error) throw new Error(error.message);

      res.status(201).json({ message: "Comment created" });
    } else if (req.method === "DELETE") {
      const { id } = req.body;

      const { error, data } = await supabaseServerClient({ req, res })
        .from<Comment>("comments")
        .delete()
        .eq("id", id)
        .eq("user_id", user.user.id);
      if (error) throw new Error(error.message);

      //Delete all replies for the deleted comment
      const [comment] = data;

      const { error: deleteError } = await supabaseServerClient({ req, res })
        .from<Comment>("comments")
        .delete({ returning: "minimal" })
        .eq("id", comment.replies);

      if (deleteError) throw new Error(deleteError.message);
      res.status(200).json({ message: "Comment deleted" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default withApiAuth(handler);
