import React, { useState } from "react";
import { TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import axios from "axios"; // تأكد من تثبيت axios

const ChangePassword = () => {
  // تعريف الحالات المحلية لحفظ المدخلات
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  // دالة إرسال البيانات إلى API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // طلب تغيير كلمة المرور عبر POST
      //const response = await axios.post("https://api.example.com/change-password", {
      const response = await axios.post("https://quizappsyria.pythonanywhere.com/users/reset_password_confirm/", {
        uid: userId,
        token: token,
        new_password: newPassword,
      });

      // إذا كان الرد ناجحاً، عرض رسالة نجاح
      setMessage("تم تغيير كلمة المرور بنجاح");
    } catch (error) {
      // إذا كان هناك خطأ، عرض رسالة خطأ
      setMessage("حدث خطأ أثناء تغيير كلمة المرور. تأكد من صحة البيانات.");
    }
  };

  return (
    <Container maxWidth="xs">
    
    <Typography variant="h4" align="center" gutterBottom>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label>الرقم التعريفي (ID):</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div> */}
           <TextField
          label="ID"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <TextField
          label="token"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        {/* <div>
          <label>الرمز (Token):</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div> */}
        {/* <div>
          <label>كلمة المرور الجديدة:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div> */}
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
