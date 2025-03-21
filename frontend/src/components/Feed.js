import { useEffect, useState } from "react";
import { getFeed } from "../api";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getFeed().then(setPosts);
    }, 5000); // Fetch new posts every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h2>Live Feed</h2>
      {posts.map((post) => (
        <div key={post.id} className="card my-2">
          <div className="card-body">
            <h5>{post.title}</h5>
            <p>{post.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
