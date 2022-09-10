import { Link, useNavigate } from "react-router-dom";

const Login = ({
  username,
  password,
  setUsername,
  setPassword,
  setToken,
  error,
  setError,
  baseUrl,
}) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(baseUrl + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw data.error.message;
      }

      setToken(data.data.token);
      navigate("/Posts");
    } catch (e) {
      console.error("Error", e);
      setError(e);
    }
  };

  return (
    <form className="d-flex mt-5 flex-column vh-100">
      <div className="row mb-3 d-flex justify-content-center">
        <div className="col-sm-4">
          <input
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3 d-flex justify-content-center">
        <div className="col-sm-4">
          <input
            placeholder="password"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="form-control"
          />
          {username + password !== "" && <p>{error}</p>}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-primary me-2"
          value="login"
          onClick={(event) => {
            event.preventDefault();
            handleLogin();
          }}
        >
          Sign In
        </button>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Link to="/SignUp">Don't have an account? Sign up here! </Link>
      </div>
    </form>
  );
};

export default Login;
