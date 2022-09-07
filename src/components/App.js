import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Posts from "./Posts";
import Home from "./Home";
import Messages from "./Messages";
import Logout from "./Logout";
import SignUp from "./SignUp";
import NewPost from "./NewPost";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  return (
    <div>
      <BrowserRouter>
        <nav className="d-flex align-items-center justify-content-between">
          <div>
            <h1>Stranger's Things</h1>
          </div>
          <div>
            <Link className="me-2" to="/">
              Home
            </Link>
            <Link className="me-2" to="/Posts">
              Posts
            </Link>
            <Link className="me-2" to="/Messages">
              Messages
            </Link>
            <Link className="me-2" to="/Logout">
              Logout
            </Link>
          </div>
        </nav>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  setToken={setToken}
                  token={token}
                />
              }
            />
            <Route
              path="/Posts"
              element={<Posts posts={posts} setPosts={setPosts} token={token} />}
            />
            <Route path="/Messages" element={<Messages />} />
            <Route path="/Logout" element={<Logout />} />
            <Route
              path="/SignUp"
              element={
                <SignUp
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  setToken={setToken}
                />
              }
            />
            <Route
              path="/NewPost"
              element={
                <NewPost token={token} posts={posts} setPosts={setPosts} />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
