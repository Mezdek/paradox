import React, { useEffect, useState } from "react";
import style from "../styles/CriteriaSet.module.css";

// import jwt from "jsonwebtoken";

// const secret = "p_a.r.a.d.o.X.i_S|n.o.T|r_e.a.L";
// const key = "_paradox_token";
// let token = "";

// const getCookie = (cookie) => {
//   const token = cookie.split(";").find((c) => c.includes(key));
//   return token ? token.split("=")[1] : undefined;
// };

// const decodeJWT = (token) => {
//   return jwt.verify(token, secret);
// };

export default function CreateButton({ user , setCreate }) {
  // useEffect(() => {
  //   token = getCookie(document.cookie);
  //   if (token) setUser(decodeJWT(token).user);
  //   else console.log("no token");
  // }, []);
  const handleClick = (e) => {
    e.preventDefault();
    if (user) setCreate(false);
    else window.alert("Please login first");
  };
  return (
    <div
      className={style.button}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      Add
    </div>
  );
}
