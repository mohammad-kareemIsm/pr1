import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import { AuthContext } from '../AuthContext'; 

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();    setLoading(true);
    const user = { email: email,   password: password,};
    try {
      const { data } = await axios.post('https://quizappsyria.pythonanywhere.com/jwt/create/',
        user, { headers: { 'Content-Type': 'application/json' }, withCredentials: true});
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);        
      axios.defaults.headers.common['Authorization'] = `JWT ${data.access}`;      
      await login(email, password);             
      const respo = await axios.get('https://quizappsyria.pythonanywhere.com/users/me/',
         {headers: { Authorization: `JWT ${localStorage.getItem('access_token')}`,},});                      
      localStorage.setItem('userid', respo.data.id);
      localStorage.setItem('refresh_token', data.refresh); 
      const userRole = respo.data.role; 
      debugger;
      if (userRole === 'Teacher') {
        window.location.href = '/quiz'; // Redirect to teacher dashboard
      } else if (userRole === 'student') {
        window.location.href = '/student'; // Redirect to student dashboard
      } else {
        window.location.href = '/getusers'; 
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.'); // Notify user of failure
    } finally {
     
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={submit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          style={{ marginTop: '16px' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>
    </Container>
  );
};

export default Login;


// // Import the react JS packages 
// import axios from "axios";
// import React,{ useState, useContext } from "react";
// import { AuthContext } from '../AuthContext';

// // Define the Login function.
// export const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login, loading } = useContext(AuthContext);
//   // Create the submit method.
//   const submit = async (e) => {
//     e.preventDefault();
//    // Call the login function from AuthContext
//     await login(email, password);
//     // Create the user object for the API request
//      const user = {
//        email: email,
//        password: password
//      };
//     try {
//       // Create the POST request
//       const { data } = await axios.post(
//         'https://quizappsyria.pythonanywhere.com/jwt/create/',
//         user,
//         {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true
//         }
//       );

//       //Store tokens in localStorage.
//       localStorage.clear();
//       localStorage.setItem('access_token', data.access);
//       localStorage.setItem('refresh_token', data.refresh);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
//      // Check user role and redirect accordingly
//      const userRole = data.role; 
//        if (userRole === 'teacher') {
//          window.location.href = '/teacher'; // Redirect to teacher dashboard
//        } else if (userRole === 'student') {
//          window.location.href = '/student'; // Redirect to student dashboard
//        } else {
//          window.location.href = '/'; // Default redirect
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };
//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div className="Auth-form-container d-flex justify-content-center align-items-center vh-100">
//       <form className="Auth-form" onSubmit={submit} style={{ maxWidth: '400px', width: '100%'}}>
//         <div className="Auth-form-content">
//           <h3 className="Auth-form-title">Login</h3>
//           <div className="form-group mt-3">
//             <label>Email</label>
//             <input
//               className="form-control mt-1"
//               placeholder="Enter email"
//               name='email'
//               type='text'
//               value={email}
//               required
//               onChange={e => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="form-group mt-3">
//             <label>Password</label>
//             <input
//               name='password'
//               type="password"
//               className="form-control mt-1"
//               placeholder="Enter password"
//               value={password}
//               required
//               onChange={e => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="d-grid gap-4 mt-4">
//             <button type="submit" className="btn btn-primary" style={{maxWidth: '400px', width: '100%'}}>Submit</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login