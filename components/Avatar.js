/* eslint-disable @next/next/no-img-element */
import React from "react";
import style from "../styles/Avatar.module.css";

const NotLogged = ({ setShowLogIn }) => {
  return (
    <div className={style.loggedIn}>
      <p
        className={style.button}
        onClick={() => {
          setShowLogIn(true);
        }}
      >
        Click here to sign in or sign up
      </p>
    </div>
  );
};

const LoggedIn = ({ user, setUser }) => {
  return (
    <div className={style.loggedIn}>
      <p className={style.name}>{user}</p>
      <img
        src="http://dummyimage.com/50/orange"
        alt="user_pic"
        className={style.image}
      />
      <p
        className={style.button}
        onClick={() => {
          setUser(null);
        }}
      >
        Log Out
      </p>
    </div>
  );
};

export default function Avatar({
  user,
  setUser,
  setShowLogIn = { setShowLogIn },
}) {
  return user ? (
    <LoggedIn user={user} setUser={setUser} />
  ) : (
    <NotLogged setShowLogIn={setShowLogIn} />
  );
}
