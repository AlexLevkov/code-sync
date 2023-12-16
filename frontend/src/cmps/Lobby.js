import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import CodeBlock from './CodeBlock';

const Lobby = ({exercises,httpLink,socketLink,fetchData,setUserType}) => {
  
  useEffect(() =>{
    setUserType('student')
    // socket.emit('clean-up')
  },[])

  const deleteCodeBlock = async (id) =>{
    const result = window.confirm("Are you sure you want to proceed?")
    
    if(!result) return
      const response = await fetch(httpLink +'/'+ id, {
        method: 'DELETE'
    })
    
    const json = await response.json()
    if (response.ok){
      fetchData()
    }
 }

  return (
    <div>
      <div className='lesson-container'>
        {exercises && exercises.map((ex)=>{
        return <div key={ex._id} className='lesson-card animate__animated animate__backInDown'>
                <div className='lesson-header animate__fadeIn'>
                  <Link   to={`/lesson/${ex._id}`}>{ex.title} </Link>
                  <button className='delete-btn' onClick={()=>deleteCodeBlock(ex._id)}>X</button>
                </div>
                  <CodeBlock codeString={ex.content.substring(0, 50)+' ...'}/>
               </div>})}
      </div>  
    </div>
  )
}

export default Lobby
