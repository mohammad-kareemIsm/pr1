import './App.css';
import { useEffect, useState,useContext } from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Formbootstrap from './testbootstrap/Formbootstrap'
import Userregister from './users/Userregister'
import NavbarHeader from './Header/NavbarHeader'
import MainContent from './contentComponents/MainContent'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Regester from './api/Regester'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./components/login";
import {Home} from "./components/home";
import {Navigation} from './components/navigation';
import {Logout} from './components/logout';
import {Signup} from './components/signup';
import Help from './components/help';
import Profile from './components/profile';
import axios from 'axios';
import QuestionForm from './components/questionForm';
import TeacherDashboard from '../src/teacherDashboard';
import StudentDashboard from '../src/studentDashboard';// const api = axios.create(
import { AuthProvider, AuthContext } from '../src/AuthContext';
import AddQuiz from './components/addQuiz';
import AddQuestion from './components/questions';
import AddCategory from './components/category'
import ChangePassword from './components/changepassword';

function App() {
  const { user, loading } = useContext(AuthContext);

   return(
    <div>
    {/* <AddCategory /> */}
    {/* {!user ? (
      <Login />
    ) : user.role === 'teacher' ? (
      <TeacherDashboard />
    ) : (
      <StudentDashboard />
    )} */}
  
     <BrowserRouter>
     <Navigation />
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/logout" element={<Logout/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path="/help" element={<Help/>}/>
       <Route path="/profile" element={<Profile/>}/>
       <Route path="/quiz" element={<AddQuiz/>}/>
       <Route path="/changepassword" element={<ChangePassword/>}/>
     </Routes> 
     {/* </Routes>  */} 
   </BrowserRouter>
  </div>
   );

}
const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;
