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

  return (
    <div>
      {/* {
        <div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          You should check in on some of those fields below.
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      } */}
      <div className="m-3">
        {token ? (
          <Link to="/NewPost">Create New Listing Here</Link>
        ) : (
          <Link to="/Login">
            Login to create new listings, and message sellers!
          </Link>
        )}
      </div>

      <input
        className="m-3"
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
            {token ? (
              <Link to="/Messages" className="btn btn-primary">
                Message Seller
              </Link>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
