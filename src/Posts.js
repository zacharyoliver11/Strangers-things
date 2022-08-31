import { useEffect } from "react";

const Posts = ({ posts, setPosts }) => {
  const fetchPosts = async () => {
    const resp = await fetch(
      "https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt/posts"
    );
    const result = await resp.json();
    setPosts(result.data.posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <div>{post.description}</div>
          <div>{post.location}</div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
