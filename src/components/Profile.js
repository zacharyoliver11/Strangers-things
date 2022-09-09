import { Link } from "react-router-dom";

const Profile = ({ handleDelete, posts, token }) => {
  const myPosts = posts.filter((post) => post.isAuthor);

  return (
    <div>
      {token ? (
        <>
          <div>
            <h1 className="m-3">Your Posts</h1>
            {myPosts.map((post) => (
              <div className="card m-3 mt-0" key={post._id}>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <p className="card-text">Price: {post.price}</p>
                  <p className="card-text">Location: {post.location}</p>
                  <p className="card-text">
                    Will Deliver: {post.willDeliver ? "Yes" : "No"}
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
          </div>
        </>
      ) : (
        <div className="alert alert-primary text-center m-3" role="alert">
          <Link to="/">Login</Link>&nbsp;to view your listings and messages!
        </div>
      )}
    </div>
  );
};

export default Profile;
