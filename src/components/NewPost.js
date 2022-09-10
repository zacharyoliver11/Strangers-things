import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NewPost = ({ token, baseUrl }) => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({
    title: "",
    price: "",
    description: "",
    location: "",
    willDeliver: false,
  });

  const handleNewPost = (event) => {
    const { name, value, type, checked } = event.target;
    setNewPost(() => {
      return {
        ...newPost,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const createNewPost = async (event) => {
    event.preventDefault();
    try {
      const resp = await fetch(baseUrl + "/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title: newPost.title,
            description: newPost.description,
            price: newPost.price,
            location: newPost.location,
            willDeliver: newPost.willDeliver,
          },
        }),
      });
      const data = await resp.json();
      navigate("/Posts");
    } catch (e) {
      console.error("Error", e);
    }
  };

  return (
    <div className="vh-100">
      <h1 className="m-3">Create New Post</h1>
      <form className="row g-3 m-3">
        <div className="col-12">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={newPost.title}
            onChange={handleNewPost}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            name="price"
            value={newPost.price}
            onChange={handleNewPost}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={newPost.description}
            onChange={handleNewPost}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={newPost.location}
            onChange={handleNewPost}
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="willDeliver"
              checked={newPost.willDeliver}
              onChange={handleNewPost}
            />
            <label className="form-check-label" />
            Will Deliver?
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={createNewPost}
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
