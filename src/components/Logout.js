import { Link } from "react-router-dom";

const Logout = () => {
  return (
    <div className="alert alert-primary" role="alert">
      You have successfully signed out. To log in again please visit&nbsp;
      <Link to="/Login">here</Link>.
    </div>
  );
};

export default Logout;
