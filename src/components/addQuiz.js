import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';

const AddQuiz = () => {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizLevel, setQuizLevel] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch categories and questions from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://quizappsyria.pythonanywhere.com/category/GetAllCategory/'); // Adjust the endpoint as necessary
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://quizappsyria.pythonanywhere.com/Question/GetAllQuestin/{id}/'); // Adjust the endpoint as necessary
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchCategories();
    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (selectedQuestions.length < 1) {
      setError('You should select at least one question to create this quiz.');
      return;
    }

    const quizData = {
      category: selectedCategory,
      title: quizTitle,
      description: quizDescription,
      lv: quizLevel,
      duration_minutes: durationMinutes,
      Questions: selectedQuestions,
    };

    try {
      const response = await axios.post('https://quizappsyria.pythonanywhere.com/Quizes/CreatQuiz/', quizData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Ensure the user is authenticated
        },
      });
      alert('The quiz added successfully!');
            // Reset form fields
        setQuizTitle('');
        setQuizDescription('');
        setQuizLevel('');
        setDurationMinutes('');
        setSelectedCategory('');
        setSelectedQuestions([]);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || 'An error occurred while adding the quiz.');
      } else {
        setError('An error occurred while adding the quiz.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        required
      />

      <TextField
        fullWidth
        label="Description"
        value={quizDescription}
        onChange={(e) => setQuizDescription(e.target.value)}
        required
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="level-label">Level</InputLabel>
        <Select
          labelId="level-label"
          value={quizLevel}
          onChange={(e) => setQuizLevel(e.target.value)}
          required
        >
          <MenuItem value="Simple">Simple</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Duration (minutes)"
        type="number"
        value={durationMinutes}
        onChange={(e) => setDurationMinutes(e.target.value)}
        required
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="questions-label">Select Questions</InputLabel>
        <Select
          labelId="questions-label"
          multiple
          value={selectedQuestions}
          onChange={(e ) => setSelectedQuestions(e.target.value)}
          required
        >
          {questions.map((question) => (
            <MenuItem key={question.id} value={question.id}>
              {question.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {error && (
        <FormHelperText error={true}>{error}</FormHelperText>
      )}

      <Button type="submit" variant="contained" color="primary">
        Add Quiz
      </Button>
    </form>
  );
};

export default AddQuiz;