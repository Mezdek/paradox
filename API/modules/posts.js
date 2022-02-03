const connection = require("./db-config");
const db = connection.promise();

class Posts {
  constructor(author, subject, order, body, desc) {
    this.author = author;
    this.subject = subject;
    this.order = order;
    this.body = body;
    this.desc = desc;
  }
  getById(id) {
    return db
      .query("SELECT author, subject, body, date FROM posts WHERE id = ?", [id])
      .then(([rows]) => {
        return rows[0];
      });
  }
  read() {
    try {
      let sql = `SELECT author, subject, body, date FROM posts`;
      let values = [];
      if (this.author || this.subject) sql += " WHERE";
      if (this.author) {
        sql += ` author = ?`;
        values.push(this.author);
      }
      if (this.author && this.subject) sql += " AND";
      if (this.subject) {
        sql += ` subject = ?`;
        values.push(this.subject);
      }
      let orderdByDate = true;
      if (this.order) {
        sql += ` ORDER BY`;
        switch (this.order) {
          case "author":
            {
              sql += " author";
              orderdByDate = false;
            }
            break;
          case "subject":
            {
              sql += " subject";
              orderdByDate = false;
            }
            break;
          default:
            sql += " date";
        }
      } else {
        sql += " ORDER BY date";
      }
      if (orderdByDate ^ (this.desc === "1")) sql += " DESC";

      return db.query(sql, values).then(([rows]) => {
        if (rows.length > 0) return rows;
        else return Promise.reject("NO_POSTS");
      });
    } catch (error) {
      console.log("Error: ", error);
      return Promise.reject("ERROR", error);
    }
  }

  write(wr_author, wr_subject, body) {
    try {
      return db
        .query(`INSERT INTO posts (author, subject, body) VALUES (?, ?, ?)`, [
          wr_author,
          wr_subject,
          body,
        ])
        .then(([rows]) => this.getById(rows.insertId));
    } catch (error) {
      console.log("Error: ", error);
      return Promise.reject("ERROR", error);
    }
  }
}

module.exports = Posts;
