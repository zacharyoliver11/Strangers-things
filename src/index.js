import { createRoot } from "react-dom/client";
import { useState } from "react";
import Posts from "./Posts";

const App = () => {
  const [posts, setPosts] = useState([]);

  return (
    <div>
      <h1>Stranger's Things</h1>
      <Posts posts={posts} setPosts={setPosts} />
    </div>
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
