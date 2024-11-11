import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, CircularProgress, FormControlLabel,Checkbox, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';


const AddQuestion = () => {
  const [categories, setCategories] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [mark, setMark] = useState('');
  const [answers, setAnswers] = useState([{ choice_text: '', is_correct: false }]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://quizappsyria.pythonanywhere.com/category/GetAllCategory/',
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access_token')}`, // Add the token to the header
          },
        }
        );
        setCategories(response.data.Categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAnswerChange = (index, field, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index][field] = value;
    setAnswers(updatedAnswers);
  };

  const addAnswer = () => {
    if (answers.length < 4) {
      setAnswers([...answers, { choice_text: '', is_correct: false }]);
    }
  };

  const removeAnswer = (index) => {
    const updatedAnswers = answers.filter((_, i) => i !== index);
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate answers
    const correctAnswers = answers.filter(answer => answer.is_correct).length;
    if (answers.length < 2 || answers.length > 4) {
      setError('Number of choices must be between 2 and 4.');
      return;
    }
    if (correctAnswers !== 1) {
      setError('There must be exactly one correct answer.');
      return;
    }

    const questionData = {
      question_text: questionText,
      category: selectedCategory,
      mark: mark,
      Answers: answers,
    };
    try {
      const response = await axios.post('https://quizappsyria.pythonanywhere.com/Question/AddQuestion/',
       questionData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access_token')}`, // Ensure the user is authenticated
        },      });
      setSuccessMessage('The question added successfully!');
      setQuestionText('');
      setSelectedCategory('');
      setMark('');
      setAnswers([{ choice_text: '', is_correct: false }]); // Reset answers
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || 'An error occurred while adding the question.');
      } else {
        setError('An error occurred while adding the question.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
    <Typography variant="h4" align="center" gutterBottom>
      Add Question
    </Typography>
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Question Text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        required
      />
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
        label="Mark"
        type="number"
        value={mark}
        onChange={(e) => setMark(e.target.value)}
        required
      />
 <Button        
          variant="contained"
          color="Secondary"          
          disabled={loading}
          style={{ marginTop: '16px' }}      
      onClick={addAnswer}>       
        {loading ? <CircularProgress size={24} /> : ' + Add Answers'}
      </Button>      
      {answers.map((answer, index) => (
        <div key={index}>
          <TextField
            label={`Answer ${index + 1}`}
            value={answer.choice_text}
            onChange={(e) => handleAnswerChange(index, 'choice_text', e.target.value)}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={answer.is_correct}
                onChange={(e) => handleAnswerChange(index, 'is_correct', e.target.checked)}
              />
            }
            label="Is Correct"
          />
          {answers.length > 2 && (
            <Button variant="contained" color="secondary" onClick={() => removeAnswer(index)}>
              Remove
            </Button>
          )}
        </div>
      ))}
     

      {error && (
        <FormHelperText error={true}>{error}</FormHelperText>
      )}
      {successMessage && (
        <FormHelperText style={{ color: 'green' }}>{successMessage}</FormHelperText>
      )}

      {/* <Button type="submit" variant="contained" color="primary">
        Add Question
      </Button> */}

      <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          style={{ marginTop: '16px' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Question'}
        </Button>
    </form>
    </Container>
  );
};

export default AddQuestion;