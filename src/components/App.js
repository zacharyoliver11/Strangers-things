import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import { useState } from "react";
import Posts from "./Posts";
import Messages from "./Messages";
import Logout from "./Logout";
import SignUp from "./SignUp";
import NewPost from "./NewPost";
import Login from "./Login";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleLogout = () => {
    setPassword("");
    setToken("");
    setUsername("");
  };

  return (
    <div>
      <BrowserRouter>
        <nav className="d-flex align-items-center justify-content-between">
          <div>
            <h1>Stranger's Things</h1>
          </div>
          <div>
            {!token ? (
              <Link className="me-2" to="/">
                Login
              </Link>
            ) : null}
            <Link className="me-2" to="/Posts">
              Posts
            </Link>
            <Link className="me-2" to="/Messages">
              Messages
            </Link>
            {token ? (
              <button type="button" onClick={handleLogout} className="btn btn-link mb-1">Logout</button>
            ) : null}
          </div>
        </nav>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <Login
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
              element={
                <Posts token={token} posts={posts} setPosts={setPosts} />
              }
            />
            <Route path="/Messages" element={<Messages />} />
            <Route path="/Login" element={<Login />} />
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
            <Route path="/Logout" element={<Logout />} />
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
