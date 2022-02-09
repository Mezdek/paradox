const connection = require("./db-config");
const argon2 = require("argon2");

const Auth = require("./auth");
const db = connection.promise();

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.auth = new Auth(username, password);
  }
  findUser() {
    return db.query("SELECT user, password FROM users WHERE user = ?", [
      this.username,
    ]);
  }
  createUser() {
    this.auth
      .hash()
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
}

module.exports = User;