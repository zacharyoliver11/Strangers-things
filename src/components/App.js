import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Posts from "./Posts";
import Profile from "./Profile";
import SignUp from "./SignUp";
import NewPost from "./NewPost";
import Login from "./Login";
const baseUrl = "https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt";

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

  const handleDelete = async (postID) => {
    try {
      const resp = await fetch(baseUrl + `/posts/${postID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await resp.json();
      setPosts(
        posts.filter((p) => {
          return p._id !== postID;
        })
      );
    } catch (e) {
      console.error("Error", e);
    }
  };

  return (
    <div className="bg-light">
      <BrowserRouter>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2 sticky-top">
          <div className="container-fluid">
            <h1 className="navbar-brand fs-1">Stranger's Things</h1>
            <div className="collapse navbar-collapse show">
              <ul className="navbar-nav me-auto mb-2">
                <li className="nav-item">
                  {!token && (
                    <NavLink
                      className="nav-link fs-5"
                      aria-current="page"
                      to="/"
                    >
                      Login
                    </NavLink>
                  )}
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link fs-5" to="/Posts">
                    Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  {token && (
                    <NavLink className="nav-link fs-5" to="/Profile">
                      Profile
                    </NavLink>
                  )}
                </li>
              </ul>
              <form className="d-flex">
                {token && (
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-light fs-6"
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
                  baseUrl={baseUrl}
                />
              }
            />
            <Route
              path="/Posts"
              element={
                <Posts
                  token={token}
                  posts={posts}
                  setPosts={setPosts}
                  handleDelete={handleDelete}
                  baseUrl={baseUrl}
                />
              }
            />
            <Route
              path="/Profile"
              element={
                <Profile
                  handleDelete={handleDelete}
                  posts={posts}
                  token={token}
                  baseUrl={baseUrl}
                  username={username}
                />
              }
            />
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
                  baseUrl={baseUrl}
                  setError={setError}
                  error={error}
                />
              }
            />
            <Route
              path="/NewPost"
              element={
                <NewPost
                  token={token}
                  posts={posts}
                  setPosts={setPosts}
                  baseUrl={baseUrl}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
