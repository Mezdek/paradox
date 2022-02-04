import Head from "next/head";
import React, { useState, useEffect } from "react";
import style from "../styles/Home.module.css";
import Post from "../components/Post";
import CriteriaSet from "../components/CriteriaSet";
import axios from "axios";
import CreateButton from "../components/CreateButton";
import Publish from "../components/Publish";
import Avatar from "../components/Avatar";
import Logging from "../components/Logging";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [criteria, setCriteria] = useState("");
  const [user, setUser] = useState("putin");
  const [create, setCreate] = useState(true);
  const [post, setPost] = useState({});
  const [refresh, setRefresh] = useState(true);
  const [showLogIn, setShowLogIn] = useState(false);

  useEffect(() => {
    console.log(post);
    if (post) {
      axios
        .post("/api", post)
        .then((res) => {
          setRefresh(!refresh);
          setPost({});
        })
        .catch((err) => console.log(err));
    }
  }, [post]);

  useEffect(() => {
    axios
      .get("/api" + criteria)
      .then((data) => {
        data.data.length > 0 ? setPosts(data.data) : setPosts([]);
      })
      .catch((err) => {
        if (err.response.status === 404) setPosts([]);
        console.log({
          error: err,
        });
      });
  }, [criteria, refresh]);

  return (
    <div className={style.container}>
      <Head>
        <title>Paradox</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Avatar user={user} setUser={setUser} setShowLogIn={setShowLogIn}/>
      <h1 className={style.title}> Paradox! is it real?</h1>
      <section className={style.upperSection}>
        <CreateButton user={user} setCreate={setCreate} />
        <CriteriaSet criteria={criteria} setCriteria={setCriteria} />
        <Logging showLogIn={showLogIn} setShowLogIn={setShowLogIn} />
        <Publish
          user={user}
          create={create}
          setCreate={setCreate}
          setPost={setPost}
        />
      </section>
      <section className={style.lowerSection}>
        {posts.length > 0 ? (
          posts.map((post, id) => <Post {...post} key={id} />)
        ) : (
          <Post />
        )}
      </section>
    </div>
  );
}
