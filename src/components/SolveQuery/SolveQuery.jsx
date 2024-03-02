import React, { useState } from "react";
import "./SolveQuery.css";
import axios from "axios";

function SolveQuery() {
  const [chat, setChat] = useState({
    data: [],
  });
  const [db, setDb] = useState("python")
  const [accept, setAccept] = useState(true)

  async function getAns(query){
    return (await axios.post("http://localhost:5000/genai/kbq", {
        query: query,
        db: db
    })).data
  }

  const [query, setQuery] = useState("")

  return <div>
    <div id="ChatWindow" className="p-4">
        {
            chat.data.map((e, i)=>
            <div key={i} className={`d-flex text-white ${i%2==0 ? "justify-content-start":"justify-content-end"}`}>
                <div className={`${i%2==0 ? "bg-success": "bg-secondary"} m-2 p-2 rounded d-inline-block`}>{e}</div><br/>
            </div>
            )
        }
    </div>
    <form onSubmit={async (e)=>{
        setAccept(false)
        e.preventDefault()
        setChat({
            data: [...chat.data, query, await getAns(query)]
        })
        setQuery("")
        setAccept(true)
        }} style={{
        height: "100px",
        width: "100vw",
        backgroundColor: "black"
    }} id="queryInput" className="position-fixed bottom-0 d-flex align-items-center">
        <select onChange={(e)=>{
            if(accept) setDb(e.target.value)
            }} className="h-25 ms-2" name="topic" id="topic">
            <option value="python">Python</option>
            <option value="java">Java</option>
        </select>

        <input value={query} onChange={(e)=>setQuery(e.target.value)} className="m-2" type="text" placeholder="Search query" />
        <button type="submit" className="m-2 rounded d-flex justify-content-center" style={{width: 45}}>
            <div dangerouslySetInnerHTML={{ __html: "&#xe163;" }} />
        </button>
    </form>
  </div>;
}

export default SolveQuery;
