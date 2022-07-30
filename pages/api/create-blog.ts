import { NextApiHandler } from "next";
import { withApiAuth, supabaseServerClient, getUser } from "@supabase/auth-helpers-nextjs";
import { Blog } from "pages/dashboard/[id]/editor/[slug]";

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "POST": {
        const { title } = req.body;
        const { user } = await getUser({ req, res });
        const test = await supabaseServerClient({ req, res })
          .from("blogs")
          .insert([{ title, author_id: user.id }]);
        console.log(test);
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
        console.log(data);
        return res.status(201).json({ updated: "updated", data });
      }
      case "DELETE": {
        const { id } = req.body;
        const { data, error } = await supabaseServerClient({ req, res }).from("blogs").delete().match({ id });
        console.log(id);
        if (error) throw new Error(error.message);
        console.log("Deleted succesfully", data);
        return res.status(200).json({ message: "Deleted", data });
      }
      default: {
        return res.status(400).json({ method: "NOt allowed" });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "an error ocurred on the server" });
  }
};
export default withApiAuth(handler);
