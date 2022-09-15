import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./navbar.css";
function Navbar(props) {
  return (
    <div className="button-container">
      <h3 className="username-text">Welcome {props.username}</h3> {/** we are using redux for the username, i may take redux off completely depending on if i can figure out if it can persist state past a refresh */}
      <Link to="/gym">
        <button className="btn">Gym</button>
      </Link>
      <Link to="/fighting">
        <button className="btn">Fighting</button>
      </Link>
      <Link to="/">
        <button className="logout btn">Logout</button>
      </Link>
    </div>
  );
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(Navbar);
