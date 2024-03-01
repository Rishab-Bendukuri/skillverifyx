

function AddSkill(){
    return(
        <>
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
              <h3>Your Score: {score} out of {selectedSkill.questions.length}</h3>
            </div>
          )}
        </div>
        </>
    );
}