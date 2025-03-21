import { useEffect, useState } from "react";
import { getTrendingPosts } from "../api";

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getTrendingPosts().then(setPosts);
  }, []);

  return (
    <div className="container">
      <h2>Trending Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="card my-2">
          <div className="card-body">
            <h5>{post.title}</h5>
            <p>{post.body}</p>
            <small>{post.commentCount} comments</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingPosts;
