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
      console.error("Error!", e);
    }
  };

  useEffect(() => {
    fetchPosts();
    handleMessageSubmit();
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
          content: `${content}`,
        },
      }),
    });
    const data = await resp.json();
    console.log(data);
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
            {token && !post.isAuthor && (
              <button
                className="btn btn-link "
                onClick={() => setShowMessageForm(!showMessageForm)}
              >
                Message Seller
              </button>
            )}
            {showMessageForm && (
              <div>
                <form>
                  <input
                    className="form-control mt-3 ms-2"
                    placeholder="enter message"
                    onChange={(event) => setContent(event.target.value)}
                  ></input>
                  <button
                    className="btn btn-primary mt-3 ms-2"
                    onClick={() => handleMessageSubmit(post._id)}
                  >
                    Send
                  </button>
                </form>
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
