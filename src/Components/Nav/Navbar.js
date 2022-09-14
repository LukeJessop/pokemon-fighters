import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
function Navbar(props){
    return(
        <div className="button-container">
            <h3>Welcome {props.username}</h3>
            <Link to="/gym">
              <button id="btn">Gym</button>
            </Link>
            <Link to="/fighting">
              <button id="btn">Fighting</button>
            </Link>
            <Link to="/hospital">
              <button id="btn">Hospital</button>
            </Link>
            <Link to="/">
              <button className="logout" id="btn">Logout</button>
            </Link>
          </div>
    )
}
const mapStateToProps = (state) => {
  return state
};
export default connect(mapStateToProps)(Navbar)