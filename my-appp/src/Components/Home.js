import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("https://dummyjson.com/posts");
      console.log(res.data.posts);
      setPosts(res.data.posts);
    }
    fetchData();
  }, []);

  let next = 15;
  useEffect(() => {
    async function NextData() {
      next = next + 10;
      const res = await axios.get(
        `https://dummyjson.com/posts?limit=10&skip=${next}`
      );
      console.log(res.data.posts);
      setPosts(res.data.posts);
    }
    NextData();
  }, []);

  let previous = 10;
  useEffect(() => {
    async function PreviousData() {
      next = next - 10;
      const res = await axios.get(
        `https://dummyjson.com/posts?limit=10&skip=${next}`
      );
      console.log(res.data.posts);
      setPosts(res.data.posts);
    }
    PreviousData();
  }, []);

  return (
    <div>
      <h1>Data for posts</h1>

      <div className="home">
        {posts.map((post) => (
          <Card
            id={post.id}
            title={post.title}
            body={post.body}
            userId={post.userId}
          />
        ))}
      </div>

      <button className="button" onClick={previous}>
        Previous
      </button>
      <button className="button">Next</button>
    </div>
  );
};

export default Home;
