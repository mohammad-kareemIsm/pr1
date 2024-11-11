import React, { useState } from "react";
import { TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import axios from "axios"; // تأكد من تثبيت axios

const ChangePassword = () => {    
  const [newPassword, setNewPassword] = useState("");  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {      
      const response = await axios.post(
        "https://quizappsyria.pythonanywhere.com/users/reset_password_confirm/",
       {
      uid: localStorage.getItem('userid'),
      token: localStorage.getItem('access_token'),
      new_password: newPassword,
      },
      {headers: { 'Content-Type': 'application/json' }, withCredentials: true} );
      axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem('access_token')}`;      
      setMessage("تم تغيير كلمة المرور بنجاح");
    } catch (error) {      
      setMessage("حدث خطأ أثناء تغيير كلمة المرور. تأكد من صحة البيانات.");    }
    setLoading(false);
  };
  return (
    <Container maxWidth="xs">
    
    <Typography variant="h4" align="center" gutterBottom>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit}>       
      {/* <TextField
          label="id"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          required
        />  */}
         <TextField
          label="New Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
        {loading ? <CircularProgress size={24} /> : 'Change Password'}
        </Button>
      </form>
      {message && <p>{message}</p>}    
    </Container>
  );
};

export default ChangePassword;
