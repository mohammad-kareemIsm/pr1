import React, { useState, useContext } from 'react'
import axios from 'axios';
import { TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import { AuthContext } from '../AuthContext'; 

function GetAllCategory() {
    const [res, setRes] = useState('');
    const [loading, setLoading] = useState(false);
    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);       
    try {
        const respo = await axios.get(         
          'https://quizappsyria.pythonanywhere.com/category/GetAllCategory',
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem('access_token')}`, // Add the token to the header
            },
          }
          );      
         // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;              
         console.log(JSON.stringify(respo.data))
         setRes(respo)
    }
        catch (error) {
            console.error(' failed:', JSON.stringify(error));
            alert(' failed. Please check your credentials and try again.'); // Notify user of failure
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

export default GetAllCategory
