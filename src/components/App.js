import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Posts from "./Posts";
import Messages from "./Messages";
import SignUp from "./SignUp";
import NewPost from "./NewPost";
import Login from "./Login";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );

  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);

  const handleLogout = () => {
    setPassword("");
    setToken("");
    setUsername("");
  };

  return (
    <div>
      <BrowserRouter>
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
          <div className="container-fluid">
            <h1 className="navbar-brand mt-2">Stranger's Things</h1>
            <div className="collapse navbar-collapse show">
              <ul className="navbar-nav me-auto mb-2 mb-xl-0">
                <li className="nav-item">
                  {!token && (
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/"
                    >
                      Login
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Posts">
                    Posts
                  </Link>
                </li>
                <li className="nav-item">
                  {token && (
                    <Link className="nav-link" to="/Messages">
                      Messages
                    </Link>
                  )}
                </li>
              </ul>
              <form className="d-flex">
                {token && (
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-light"
                  >
                    Logout
                  </button>
                )}
              </form>
            </div>
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
                  error={error}
                  setError={setError}
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
