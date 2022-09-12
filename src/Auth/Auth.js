import { useState } from "react"

function Auth(){
    const [loginUser, setLoginUser] = useState('')
    const [loginPass, setLoginPass] = useState('')
    const [regUser, setRegUser] = useState('')
    const [regPass, setRegPass] = useState('')
    const [regPassCon, setRegPassCon] = useState('')


    const login = () => {
        if(loginUser === '' || loginPass === ''){
            window.alert('Username or Password empty')
            return
        }
    }

    const register = () => {
        if(regUser === '' || regPass === ''){
            window.alert('Username or Password empty')
            return
        }
    }
    return(
        <div className="auth-container">
            <div className="login-container ">
                <input className="auth-input font-link" placeholder="username" onChange={(e) => setLoginUser(e)}></input>
                <input className="auth-input font-link" placeholder="password" onChange={(e) => setLoginPass(e)}></input>
                <button className="auth-button font-link" onClick={login}>Login</button>
            </div>
            <div className="register-container">
                <input className="auth-input font-link" placeholder="username" onChange={(e) => setRegUser(e)}></input>
                <input className="auth-input font-link" placeholder="password" onChange={(e) => setRegPass(e)}></input>
                <input className="auth-input font-link" placeholder="confirm password" onChange={(e) => setRegPassCon(e)}></input>
                <button className="auth-button font-link" onClick={register}>Register</button>
            </div>
        </div>
    )
}

export default Auth