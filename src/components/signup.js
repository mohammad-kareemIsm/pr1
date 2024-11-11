// Import the react JS packages 
import axios from "axios";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Field, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const handleSelect = (eventKey) => console.log(`Selected: ${eventKey}`);
//alert(5)
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    user_name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phone_number: Yup.string()
      .matches(
        /^963 \d{9}$/,
        'Invalid phone number format. It should be like "963 985562218".'
      )
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      user_name: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
      role: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      localStorage.setItem("username", values.user_name);
      localStorage.setItem("email", values.email);

      try {
        const response = await axios.post(
          "http://quizappsyria.pythonanywhere.com/jwt/create/",
          values
        );
        const token = response.data.token;
        if (response.status >= 200 && response.status <= 250) {
          localStorage.setItem("access_token", token);          
          alert(response.data.message + " Please verify your email.");
          navigate("/verify");
        } else {
          alert("Signup failed: " + response.data.message);
        }
        console.log("User signed up successfully:", response.data);
        // console.log(token);
        console.log(localStorage);
        // const Email = localStorage.getItem("Email");
        // console.log(Email);
        console.log("finish signup");
      } catch (error) {
        console.error("There was an error signing up!", error);
      }
    },
  });
 
  // Create the submit method.
  const submit = async (e) => {
    e.preventDefault();
    const user = {
      name:username,   role: role,
      email: email,    password: password,
      re_password:confirmPassword};
    try {      
      const { data } = await axios.post(
        'https://quizappsyria.pythonanywhere.com/users/', user,
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true});
      // Initialize the access & refresh token in localStorage.
      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      axios.defaults.headers.common['Authorization'] = `JWT ${data.access}`;
      window.location.href = '/';
    } catch (error) {
      console.error('Signup failed:', error);
      // You might want to display an error message to the user here
    }
  };
  
  //   
  

  return (
    <div className="Auth-form-container d-flex justify-content-center align-items-center vh-100">
      <form className="Auth-form" onSubmit={submit} style={{ maxWidth: '400px', width: '100%'}}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Signup</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              className="form-control mt-1"
              placeholder="Enter Username"
              name='username'
              type='text'
              value={username}
              required
              onChange={e => setUsername(e.target.value)}
            />
          </div>
    <div className='mb-2'>
      <label>Role: </label>
      {/* <input type="text"  className='form-control' /> */}
    <DropdownButton
     // align="end"
      title="choose"
      id="dropdown-basic-button"
     // onSelect={handleSelect}
      onSelect={e => setRole(e)
        //console.log(JSON.stringify(e))
      }
    >
      <Dropdown.Item eventKey="Teacher">Teacher</Dropdown.Item>
      <Dropdown.Item eventKey="Student">Student</Dropdown.Item>
      <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
    </DropdownButton> 
      </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              name='email'
              type="text"
              className="form-control mt-1"
              placeholder="Enter pasemailsword"
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
          <div className="form-group mt-3">
            <label>Renter Password</label>
            <input
              className="form-control mt-1"
              placeholder="Renter Password"
              name='confirmPassword'
              type='password'
              value={confirmPassword}
              required
              onChange={e => setConfirmPassword(e.target.value)}
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

export default Signup