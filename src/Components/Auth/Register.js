import { useState } from "react";
import useAuth from "../Hooks/use-auth";
import { useNavigate } from "react-router-dom";

function Regsiter() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userValid, setUserValid] = useState(false);
  const [userInputTouched, setUserInputTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passInputTouched, setPassInputTouched] = useState(false);

  const [passConfirm, setPassConfirm] = useState("");
  const [passConValid, setPassConValid] = useState(false);
  const [conInputTouched, setConInputTouched] = useState(false);
  const { sendRequest } = useAuth(); //custom hook!

  const clickHandler = (event) => {
    event.preventDefault();

    if (!userValid) {
      event.target[0].focus();
      return;
    } else if (!passwordValid) {
      event.target[1].focus();
      return;
    } else if (!passConValid) {
      event.target[2].focus();
      return;
    }

    sendRequest("register", { user, password });
    navigate("/gym");
  };

  const userInputInvalid = !userValid && userInputTouched;
  const passwordInputInvalid = !passwordValid && passInputTouched;
  const confirmInputInvalid = !passConValid && conInputTouched;

  return (
    <form onSubmit={clickHandler} className="form-container">
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
      <input
        className={confirmInputInvalid ? "auth-input invalid" : "auth-input"}
        placeholder="confirm password"
        type="password"
        onBlur={() => {
          !passConfirm && setPassConValid(false);
          setConInputTouched(true);
        }}
        onFocus={() => {
          setPassConValid(true);
        }}
        onChange={(e) => setPassConfirm(e.target.value)}
      ></input>
      <button type="submit" className="auth-button">
        Register
      </button>
    </form>
  );
}

export default Regsiter;
