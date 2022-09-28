import { useState } from "react";
import useAuth from "../Hooks/use-auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userValid, setUserValid] = useState(false);
  const [userInputTouched, setUserInputTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passInputTouched, setPassInputTouched] = useState(false);

  const { sendRequest } = useAuth();

  const clickHandler = (event) => {
    if (!userValid) {
      event.target[0].focus();
      return;
    } else if (!passwordValid) {
      event.target[1].focus();
      return;
    }

    sendRequest("login", { loginUser: user, loginPass: password });
    navigate("/gym");
  };

  const userInputInvalid = !userValid && userInputTouched;
  const passwordInputInvalid = !passwordValid && passInputTouched;

  return (
    <form onSubmit={clickHandler} className="form-container ">
      <input
        className={userInputInvalid ? "auth-input invalid" : "auth-input"}
        placeholder="username"
        onBlur={() => {
          !user && setUserValid(false);
          setUserInputTouched(true);
        }}
        onFocus={() => setUserValid(true)}
        onChange={(e) => setUser(e.target.value)}
      ></input>
      <input
        className={passwordInputInvalid ? "auth-input invalid" : "auth-input"}
        placeholder="password"
        type="password"
        onBlur={() => {
          !password && setPasswordValid(false);
          setPassInputTouched(true);
        }}
        onFocus={() => {
          setPasswordValid(true);
        }}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button type="submit" className="auth-button">
        Login
      </button>
    </form>
  );
}

export default Login;
