import Login from './Login'
import Register from './Register'

function Auth(props) {
  

  return (
    <div className="auth-container form-container">
      <div className='navbar-message'>
        <h3> Please log in </h3>
      </div>
      <Login/>
      <div className='navbar-message'>
        <h3> First time? Regsiter here! </h3>
      </div>
      <Register/>
    </div>
  );
}

export default Auth;
