import Auth from "../../API/modules/auth";
export default function register(req, res) {
  const { username, password } = req.body;
  const auth = new Auth(username, password);
  switch (req.method) {
    case "POST":
      auth
        .findUser()
        .then(([response]) => {
          if (response.length > 0) {
            return Promise.reject("USER_EXISTS");
          }
          return auth.createUser();
        })
        .then(() =>
          res.status(201).json({ message: "USER CREATED SUCCESSFULLY" })
        )
        .catch((err) => {
          console.error(err);
          if (err === "USER_EXISTS") {
            res.status(409).json({ message: "USER ALREADY EXISTS" });
          } else {
            res.status(500).json({ message: "ERROR CREATING USER" });
          }
        });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
