import { Comment } from "@interfaces/supabase";
import { withApiAuth, supabaseServerClient, getUser } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const user = await getUser({ req, res });
    if (req.method === "POST") {
      const { commentID, blogID, comment } = req.body;

      //Insert reply into database
      const { data: replies, error: replyError } = await supabaseServerClient({ req, res })
        .from<Comment>("comments")
        .insert([{ blog_id: blogID, content: comment, is_reply: true, replies: [], user_id: user.user.id }]);
      if (replyError) throw new Error(replyError.message);

      const [reply] = replies;

      //Select comment that the user just replied to from the database
      const { error, data } = await supabaseServerClient({ req, res })
        .from<Comment>("comments")
        .select("*")
        .eq("id", commentID)
        .single();
      if (error) throw new Error(error.message);

      //Add the reply to the list of replies for the selected comment
      const { error: updateError } = await supabaseServerClient({ req, res })
        .from<Comment>("comments")
        .update({ replies: [...data.replies, reply.id] })
        .eq("id", commentID);
      if (updateError) throw new Error(updateError.message);

      res.status(201).json({ message: "Reply created" });
    } else if (req.method === "DELETE") {
      const { commentID, replyID } = req.body;
      //Delete the reply from the database
      const { error: deleteError } = await supabaseServerClient({ req, res })
        .from<Comment>("comments")
        .delete({ returning: "minimal" })
        .eq("id", replyID);
      if (deleteError) throw new Error(deleteError.message);

      //Select the comment that the reply was associated with
      const { error, data } = await supabaseServerClient({ req, res })
        .from<Comment>("comments")
        .select("*")
        .eq("id", commentID)
        .single();
      if (error) throw new Error(error.message);

      //Filter out the id of the deleted reply and update the comment
      const { error: updateError } = await supabaseServerClient({ req, res })
        .from<Comment>("comments")
        .update({ replies: data.replies.filter((id) => id !== replyID) })
        .eq("id", commentID);

      if (updateError) throw new Error(updateError.message);
      res.status(200).json({ message: "Reply deleted" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default withApiAuth(handler);
