import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body.user)
    res.status(201).json({message: 'Sign in successful'})
}