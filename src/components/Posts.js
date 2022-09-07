import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const baseUrl = "https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt";

const Posts = ({ posts, setPosts, token }) => {
  const [searchValue, setSearchValue] = useState("");

  const postMatches = (post) => {
    const textToCheck = (
      post.title +
      post.location +
      post.description +
      post.author.username +
      post.price
    ).toLowerCase();
    return textToCheck.includes(searchValue.toLowerCase());
  };

  const filteredPosts = posts.filter((post) => {
    return postMatches(post);
  });

  const fetchPosts = async () => {
    try {
      const resp = await fetch(baseUrl + "/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await resp.json();
      setPosts(data.data.posts);
    } catch (e) {
      console.error("Error!", e);
    }
  };

  console.log(posts)

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const handleDelete = async (postID) => {
    try {
      const resp = await fetch(baseUrl + `/posts/${postID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await resp.json();
      if (data) {
        const newPosts = posts.filter((p) => {
          return p._id !== postID;
        });
        setPosts(newPosts);
      }
    } catch (e) {
      console.error("Error", e);
    }
  };

  return (
    <div>
      <div className="m-3">
        {token ? (
          <Link to="/NewPost">Create A New Listing Here</Link>
        ) : (
          <div className="alert alert-primary text-center" role="alert">
            <Link to="/">Login</Link>&nbsp;to create new listings, and message
            sellers!
          </div>
        )}
      </div>

      <div className="col-sm-4 ms-3">
        <input
          className="form-control"
          placeholder="search posts"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>

      {filteredPosts.map((post) => (
        <div className="card m-3" key={post._id}>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.description}</p>
            <p className="card-text">Price: {post.price}</p>
            <p className="card-text">Location: {post.location}</p>
            <p className="card-text">
              Will Deliver: {post.willDeliver ? "Yes" : "No"}
            </p>
            {token && !post.isAuthor ? (
              <Link to="/Messages" className="btn btn-primary">
                Message Seller
              </Link>
            ) : null}

            {post.isAuthor ? (
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
