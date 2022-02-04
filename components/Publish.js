import React, { useState } from "react";
import style from "../styles/Publish.module.css";

export default function Publish({ user, create, setCreate, setPost }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setPost({ wr_author: user, wr_subject: subject, body: body });
    setCreate(true);
  };
  return (
    <div className={style.main_container} style={{ display: create && "none" }}>
      <div className={style.container}>
        <h2 className={style.title}>Publish a paradox</h2>
        <form
          className={style.form}
          id="paradox_form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className={style.input}
            type="text"
            placeholder="Subject"
            id="subject"
            maxLength="40"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          <textarea
            className={style.textarea}
            autoFocus
            placeholder="What is it?"
            name="paradoxial"
            dirname="paradoxial.dir"
            form="paradox_form"
            maxLength="400"
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></textarea>
          <div className={style.buttons}>
            <input type="submit" value="PUBLISH" className={style.button} />
            <input type="reset" value="CLEAR" className={style.button} />
          </div>
        </form>
      </div>
    </div>
  );
}
