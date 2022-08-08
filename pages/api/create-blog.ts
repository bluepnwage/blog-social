import { NextApiHandler } from "next";
import { withApiAuth, supabaseServerClient, getUser } from "@supabase/auth-helpers-nextjs";
import { Blog } from "@interfaces/supabase";

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "POST": {
        const { title } = req.body;
        const { user } = await getUser({ req, res });
        const test = await supabaseServerClient({ req, res })
          .from<Blog>("blogs")
          .insert([{ title, author_id: user.id }]);
        return res.status(201).json({ id: test.body[0].id });
      }
      case "PUT": {
        const body = req.body;
        const { id, ...blog } = JSON.parse(body);

        const { data, error } = await supabaseServerClient({ req, res })
          .from<Blog>("blogs")
          .update({ ...blog, updated_at: new Date() })
          .match({ id });
        if (error) throw new Error(error.message);
        if (blog.published) {
          await Promise.all([res.revalidate("/"), res.revalidate("/blogs"), res.revalidate(`/blogs/${id}`)]);
        }
        return res.status(201).json({ updated: "updated", data });
      }
      case "DELETE": {
        const { id } = req.body;
        const { data, error } = await supabaseServerClient({ req, res }).from<Blog>("blogs").delete().match({ id });
        if (error) throw new Error(error.message);
        await Promise.all([res.revalidate("/"), res.revalidate("/blogs"), res.revalidate(`/blogs/${id}`)]);
        return res.status(200).json({ message: "Deleted", data });
      }
      default: {
        return res.status(400).json({ method: "NOt allowed" });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "an error ocurred on the server" });
  }
};
export default withApiAuth(handler);
