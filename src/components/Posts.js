import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = ({ posts, setPosts, token, handleDelete, baseUrl }) => {
  const [searchValue, setSearchValue] = useState("");
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [content, setContent] = useState("");

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

  const handleMessageSubmit = async (postID) => {
    const resp = await fetch(baseUrl + `/posts/${postID}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content: content,
        },
      }),
    });
    const data = await resp.json();
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
            <h4 className="card-title">{post.title}</h4>
            <p className="card-text">{post.description}</p>
            <p className="card-text"><strong>Price: </strong>{post.price}</p>
            <p className="card-text"><strong>Location: </strong>{post.location}</p>
            <p className="card-text"><strong>User: </strong>{post.author.username}</p>
            <p className="card-text">
              <strong>Will Deliver: </strong>{post.willDeliver ? "Yes" : "No"}
            </p>
            {token && !post.isAuthor && (
              <button
                className="btn btn-primary text-left"
                onClick={() => setShowMessageForm(!showMessageForm)}
              >
                Message Seller
              </button>
            )}
            {showMessageForm && (
              <div className="input-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter message"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={(event) => {
                    event.preventDefault();
                    handleMessageSubmit(post._id);
                  }}
                >
                  Send
                </button>
              </div>
            )}

            {post.isAuthor && (
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
