import React from "react";

import style from "../styles/Post.module.css";
const sqlDateTimeToText = (datetime) =>
  `${datetime.split("T")[0]} ${datetime.split("T")[1].slice(0, -5)}`;
export default function Post({ author, subject, body, date }) {
  return (
    <div className={style.container}>
      <h2 className={style.title}>{subject && subject}</h2>
      <div className={style.info_container}>
        <h5 className={style.author}>{author && author}</h5>
        <p className={style.time}>
          {date && `published on ${sqlDateTimeToText(date)}`}{" "}
        </p>
      </div>
      <p className={style.body}>{body || "No Posts Found!"}</p>
    </div>
  );
}
