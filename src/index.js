import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Posts from "./Posts";
import Home from "./Home";
import Messages from "./Messages";
import Login from "./Login";

const App = () => {
  const [posts, setPosts] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <nav>
          <h1>Stranger's Things</h1>
          <Link to="/">Home</Link>
          <Link to="/Posts">Posts</Link>
          <Link to="/Messages">Messages</Link>
          <Link to="/Login">Login</Link>
        </nav>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Posts"
              element={<Posts posts={posts} setPosts={setPosts} />}
            />
            <Route path="/Messages" element={<Messages />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
