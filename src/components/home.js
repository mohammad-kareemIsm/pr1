// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const tests = [
  { id: 1, name: 'Math Test', specialization: 'Math', duration: 30 },
  { id: 2, name: 'Science Test', specialization: 'Science', duration: 45 },
  { id: 3, name: 'History Test', specialization: 'History', duration: 40 },
  // Add more tests as needed
];
// Define the Login function.
export const Home = () => {
    //  const [message, setMessage] = useState('');
    //  useEffect(() => {
    //     if(localStorage.getItem('access_token') === null){                   
    //         window.location.href = '/home'
    //     }
    //     else{
    //      (async () => {
    //        try {
    //          const {data} = await axios.get(   
    //                         'https://quizappsyria.pythonanywhere.com/users/Get_All_Users/', {
    //                          headers: {
    //                             'Content-Type': 'application/json'
    //                          }}
    //                        );
    //          setMessage(data.message);
    //       } catch (e) {
    //         console.log('not auth')
    //       }
    //      })()};
    //  }, []);
    //  return (
    //     <div className="form-signin mt-5 text-center">
    //       <h3> Quiz App Web
    //       {/* {message} */}
    //       </h3>
    //     </div>)
    const [selectedTest, setSelectedTest] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    const handleStartTest = (test) => {
      setSelectedTest(test);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedTest(null);
    };
  
    return (
      <Container>
        <h1 className="my-4">Available Tests</h1>
        <Row>
          {tests.map((test) => (
            <Col md={4} key={test.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{test.name}</Card.Title>
                  <Card.Text>Specialization: {test.specialization}</Card.Text>
                  <Card.Text>Duration: {test.duration} minutes</Card.Text>
                  <Button variant="primary" onClick={() => handleStartTest(test)}>
                    Start Test
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
  
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Start Test</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTest && (
              <div>
                <p>
                  You are about to start the <strong>{selectedTest.name}</strong> in{' '}
                  <strong>{selectedTest.specialization}</strong>. 
                </p>
                <p>The test will last for {selectedTest.duration} minutes.</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseModal}>
              Start Test
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
}
export default Home
