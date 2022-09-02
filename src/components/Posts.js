import { useEffect } from "react";

const baseUrl = "https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt";

const Posts = ({ posts, setPosts }) => {
  const fetchPosts = async () => {
    const resp = await fetch(baseUrl + "/posts");
    const result = await resp.json();
    setPosts(result.data.posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div className="card m-3" key={post._id}>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.description}</p>
            <p className="card-text">{post.price}</p>
            <a href="#" className="btn btn-primary">
              Message Seller
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
