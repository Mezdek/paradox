import Auth from "../../API/modules/auth";

export default function login(req, res) {
  const { username, password } = req.body;
  const auth = new Auth(username, password);
  // const myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Accept", "application/json");
  // myHeaders.append("withCredentials", "true");
  switch (req.method) {
    case "POST":
      auth
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
              res.setHeader("Set-Cookie", `_paradox_token=${token}`);
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
