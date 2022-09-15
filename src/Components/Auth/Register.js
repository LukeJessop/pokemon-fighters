import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers";

function Regsiter() {
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPassCon, setRegPassCon] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (regUser === "" || regPass === "" || regPassCon === "") {
      window.alert("All feilds must be filled");
      return;
    }
    if (regPass !== regPassCon) {
      window.alert("Passwords do not match");
      return;
    }

    axios
      .post("/auth/register", { regUser, regPass })
      .then((res) => {
        navigate("/fighting");
      })
      .catch((err) => console.log("register error ", err.response.data));
  };

  return (
    <div className="form-container">
      <input
        className="auth-input"
        placeholder="username"
        onChange={(e) => setRegUser(e.target.value)}
      ></input>
      <input
        className="auth-input"
        placeholder="password"
        type="password"
        onChange={(e) => setRegPass(e.target.value)}
      ></input>
      <input
        className="auth-input"
        placeholder="confirm password"
        type="password"
        onChange={(e) => setRegPassCon(e.target.value)}
      ></input>
      <button className="auth-button" onClick={clickHandler}>
        Register
      </button>
    </div>
  );
}

export default Regsiter;
