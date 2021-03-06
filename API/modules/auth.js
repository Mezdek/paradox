const connection = require("./db-config");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

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
    res.setHeader("Set-Cookie", `${key}=${token}; path=/;`);
  }
  getUser = (cookie) => {
    const token = cookie.split(";").find((c) => c.includes(key));
    token ? this.decodeJWT(token.split("=")[1]).user : null;
  };
}
module.exports = Auth;
