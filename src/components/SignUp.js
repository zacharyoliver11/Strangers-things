import { useNavigate, Link } from "react-router-dom";

const SignUp = ({
  username,
  password,
  setUsername,
  setPassword,
  setToken,
  baseUrl,
  error,
  setError,
}) => {
  const navigate = useNavigate();
  const handleNewAccount = async () => {
    try {
      const response = await fetch(baseUrl + "/users/register", {
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
      const data = await response.json();
      if (!response.ok) {
        throw data.error.message;
      }
      setToken(data.data.token);
      navigate("/Posts");
    } catch (e) {
      console.error("Error!", e);
      setError(e);
    }
  };

  return (
    <form className="m-5 d-flex justify-content-center flex-column">
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
          className="btn btn-primary"
          onClick={(event) => {
            event.preventDefault();
            handleNewAccount();
          }}
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default SignUp;
