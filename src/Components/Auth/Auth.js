import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers";
import {connect} from 'react-redux'


function Auth(props) {
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPassCon, setRegPassCon] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const login = () => {
    if (loginUser === "" || loginPass === "") {
      window.alert("Invalid username or password");
      return;
    }

    
    axios
    .post('/auth/login', { loginUser, loginPass })
    .then((res) =>{
      dispatch(updateUser(res.data))
      navigate('/gym')
    })
    .catch((err) => console.log('login error ', err.response.data));
  };

  const register = () => {
    if (regUser === "" || regPass === "" || regPassCon === "") {
      window.alert("All feilds must be filled");
      return;
    }
    if (regPass !== regPassCon) {
      window.alert("Passwords do not match");
      return;
    }

    axios
    .post('/auth/register', { regUser, regPass })
    .then((res) => {
      dispatch(updateUser(res.data))
      navigate('/fighting')
    })
    .catch((err) => console.log('register error ', err.response.data));


  };

  return (
    <div className="auth-container">
      <div className="login-container ">
        <input
          className="auth-input"
          placeholder="username"
          onChange={(e) => setLoginUser(e.target.value)}
        ></input>
        <input
          className="auth-input"
          placeholder="password"
          type='password'
          onChange={(e) => setLoginPass(e.target.value)}
        ></input>
        <button className="auth-button" onClick={login}>
          Login
        </button>
      </div>
      <div className="register-container">
        <input
          className="auth-input"
          placeholder="username"
          onChange={(e) => setRegUser(e.target.value)}
          ></input>
        <input
          className="auth-input"
          placeholder="password"
          type='password'
          onChange={(e) => setRegPass(e.target.value)}
          ></input>
        <input
          className="auth-input"
          placeholder="confirm password"
          type='password'
          onChange={(e) => setRegPassCon(e.target.value)}
        ></input>
        <button className="auth-button" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return state
};
export default connect(mapStateToProps)(Auth);
