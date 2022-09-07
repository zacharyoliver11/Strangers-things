import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const baseUrl = "https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt";

const Posts = ({ posts, setPosts, token }) => {
  const [searchValue, setSearchValue] = useState("");

  const fetchPosts = async () => {
    try {
      const resp = await fetch(baseUrl + "/posts");
      const result = await resp.json();
      setPosts(result.data.posts);
    } catch (e) {
      console.error("Error!", e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(token);

  return (
    <div>
      <div className="m-3">
        <Link to="/NewPost">Create New Listing Here</Link>
      </div>

      <input
        type="text"
        placeholder="search posts"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />

      {posts.map((post) => (
        <div className="card m-3" key={post._id}>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.description}</p>
            <p className="card-text">Price: {post.price}</p>
            <p className="card-text">Location: {post.location}</p>
            <p className="card-text">
              Will Deliver: {post.willDeliver ? "Yes" : "No"}
            </p>
            <a href="#" className="btn btn-primary">
              Message Seller
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
