import { useEffect } from "react";

const baseUrl = "https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt";

const Home = ({ username, password, setUsername, setPassword }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username);
    console.log(password);
  };

  const newAccount = async () => {
    const resp = await fetch(baseUrl + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${username}`,
          password: `${password}`,
        },
      }),
    });
    const result = await resp.json();
    console.log(result);
  };

  // newAccount();

  return (
    <form className="m-3" onSubmit={handleSubmit}>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label" htmlFor="username">
          Username
        </label>
        <div className="col-sm-10">
          <input
            type="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label" htmlFor="password">
          Password
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="form-control"
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary me-2">
          Sign In
        </button>
        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      </div>
    </form>
  );
};

export default Home;
