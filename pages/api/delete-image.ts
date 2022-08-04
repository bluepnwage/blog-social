import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { NextApiResponse, NextApiRequest } from "next";
import { withApiAuth } from "@supabase/auth-helpers-nextjs";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "DELETE") {
      const url = req.body.url as string;
      const [file, folder] = url.split("/").reverse();
      const { name: fileName } = path.parse(file);
      const public_id = `${folder}/${fileName}`;
      await cloudinary.uploader.destroy(public_id);
      console.log(public_id);
      return res.status(200).json({ message: "Deleted" });
    } else {
      res.status(401).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error ocurred on the server" });
  }
}

export default withApiAuth(handler);
