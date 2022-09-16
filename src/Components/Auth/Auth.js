import Login from './Login'
import Register from './Register'

function Auth(props) {
  

  return (
    <div className="auth-container form-container">
      <div className='navbar-message'>
        <h2> Please Log In </h2>
      </div>
      <Login/>
      <Register/>
    </div>
  );
}

export default Auth;
