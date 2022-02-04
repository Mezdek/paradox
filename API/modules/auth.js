const connection = require("./db-config");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const db = connection.promise();

const secret = "p_a.r.a.d.o.X.i_S|n.o.T|r_e.a.L";
const key = "_paradox_token";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

class Auth {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  findUser() {
    return db.query("SELECT user, password FROM users WHERE user = ?", [
      this.username,
    ]);
  }
  createUser() {
    this.hash()
      .then((hashed) => {
        return db.query("INSERT INTO users (user, password) VALUES (?, ?)", [
          this.username,
          hashed,
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  verify(hashed) {
    return argon2.verify(hashed, this.password, hashingOptions);
  }
  hash() {
    return argon2.hash(this.password, hashingOptions);
  }

  generateJWT() {
    return jwt.sign({ user: this.username }, secret);
  }
  decodeJWT(token) {
    return jwt.verify(token, secret);
  }
  setCookie(res, token) {
    res.setHeader("Set-Cookie", `${key}=${token}`);
  }
  getCookie = (cookie) => {
    const token = cookie.split(";").find((c) => c.includes(key));
    return token ? token.split("=")[1] : undefined;
  };
}

module.exports = Auth;
