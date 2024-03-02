



import React, { useState, useEffect } from "react";
import { Button, Card, CardImg, Form, FormGroup, Modal } from "react-bootstrap";
import "./Skills.css"; // Import your CSS file
import styled from "styled-components";
import axios from "axios";

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
          question: "Which algorithm is used for regression problems?",
          options: ["Linear Regression", "Logistic Regression", "Decision Tree", "Support Vector Machine"],
          correctAnswer: "Linear Regression"
        },
        {
          question: "What is the purpose of cross-validation in machine learning?",
          options: ["To train the model on multiple subsets of the data", "To evaluate the model's performance on unseen data", "To prevent overfitting", "All of the above"],
          correctAnswer: "All of the above"
        },
        {
          question: "What is overfitting in machine learning?",
          options: ["When a model learns the training data too well but performs poorly on new data", "When a model performs well on the training data and new data", "When a model underfits the training data", "None of the above"],
          correctAnswer: "When a model learns the training data too well but performs poorly on new data"
        },
        {
          question: "Which evaluation metric is commonly used for classification problems?",
          options: ["Mean Absolute Error", "Mean Squared Error", "Accuracy", "R-squared"],
          correctAnswer: "Accuracy"
        },
        {
          question: "What is the purpose of feature scaling in machine learning?",
          options: ["To standardize the range of independent variables", "To normalize the range of dependent variables", "To increase the number of features", "To decrease the complexity of the model"],
          correctAnswer: "To standardize the range of independent variables"
        },
        {
          question: "What is the difference between supervised and unsupervised learning?",
          options: ["Supervised learning requires labeled data, while unsupervised learning does not", "Unsupervised learning requires labeled data, while supervised learning does not", "Supervised learning uses reinforcement learning, while unsupervised learning does not", "There is no difference between them"],
          correctAnswer: "Supervised learning requires labeled data, while unsupervised learning does not"
        },
        {
          question: "Which algorithm is used for clustering?",
          options: ["Linear Regression", "K-Means", "Logistic Regression", "Decision Tree"],
          correctAnswer: "K-Means"
        },
        {
          question: "What is the purpose of regularization in machine learning?",
          options: ["To reduce overfitting", "To increase model complexity", "To decrease model performance", "To decrease the number of features"],
          correctAnswer: "To reduce overfitting"
        },
        {
          question: "What is ensemble learning?",
          options: ["A machine learning method where multiple models are combined to improve performance", "A method to prevent overfitting", "A technique to reduce model complexity", "A way to decrease the number of features"],
          correctAnswer: "A machine learning method where multiple models are combined to improve performance"
        }
      ],
      topicsIncluded: ["Algorithms", "Data Analysis", "Modeling"],
    },
    {
      skillname: "Cloud Computing",
      imageLink: "https://th.bing.com/th/id/OIP.5Hp0doeT1hsUMAHAQNPXHQHaHa?rs=1&pid=ImgDetMain",
      Desc: "Harness the power of cloud-based infrastructure and services.",
      questions: [
        {
          question: "What is cloud computing?",
          options: ["The delivery of computing services over the Internet.", "A network of remote servers hosted on the Internet.", "A model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources.", "All of the above."],
          correctAnswer: "All of the above."
        },
        {
          question: "What are the key benefits of cloud computing?",
          options: ["Cost savings", "Scalability", "Flexibility", "All of the above"],
          correctAnswer: "All of the above"
        },
        {
          question: "What are the main service models in cloud computing?",
          options: ["Infrastructure as a Service (IaaS)", "Platform as a Service (PaaS)", "Software as a Service (SaaS)", "All of the above"],
          correctAnswer: "All of the above"
        },
        {
          question: "What is the difference between public, private, and hybrid clouds?",
          options: ["Public clouds are owned and operated by third-party providers, private clouds are used exclusively by one organization, and hybrid clouds combine public and private clouds.", "Public clouds are used exclusively by one organization, private clouds are owned and operated by third-party providers, and hybrid clouds combine public and private clouds.", "Public clouds are owned and operated by one organization, private clouds are used exclusively by one organization, and hybrid clouds combine public and private clouds.", "There is no difference between them."],
          correctAnswer: "Public clouds are owned and operated by third-party providers, private clouds are used exclusively by one organization, and hybrid clouds combine public and private clouds."
        },
        {
          question: "What is virtualization in cloud computing?",
          options: ["A technique used to create a virtual version of a computer resource", "A way to optimize network performance", "A method to secure cloud data", "All of the above"],
          correctAnswer: "A technique used to create a virtual version of a computer resource"
        },
        {
          question: "What is an example of a popular cloud computing provider?",
          options: ["Amazon Web Services (AWS)", "Microsoft Office 365", "Google Drive", "All of the above"],
          correctAnswer: "Amazon Web Services (AWS)"
        },
        {
          question: "What is auto-scaling in cloud computing?",
          options: ["Automatically adjusting the number of computing resources in response to demand", "Automatically backing up data to multiple locations", "Automatically encrypting sensitive data", "All of the above"],
          correctAnswer: "Automatically adjusting the number of computing resources in response to demand"
        },
        {
          question: "What is serverless computing?",
          options: ["A cloud computing model where the cloud provider manages the infrastructure", "A way to reduce energy consumption in data centers", "A method to optimize database performance", "None of the above"],
          correctAnswer: "A cloud computing model where the cloud provider manages the infrastructure"
        },
        {
          question: "What is a cloud-native application?",
          options: ["An application designed specifically to run in the cloud environment", "An application that requires a physical server to operate", "An application that only uses on-premises infrastructure", "None of the above"],
          correctAnswer: "An application designed specifically to run in the cloud environment"
        },
        {
          question: "What is data sovereignty in cloud computing?",
          options: ["The concept that data is subject to the laws and regulations of the country where it is located", "The practice of storing data in multiple locations for redundancy", "The encryption of data to protect it from unauthorized access", "None of the above"],
          correctAnswer: "The concept that data is subject to the laws and regulations of the country where it is located"
        }
      ],
      topicsIncluded: ["AWS", "Azure", "GCP", "Virtualization"]
    },
    {
      skillname: "MERN Stack",
      imageLink: "https://th.bing.com/th/id/OIP.PMBiSa-JBIhSrPqckRRxyQHaEK?rs=1&pid=ImgDetMain",
      Desc: "The MERN stack is a JavaScript stack - MongoDB, Express.js, React, and Node.js.",
      questions: [
        {
          question: "What does MERN stand for?",
          options: ["MongoDB, Express.js, React, Node.js", "MySQL, Express.js, React, Node.js", "MongoDB, Ember.js, React, Node.js", "MongoDB, Express.js, Ruby, Node.js"],
          correctAnswer: "MongoDB, Express.js, React, Node.js"
        },
        {
          question: "Which component of the MERN stack is used for server-side programming?",
          options: ["MongoDB", "Express.js", "React", "Node.js"],
          correctAnswer: "Node.js"
        },
        {
          question: "Which database is commonly used with the MERN stack?",
          options: ["MySQL", "MongoDB", "SQLite", "PostgreSQL"],
          correctAnswer: "MongoDB"
        },
        {
          question: "What is React in the MERN stack used for?",
          options: ["Backend development", "Database management", "Frontend development", "Server configuration"],
          correctAnswer: "Frontend development"
        },
        {
          question: "What role does Express.js play in the MERN stack?",
          options: ["Database management", "Frontend development", "Backend development", "Server configuration"],
          correctAnswer: "Backend development"
        },
        {
          question: "Which technology is used for creating user interfaces in the MERN stack?",
          options: ["React", "Express.js", "Node.js", "MongoDB"],
          correctAnswer: "React"
        },
        {
          question: "What is the primary language used in Node.js?",
          options: ["Python", "JavaScript", "Java", "C++"],
          correctAnswer: "JavaScript"
        },
        {
          question: "What does MongoDB provide in the MERN stack?",
          options: ["A server environment", "A frontend framework", "A database system", "A build tool"],
          correctAnswer: "A database system"
        },
        {
          question: "Which of the following is NOT part of the MERN stack?",
          options: ["Angular", "React", "MongoDB", "Express.js"],
          correctAnswer: "Angular"
        },
        {
          question: "What does Node.js provide in the MERN stack?",
          options: ["A database system", "A server environment", "A frontend framework", "A build tool"],
          correctAnswer: "A server environment"
        }
      ],
      topicsIncluded: ["MongoDB", "Express.js", "React", "Node.js"]
    },
    {
      skillname: "Spring Boot",
      imageLink: "https://th.bing.com/th/id/R.886e10b740fd83dc8b37159999437c36?rik=NqnuNYV7drhdnA&pid=ImgRaw&r=0",
      Desc: "Spring Boot is an open-source Java-based framework.",
      questions: [
        {
          question: "What is Spring Boot?",
          options: ["A JavaScript framework", "A Python framework", "An open-source Java-based framework", "A PHP framework"],
          correctAnswer: "An open-source Java-based framework"
        },
        {
          question: "What does Spring Boot simplify?",
          options: ["Database management", "Security implementation", "RESTful web services development", "All of the above"],
          correctAnswer: "All of the above"
        },
        {
          question: "Which of the following is NOT a key feature of Spring Boot?",
          options: ["Automatic configuration", "Production-ready applications", "Embedded servlet containers", "Explicit XML configuration"],
          correctAnswer: "Explicit XML configuration"
        },
        {
          question: "What is Spring Boot Starter?",
          options: ["A tool for building RESTful APIs", "A library containing pre-configured dependencies", "A database management system", "A framework for frontend development"],
          correctAnswer: "A library containing pre-configured dependencies"
        },
        {
          question: "What is the primary programming language used in Spring Boot?",
          options: ["JavaScript", "Python", "Java", "Ruby"],
          correctAnswer: "Java"
        },
        {
          question: "Which of the following is a benefit of using Spring Boot?",
          options: ["Decreased development speed", "Increased complexity of applications", "Decreased productivity", "None of the above"],
          correctAnswer: "None of the above"
        },
        {
          question: "What does Spring Boot Actuator provide?",
          options: ["Embedded HTTP server", "A build tool", "Monitoring and management endpoints", "Database management tools"],
          correctAnswer: "Monitoring and management endpoints"
        },
        {
          question: "What does Spring Boot Data JPA provide?",
          options: ["An embedded database", "A database management tool", "A framework for building RESTful APIs", "An abstraction layer on top of JPA"],
          correctAnswer: "An abstraction layer on top of JPA"
        },
        {
          question: "What is the purpose of Spring Boot DevTools?",
          options: ["To enable hot swapping of code changes", "To manage dependencies", "To provide database management tools", "To configure security settings"],
          correctAnswer: "To enable hot swapping of code changes"
        },
        {
          question: "Which of the following is NOT a dependency management tool commonly used with Spring Boot?",
          options: ["Maven", "Gradle", "Ant", "SBT"],
          correctAnswer: "Ant"
        }
      ],
      topicsIncluded: ["Spring Framework", "Java & Backend Development"]
    },
    {
      skillname: "Blockchain",
      imageLink: "https://th.bing.com/th/id/R.5fc5f3bcc00cf6b5f2823bad25e056a1?rik=AK%2f4ES0mGiDlZg&pid=ImgRaw&r=0",
      Desc: "Blockchain is a decentralized, distributed ledger technology that records transactions",
      questions: [
        {
          question: "What is Blockchain?",
          options: ["A centralized database", "A decentralized, distributed ledger technology", "A social media platform", "An email service provider"],
          correctAnswer: "A decentralized, distributed ledger technology"
        },
        {
          question: "What is the primary purpose of Blockchain?",
          options: ["To store and manage data", "To facilitate peer-to-peer payments", "To secure transactions and records", "To provide cloud computing services"],
          correctAnswer: "To secure transactions and records"
        },
        {
          question: "What does a block in Blockchain contain?",
          options: ["Encrypted data", "Hash of the previous block", "Transaction data", "All of the above"],
          correctAnswer: "All of the above"
        },
        {
          question: "What consensus mechanism is used in Bitcoin Blockchain?",
          options: ["Proof of Work (PoW)", "Proof of Stake (PoS)", "Delegated Proof of Stake (DPoS)", "Proof of Authority (PoA)"],
          correctAnswer: "Proof of Work (PoW)"
        },
        {
          question: "What is a smart contract in Blockchain?",
          options: ["A legally binding agreement", "A self-executing contract with the terms of the agreement between buyer and seller being directly written into lines of code", "A contract that is automatically enforced by a centralized authority", "A contract that requires human intervention to execute"],
          correctAnswer: "A self-executing contract with the terms of the agreement between buyer and seller being directly written into lines of code"
        },
        {
          question: "What is a private Blockchain?",
          options: ["A Blockchain that is open to everyone", "A Blockchain operated by a single organization or consortium", "A Blockchain with restricted access", "A Blockchain without encryption"],
          correctAnswer: "A Blockchain operated by a single organization or consortium"
        },
        {
          question: "What role do miners play in Blockchain?",
          options: ["Recording transactions", "Validating transactions and adding them to the Blockchain", "Encrypting data", "Decentralizing the network"],
          correctAnswer: "Validating transactions and adding them to the Blockchain"
        },
        {
          question: "What is a fork in Blockchain?",
          options: ["A tool used for mining cryptocurrency", "A divergence in the Blockchain", "A type of smart contract", "A security vulnerability"],
          correctAnswer: "A divergence in the Blockchain"
        },
        {
          question: "What is the main advantage of Blockchain?",
          options: ["Centralized control", "Transparency", "Slow transaction speed", "High transaction fees"],
          correctAnswer: "Transparency"
        },
        {
          question: "What is the role of a node in Blockchain?",
          options: ["Creating new blocks", "Validating and relaying transactions", "Executing smart contracts", "Setting consensus rules"],
          correctAnswer: "Validating and relaying transactions"
        }
      ],
      topicsIncluded: ["Cryptocurrency", "Smart Contracts", "Consensus Mechanisms"]
    }
  ]
};            


function NewSkills() {
  const [data, setData] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [skillId, setSkillId] = useState(0);

  useEffect(() => {
    // Simulate fetching data from an API (replace with actual API call)
    setData(fetchedData.skills);
  }, []);

  const handleCardClick = async (skill, index) => {
    setSelectedSkill(skill);
    console.log(skill)
    skill = await axios.post("http://localhost:5000/genai/getQuestionSkill", {
      skill: skill.skillname,
      questions: 10
    })
    setSelectedSkill(skill.data)
    setSkillId(index);
    setShowConfirmation(true);
  };

  const handleStartQuiz = () => {
    setCancel(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowConfirmation(false);
  };

  const handleNextQuestion = async() => {
    if (selectedAnswer === selectedSkill.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    const user = JSON.parse(localStorage.getItem("user"));
    console.log({userId: user.userId, skillId: skillId}, "fds");
    if((score+1)>7){
      let result = await axios.post("http://localhost:4000/certificate/create", {userId: user.userId, skillId: skillId})
      console.log("Cert", result);
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

  return (
    <div className="quiz-container">
      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to start the quiz for {selectedSkill && selectedSkill.skillname}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        </Modal.Footer>
      </Modal>

      {(selectedSkill&&cancel) && !showConfirmation ? (
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
              {score>5?<h1>Certifcate Generated</h1>:<h1>Test failed</h1>}
              <h3>Your Score: {score} out of {selectedSkill.questions.length}</h3>
            </div>
          )}
        </div>
      ) : (
        <div className="row">
          {data.map((skill, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <Card onClick={() => handleCardClick(skill, index)} className="custom-card">
                <Card.Body>
                  {skill.imageLink && (
                    <CardImg height={"100px"} src={skill.imageLink} alt={skill.skillname} />
                  )}
                  <Card.Title>{skill.skillname}</Card.Title>
                  <Card.Text>{skill.Desc}</Card.Text>
                  <Card.Subtitle className="mb-2">Topics Included:</Card.Subtitle>
                  <Card.Text>{skill.topicsIncluded.join(", ")}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
      {score}
    </div>
  );
}

export default NewSkills;
