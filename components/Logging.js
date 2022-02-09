import React, { useState } from "react";
import axios from "axios";
import style from "../styles/Logging.module.css";
const jwt = require("jsonwebtoken");

const secret = "p_a.r.a.d.o.X.i_S|n.o.T|r_e.a.L";
const decodeJWT = (token) => {
  return jwt.verify(token, secret);
};

const getUser = (cookie) => {
  const token = cookie.split(";").find((c) => c.includes("_paradox_token"));
  return token ? decodeJWT(token.split("=")[1]).user : null;
};

export default function Logging({ showLogIn, setShowLogIn, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", { username, password })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Login Successful");
          setShowLogIn(false);
          setUser(getUser(document.cookie));
        }
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data.message);
      });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    axios.post("/api/register", { username, password }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div
      className={style.container_main}
      style={{ display: !showLogIn && "none" }}
    >
      <div className={style.container}>
        <span
          className={style.x}
          onClick={() => {
            setShowLogIn(false);
          }}
        >
          X
        </span>
        <h2>Logging</h2>
        <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
          <input
            className={style.input}
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className={style.input}
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className={style.buttons}>
            <input
              type="button"
              value="Sign In"
              onClick={(e) => handleSignIn(e)}
              className={style.button}
            />
            <input
              type="button"
              value="Sign Up"
              onClick={(e) => handleSignUp(e)}
              className={style.button}
            />
          </div>
          <p className={style.message}>{message}</p>
        </form>
      </div>
    </div>
  );
}
