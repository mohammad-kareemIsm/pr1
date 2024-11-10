import React, { useState, useContext } from 'react'
import axios from 'axios';
import { TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import { AuthContext } from '../AuthContext'; 

function Getusers() {
    const [loading, setLoading] = useState(false);
    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        //const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxMjc4MjUyLCJqdGkiOiJkNmViMzhhZWJiYWQ0OWU1OTYxM2ZmZjE4ZjQ0Zjk3MCIsInVzZXJfaWQiOjEyfQ.XnnrfDsHLSpJIEFtSlt7FHfg39Cz5YyaohAuGhJnMdQ';
       // const accessToken = localStorage.getItem('access_token');                
    try {
        const respo = await axios.get(
         // 'https://quizappsyria.pythonanywhere.com/users/',
          'https://quizappsyria.pythonanywhere.com/All_Users/',
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem('access_token')}`, // Add the token to the header
            },
          }
          );      
         // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;              
         console.log(JSON.stringify(respo))
    }
        catch (error) {
            console.error('Login failed:', JSON.stringify(error));
            alert('Login failed. Please check your credentials and try again.'); // Notify user of failure
          } finally {
           
            setLoading(false);
          }
        };

  return (
    <Container maxWidth="xs">
    <Typography variant="h4" align="center" gutterBottom>
      get users
    </Typography>
    <form onSubmit={submit}>
      
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
  )
}

export default Getusers
