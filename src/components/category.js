import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, FormHelperText } from '@mui/material';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const categoryData = {
      name: categoryName,
      description: categoryDescription,
    };

    try {
      const response = await axios.post('https://quizappsyria.pythonanywhere.com/category/AddCategory/', categoryData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Ensure the user is authenticated
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
  };

  return (
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

      <Button type="submit" variant="contained" color="primary">
        Add Category
      </Button>
    </form>
  );
};

export default AddCategory;