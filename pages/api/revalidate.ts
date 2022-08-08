import { withApiAuth } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      Promise.all([
        await res.revalidate("/"),
        await res.revalidate("/blogs"),
        await res.revalidate(`/blogs/${req.body.id}`)
      ]);
      res.status(200).json({ message: "Revalidated" });
    } else {
      res.status(400).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: `An error ocurred on the server: ${error.message}` });
  }
};

export default withApiAuth(handler);
