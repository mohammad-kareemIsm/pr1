import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, FormHelperText , Typography, Container, CircularProgress} from '@mui/material';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();    setError('');    setSuccessMessage(''); setLoading(true);
    const categoryData = {
      name: categoryName,
      description: categoryDescription,
    };
    try {
      const response = await axios.post('https://quizappsyria.pythonanywhere.com/category/AddCategory/',
       categoryData, {
        headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access_token')}`,
        },
      });
      setSuccessMessage('Category added successfully!');
      setCategoryName('');
      setCategoryDescription('');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || 'An error occurred while adding the category.');
      } else {
        setError('An error occurred while adding the category.');
      }
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs">
    <Typography variant="h4" align="center" gutterBottom>
      Add Category
    </Typography>
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        required
      />
      <TextField
        fullWidth
        label="Description"
        value={categoryDescription}
        onChange={(e) => setCategoryDescription(e.target.value)}
        required
        multiline
        rows={4}
      />
      {error && (
        <FormHelperText error={true}>{error}</FormHelperText>
      )}
      {successMessage && (
        <FormHelperText style={{ color: 'green' }}>{successMessage}</FormHelperText>
      )}     
      <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          style={{ marginTop: '16px' }}
        >
          {loading ? <CircularProgress size={24} /> : ' Add Category'}
        </Button>
    </form>
    </Container>
  );
};

export default AddCategory;