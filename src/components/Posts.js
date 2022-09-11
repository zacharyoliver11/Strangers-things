import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SinglePost from "./SinglePost";

const Posts = ({ posts, setPosts, token, handleDelete, baseUrl }) => {
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
      console.error("Error", e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

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
        <SinglePost
          key={post._id}
          baseUrl={baseUrl}
          post={post}
          token={token}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Posts;
