import { Link, useNavigate } from "react-router-dom";

const baseUrl = "https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt";

const Home = ({ username, password, setUsername, setPassword, setToken }) => {
  let navigate = useNavigate();

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
      setToken(data.data.token);
      data.success ? navigate("/Posts") : alert(data.error.message);
    } catch (e) {
      console.error("Error!", e);
    }
  };

  return (
    <form className="m-2 d-flex justify-content-center flex-column min-vh-100">
      <div className="row mb-3 d-flex justify-content-center">
        <label className="col-sm-2 col-form-label">Username</label>
        <div className="col-sm-4">
          <input
            onChange={(event) => setUsername(event.target.value)}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3 d-flex justify-content-center">
        <label className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-4">
          <input
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="form-control"
          />
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

export default Home;
