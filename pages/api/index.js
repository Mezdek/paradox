// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const Posts = require("../../API/modules/posts");

export default function handler(req, res) {
  const { author, subject, order, desc } = req.query;
  const { wr_author, wr_subject, body } = req.body;
  const posts = new Posts(author, subject, order, desc);
  switch (req.method) {
    case "GET":
      posts
        .read()
        .then((data) => res.json(data))
        .catch((err) => {
          if (err === "NO_POSTS") res.status(204).end();
          res.status(404);
        });
      break;
    case "POST":
      posts
        .write(wr_author, wr_subject, body)
        .then((data) => res.status(201).json(data))
        .catch((err) => res.status(400));
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
