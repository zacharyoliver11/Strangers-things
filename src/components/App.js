import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Posts from "./Posts";
import Home from "./Home";
import Messages from "./Messages";
import Logout from "./Logout";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
                />
              }
            />
            <Route
              path="/Posts"
              element={<Posts posts={posts} setPosts={setPosts} />}
            />
            <Route path="/Messages" element={<Messages />} />
            <Route path="/Logout" element={<Logout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
