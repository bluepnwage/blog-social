import { withApiAuth, supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";
import bluepnwage from "../../public/bluepnwage.jpg";

const handler: NextApiHandler = async (req, res) => {
  console.log(req.body);
  const { data, error } = await supabaseServerClient({ req, res })
    .storage.from("img")
    .upload("thumbnail/bluepnwage.jpg", bluepnwage.src);
  console.log(data);
  console.log(error);
  res.status(200).json({ message: "hello there" });
};

export default withApiAuth(handler);
