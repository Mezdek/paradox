import Auth from "../../API/modules/auth";
import User from "../../API/modules/user";

export default function login(req, res) {
  const { username, password } = req.body;
  const auth = new Auth(username, password);
  const user = new User(username, password);
  switch (req.method) {
    case "POST":
      user
        .findUser()
        .then(([response]) => {
          if (response.length === 0) {
            return Promise.reject("NO_USER");
          }
          return auth
            .verify(response[0].password)
            .then((result) => {
              if (!result) {
                return Promise.reject("INVALID_PASSWORD");
              }
              return auth.generateJWT();
            })
            .then((token) => {
              auth.setCookie(res, token);
              res.status(200).json({ message: "LOGIN SUCCESSFUL" });
            });
        })
        .catch((err) => {
          console.error(err.message);
          if (err === "NO_USER") {
            res.status(404).json({ message: "USER DOES'T EXIST" });
          } else if (err === "INVALID_PASSWORD") {
            res.status(401).json({ message: "PASSWORD IS INCORRECT" });
          } else {
            res.status(500).json({ message: "VERIFICATION ERROR" });
          }
        });
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
