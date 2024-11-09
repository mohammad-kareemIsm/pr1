// import React, { useState } from 'react';
// import { TextField, Button, Box, Typography } from '@mui/material';

// const QuestionForm = () => {
//   const [subjects, setSubjects] = useState([]);

//   const handleSubjectChange = (index, value) => {
//     const newSubjects = [...subjects];
//     newSubjects[index].name = value;
//     setSubjects(newSubjects);
//   };

//   const handleQuestionChange = (subjectIndex, questionIndex, value) => {
//     const newSubjects = [...subjects];
//     newSubjects[subjectIndex].questions[questionIndex] = value;
//     setSubjects(newSubjects);
//   };

//   const handleAddSubject = () => {
//     setSubjects([...subjects, { name: '', questions: Array(50).fill('') }]);
//   };

//   const handleRemoveSubject = (index) => {
//     const newSubjects = subjects.filter((_, i) => i !== index);
//     setSubjects(newSubjects);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(subjects);
//   };
  
//   const handleRemoveQuestion = (subjectIndex, questionIndex) => {
//     const newSubjects = [...subjects];
//     newSubjects[subjectIndex].questions = newSubjects[subjectIndex].questions.filter((_, qIndex) => qIndex !== questionIndex);
//     setSubjects(newSubjects);
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//       {subjects.map((subject, subjectIndex) => (
//         <Box key={subjectIndex} sx={{ mb: 4 }}>
//           <Typography variant="h6">Subject {subjectIndex + 1}</Typography>
//           <TextField
//             fullWidth
//             label="Enter subject name"
//             variant="outlined"
//             value={subject.name}
//             onChange={(e) => handleSubjectChange(subjectIndex, e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           {subject.questions.map((question, questionIndex) => (
//             <Box key={questionIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//               <TextField
//                 label={`Question ${questionIndex + 1}`}
//                 variant="outlined"
//                 value={question}
//                 onChange={(e) => handleQuestionChange(subjectIndex, questionIndex, e.target.value)}
//                 sx={{ flex: 1, mr: 1 }}
//               />
//               <Button variant="contained" color="Tertiary" onClick={() => handleRemoveQuestion(subjectIndex, questionIndex)}>
//                 Remove
//               </Button>
//             </Box>
//           ))}
//           <Button variant="contained" color="secondary" onClick={() => handleRemoveSubject(subjectIndex)} sx={{ml : 3, mt:2.5}} >
//             Remove Subject
//           </Button>
//         </Box>
//       ))}
//       <Button variant="contained" color="primary" onClick={handleAddSubject} sx={{mr:2}} >
//         Add Subject
//       </Button>
//       <Button variant="contained" color="primary" type="submit">
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default QuestionForm;