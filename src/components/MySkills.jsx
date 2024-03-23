import axios from "axios";
import { useEffect, useState } from "react";
import { fetchedData } from "./QuizData";
import { Card, CardImg } from "react-bootstrap";

function MySkills(){

    const [certIds, setCertIds] = useState([]);
    const skillnames = ["Machine Learning", "Cloud Computing", "MERN Stack","Spring Boot","Blockchain",]

    const [userData, setUserData] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        let data;
        const getUserData = async()=>{
            data = await axios.get(`http://localhost:4000/users/user/${JSON.parse(localStorage.getItem("user")).userId}`);
            console.log("data",data.data);
        }

        getUserData();
        setTimeout(()=>setUserData(data.data), 2000);
        const skillIds = [0,1,2,3,4];

        const certi = [];
        console.log(`http://localhost:4000/certificate/verify/${JSON.parse(localStorage.getItem("user")).userId}/1`)
        skillIds.map(async(id)=>{
            const cert = await axios.get(`http://localhost:4000/certificate/verify/${JSON.parse(localStorage.getItem("user")).userId}/${id}`);
            console.log("Cert", cert.data);
            if(cert.data=="Valid"){
            certi.push(id);
            
            console.log(certi, "certi")
            }
        })
        setTimeout(()=>{            
            setLoading(false)
            setCertIds(certi)
        }, 2000);
    }, [])

    return(
        <div className="m-4">
            {
                loading && <div>Loading...</div>
            }
            {
                !loading && certIds.length == 0 && <div>No skills found!</div>
            }
            {certIds.map(
                (value, index)=>
                     <>
                     <div key={index} className="col-lg-3 col-md-6 mb-4">

                     <Card className="custom-card">
                        <div className="position-relative">
                            {fetchedData.skills[value].imageLink && (
                            <CardImg height={"100px"} src={fetchedData.skills[value].imageLink} alt={fetchedData.skills[value].skillname} />
                            )}
                            <img
                            alt="Coursecompletedimg"
                            src="https://th.bing.com/th/id/OIP.t2KkQk0S6FwrRkCk6Djh9QHaHa?w=740&h=740&rs=1&pid=ImgDetMain"
                            className="position-absolute top-0 end-0"
                            style={{ width: "30%" }}
                            />
                        </div>
                        <Card.Body>
                        {/* {modalData.endorsedSkills.some(endorsement => endorsement == parseInt(value))?
                        <p>Endorsed By{modalData.endorsements[modalData.endorsedSkills.indexOf(value.toString())]}</p>:
                     
                      <Button className='button' onClick={() => handleEndorsement(modalData, value)}>Endorse skills</Button>
                    } */}
                            <Card.Title>{fetchedData.skills[value].skillname}</Card.Title>
                            <Card.Subtitle className="mb-2">Topics Covered:</Card.Subtitle>
                            <Card.Text>{fetchedData.skills[value].topicsIncluded.join(", ")}</Card.Text>
                            {
                                console.log(userData[1][userData[0].indexOf(value.toString())]==undefined)
                            }
                            <Card.Text>Endorsed by:<br/> {userData[1][userData[0].indexOf(value.toString())]!=undefined?userData[1][userData[0].indexOf(value.toString())]:"No endorsements"}</Card.Text>
                        </Card.Body>
                    </Card>


                        </div>
                    </>
                )}
                {/* {fetchedData.skills[certIds[0]].skillname} */}
            {/* {certIds.map((skillId, index) => (
                <Card className="custom-card">
                    <Card.Body>
                    {fetchedData.skills.skills[certIds].imageLink && (
                        <CardImg height={"100px"} src={skill.imageLink} alt={skill.skillname} />
                    )}
                    <Card.Title>{skill.skillname}</Card.Title>
                    <Card.Text>{skill.Desc}</Card.Text>
                    <Card.Subtitle className="mb-2">Topics Included:</Card.Subtitle>
                    <Card.Text>{skill.topicsIncluded.join(", ")}</Card.Text>
                    </Card.Body>
                </Card>
                
          ))} */}
        </div>
    )
}

export default MySkills;