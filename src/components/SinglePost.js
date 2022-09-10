import { useState } from "react";

const SinglePost = ({post, token, baseUrl, handleDelete, }) => {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [content, setContent] = useState("");

  const handleMessageSubmit = async (postID) => {
    try {
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
      await resp.json();
      setContent("");
    } catch (e) {
      console.error("Error", e);
    }
  };
  return (
    <>
      <div className="card m-3" key={post._id}>
        <div className="card-body">
          <h4 className="card-title">{post.title}</h4>
          <p className="card-text">{post.description}</p>
          <p className="card-text">
            <strong>Price: </strong>
            {post.price}
          </p>
          <p className="card-text">
            <strong>Location: </strong>
            {post.location !== "[On Request]" ? post.location : "On Request"}
          </p>
          <p className="card-text">
            <strong>User: </strong>
            {post.author.username}
          </p>
          <p className="card-text">
            <strong>Will Deliver: </strong>
            {post.willDeliver ? "Yes" : "No"}
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
              <textarea
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
    </>
  );
};

export default SinglePost;
