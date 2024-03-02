import React, { useState } from 'react'
import './Writing.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function Writing() {
  const [start, setStart] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [score, setScore] = useState("")

  async function getQuestion(){
    var qsn = await axios.get("http://localhost:5000/genai/get-question")
    setQuestion(qsn.data)
  }
  async function evalAns(){
    var score = await axios.post("http://localhost:5000/genai/evaluate", {
      question: question,
      answer: answer
    })
    setScore("Score:"+score.data)
  }

  return start ? <div className='d-flex flex-column justify-content-center'>
    {
      score == "" ? <React.Fragment>        
        <h5 className='text-center mt-4'>Question: {question}</h5>
        <textarea value={answer} rows={10} cols={100} onChange={(e)=>setAnswer(e.target.value)} className='mx-auto' type="text" />
        <button className='mt-4 rounded' style={{
          width: "100px",
          margin: "auto"
        }} onClick={()=>evalAns()}>Evaluate</button>
      </React.Fragment>:
      <h4 className='text-center mt-4'>{score}</h4>
    }
  </div> :
    <div className='m-4 d-flex flex-column justify-content-center align-items-center'>
      <h5>Evaluate your Analytical Writing Assessment score to show recruiters your writing or communication skills.</h5>
      <Button style={{width: "300px"}} onClick={()=>{
        setStart(true)
        getQuestion()
      }}>Start</Button>
    </div>
}

export default Writing