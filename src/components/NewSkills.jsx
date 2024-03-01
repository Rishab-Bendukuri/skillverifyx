import React, { useState, useEffect } from "react";
import { Button, Card, CardImg, Col, Form, FormGroup, Row } from "react-bootstrap";
import "./Skills.css"; // Import your CSS file
import styled from "styled-components";

function NewSkills() {
  const [data, setData] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Simulate fetching data from an API (replace with actual API call)
    const fetchedData = {
      skills: [
        {
          skillname: "Machine Learning",
          imageLink: "https://static.vecteezy.com/system/resources/previews/013/899/429/original/machine-learning-icon-artificial-intelligence-smart-machine-logo-template-illustration-free-vector.jpg",
          Desc: "Explore techniques for making predictions and extracting insights from data.",
          questions: [
            {
              question: "Which algorithm is used for classification problems with independent features?",
              options: ["Logistic Regression", "K-Nearest Neighbors", "Decision Tree", "Support Vector Machine"],
              correctAnswer: "Logistic Regression"
            },
            {
              question: "Which algorithm is used for classification problems with independent features?",
              options: ["Logistic Regression", "K-Nearest Neighbors", "Decision Tree", "Support Vector Machine"],
              correctAnswer: "Logistic Regression"
            }
          ],
          topicsIncluded: ["Algorithms", "Data Analysis", "Modeling"],
        },
        {
          skillname: "Cloud Computing",
          Desc: "Harness the power of cloud-based infrastructure and services.",
          questions: [
            // ... question data for Cloud Computing
          ],
          topicsIncluded: ["AWS", "Azure", "GCP", "Virtualization"],
        },
        {
          skillname: "Machine Learning",
          imageLink: "https://static.vecteezy.com/system/resources/previews/013/899/429/original/machine-learning-icon-artificial-intelligence-smart-machine-logo-template-illustration-free-vector.jpg",
          Desc: "Explore techniques for making predictions and extracting insights from data.",
          questions: [
            {
              question: "Which algorithm is used for classification problems with independent features?",
              options: ["Logistic Regression", "K-Nearest Neighbors", "Decision Tree", "Support Vector Machine"],
              correctAnswer: "Logistic Regression"
            },
            {
              question: "Which algorithm is used for classification problems with independent features?",
              options: ["Logistic Regression", "K-Nearest Neighbors", "Decision Tree", "Support Vector Machine"],
              correctAnswer: "Logistic Regression"
            }
          ],
          topicsIncluded: ["Algorithms", "Data Analysis", "Modeling"],
        },
        {
          skillname: "Machine Learning",
          imageLink: "https://static.vecteezy.com/system/resources/previews/013/899/429/original/machine-learning-icon-artificial-intelligence-smart-machine-logo-template-illustration-free-vector.jpg",
          Desc: "Explore techniques for making predictions and extracting insights from data.",
          questions: [
            {
              question: "Which algorithm is used for classification problems with independent features?",
              options: ["Logistic Regression", "K-Nearest Neighbors", "Decision Tree", "Support Vector Machine"],
              correctAnswer: "Logistic Regression"
            },
            {
              question: "Which algorithm is used for classification problems with independent features?",
              options: ["Logistic Regression", "K-Nearest Neighbors", "Decision Tree", "Support Vector Machine"],
              correctAnswer: "Logistic Regression"
            }
          ],
          topicsIncluded: ["Algorithms", "Data Analysis", "Modeling"],
        }
        // ... other skills
      ],
    };
    setData(fetchedData.skills);
  }, []);

  const handleCardClick = (skill) => {
    setSelectedSkill(skill);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
  };

  const handleCertificateGeneration = () => {
    console.log("HANdle")
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === selectedSkill.questions[currentQuestion].correctAnswer) {
      console.log("BEFORE", score);
      setScore(score + 1);
      console.log("After", score+1);
      if((score+1)>0){
        handleCertificateGeneration();
      }
    }
    setSelectedAnswer(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const StyledRadio = styled.input.attrs({
    type: "radio",
  })`
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 30%;
    background-color: #ddd; /* Default color */
    border: 0 solid #ccc; /* Default border */
    transition: background-color 0.2s ease-in-out; /* Add transition effect */

    &:checked {
      background-color: #38a3a5; /* Checked color */
      border-color: #38a3a5; /* Checked border color */
    }
  `;

  const StyledLabel = styled.label`
    margin-left: 5px;
    margin-top: 20px;
  `;
  const StyledCard = styled(Card)`
    border: 1px solid #ddd; /* Add thin border for better visual separation */
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    transition: transform 0.2s ease-in-out; /* Add smooth hover effect */
    margin: 10px; /* Add spacing between cards */
    width: 25%; /* Set card width to fit multiple cards in a row */
    display: inline-block; /* Arrange cards horizontally */

    &:hover {
      transform: scale(1.02); /* Slight scale up on hover */
    }

    @media (max-width: 768px) { /* Responsive design for smaller screens */
      width: 50%; /* Adjust card width for smaller screens */
    }

    @media (max-width: 576px) { /* Responsive design for even smaller screens */
      width: 100%; /* Make cards full-width on very small screens */
    }
  `;

  const StyledImage = styled(Image)`
    width: 100%; /* Ensure image fills the card width */
    height: 150px; /* Adjust height as needed */
    object-fit: cover; /* Crop image to fit within card, maintaining aspect ratio */
  `;


  return (
    <div className="quiz-container">


      {selectedSkill ? (
        <div className="quiz-content">
          {currentQuestion < selectedSkill.questions.length ? (
            <div className="question-container">
              <h3>{currentQuestion + 1}. {selectedSkill.questions[currentQuestion].question}</h3>
              <Form>
                {selectedSkill.questions[currentQuestion].options.map((option, index) => (
                  <FormGroup key={index}>
                    <StyledRadio
                      name="option"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => handleAnswerSelect(option)}
                    />
                    <StyledLabel>{option}</StyledLabel>
                  </FormGroup>
                ))}
              </Form>
              <Button onClick={handleNextQuestion} disabled={!selectedAnswer}>
                Next
              </Button>            
            </div>
          ) : (
            <div className="score-container">
              {
                score>0?<h2>Certificate is generated</h2>:<p>Reattempt the test</p>
              }
              <h3>Your Score: {score} out of {selectedSkill.questions.length}</h3>
            </div>
          )}
        </div>
      ):
      data.map((skill, index) => (
          <StyledCard onClick={() => handleCardClick(skill)}>
              <Card.Body>
                {skill.imageLink && ( // Conditionally render image if available
                  <CardImg height={"100px"} src={skill.imageLink} alt={skill.skillname} />
                )}
                <Card.Title>{skill.skillname}</Card.Title>
                <Card.Text>{skill.Desc}</Card.Text>
                <Card.Subtitle className="mb-2">Topics Included:</Card.Subtitle>
                <Card.Text>{skill.topicsIncluded.join(", ")}</Card.Text>
              </Card.Body>
            </StyledCard>
        ))
        }
    </div>
  );
}

export default NewSkills;


