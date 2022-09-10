import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Profile = ({ handleDelete, posts, token, baseUrl, username }) => {
  const myPosts = posts.filter((post) => post.isAuthor);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const resp = await fetch(baseUrl + "/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await resp.json();
      setMessages(data.data.messages);
    } catch (e) {
      console.error("Error", e);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [token]);

  return (
    <div>
      {token ? (
        <div>
          <div>
            <h1 className="m-3">Your Posts</h1>
            {myPosts.map((post) => (
              <div className="card m-3 mt-0" key={post._id}>
                <div className="card-body">
                  <h4 className="card-title">{post.title}</h4>
                  <p className="card-text">{post.description}</p>
                  <p className="card-text"><strong>Price: </strong>{post.price}</p>
                  <p className="card-text"><strong>Location: </strong>{post.location}</p>
                  <p className="card-text">
                    <strong>Will Deliver: </strong>{post.willDeliver ? "Yes" : "No"}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h1 className="m-3 mt-0">Messages</h1>
            {messages.map(
              (message) =>
                message.fromUser.username !== username && (
                  <div className="card m-3 mt-0" key={message._id}>
                    <div className="card-body">
                      <h4 className="card-title">
                        {message.post.title}
                      </h4>
                      <p className="card-text mt-3"><strong>Message: </strong>{message.content}</p>
                      <p className="card-text">
                        <strong>From:</strong> {message.fromUser.username}
                      </p>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      ) : (
        <div className="alert alert-primary text-center m-3" role="alert">
          <Link to="/">Login</Link>&nbsp;to view your listings and messages!
        </div>
      )}
    </div>
  );
};

export default Profile;
