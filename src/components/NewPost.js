import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NewPost = ({ token, baseUrl, setPosts }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

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
            title: title,
            description: description,
            price: price,
            location: location,
            willDeliver: willDeliver,
          },
        }),
      });
      const data = await resp.json();
      setPosts((prev) => [data.data.post, ...prev])
      navigate("/Posts");
    } catch (e) {
      console.error("Error", e);
    }
  };

  return (
    <div className="vh-100">
      <h1 className="m-3">Create New Post</h1>
      <form className="row g-3 m-3">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            type="text"
            className="form-control"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="willDeliver"
              value={willDeliver}
              onChange={() => setWillDeliver(!willDeliver)}
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
