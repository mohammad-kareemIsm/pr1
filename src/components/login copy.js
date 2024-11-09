// Import the react JS packages 
import axios from "axios";
import React,{ useState, useContext } from "react";
import { AuthContext } from '../AuthContext';

// Define the Login function.
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useContext(AuthContext);
  // Create the submit method.
  const submit = async (e) => {
    e.preventDefault();
   // Call the login function from AuthContext
    await login(email, password);
    // Create the user object for the API request
     const user = {
       email: email,
       password: password
     };
    try {
      // Create the POST request
      const { data } = await axios.post(
        'https://quizappsyria.pythonanywhere.com/jwt/create/',
        user,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      //Store tokens in localStorage.
      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
     // Check user role and redirect accordingly
     const userRole = data.role; 
       if (userRole === 'teacher') {
         window.location.href = '/teacher'; // Redirect to teacher dashboard
       } else if (userRole === 'student') {
         window.location.href = '/student'; // Redirect to student dashboard
       } else {
         window.location.href = '/'; // Default redirect
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="Auth-form-container d-flex justify-content-center align-items-center vh-100">
      <form className="Auth-form" onSubmit={submit} style={{ maxWidth: '400px', width: '100%'}}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              className="form-control mt-1"
              placeholder="Enter email"
              name='email'
              type='text'
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name='password'
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-4 mt-4">
            <button type="submit" className="btn btn-primary" style={{maxWidth: '400px', width: '100%'}}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login