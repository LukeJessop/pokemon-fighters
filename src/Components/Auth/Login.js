import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers";

function Login(props) {
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = () => {
    if(loginUser === ""){
      setIsUsernameValid(false)
      return;
    }
    if(loginPass === ""){
      setIsPasswordValid(false)
      return;
    }

    axios
      .post("/auth/login", { loginUser, loginPass })
      .then((res) => {
        navigate("/gym");
      })
      .catch((err) => console.log("login error ", err.response.data));
  };

  return (
    <div className="form-container ">
      <input
        style={isUsernameValid ? null : {backgroundColor: '#ff7d7d', border: 'solid #b80202 1px'}}
        className="auth-input"
        placeholder="username"
        onChange={(e) => setLoginUser(e.target.value)}
      ></input>
      <input
        style={isPasswordValid ? null : {backgroundColor: '#ff7d7d', border: 'solid #b80202 1px'}}
        className="auth-input"
        placeholder="password"
        type="password"
        onChange={(e) => setLoginPass(e.target.value)}
      ></input>
      <button className="auth-button" onClick={clickHandler}>
        Login
      </button>
    </div>
  );
}

export default Login;
