import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';

function Profile() {
    let {id} = useParams();
    let navigate = useNavigate();
    const [username,setUsername] = useState("");
    const[listOfPosts,setListOfPosts] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) =>{
        setUsername(response.data.username);

        axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) =>{
        setListOfPosts(response.data);
        })
        })
    },[id])
  return (
    <div className='profilePageContainer'>
        <div className='basicInfo'><h1> Username:{username}</h1>
        <button onClick={() =>{navigate('/changepassword')}}>Change your password!</button></div>
        <div className='listOfPosts'>
        {listOfPosts.map((value,key)=>{
      return <div key={[value.id]} className='post' > 
        <div className='title'>{value.title}</div>
        <div className='body' onClick={()=>{navigate(`/post/${value.id}`)}}>{value.postText}</div>
        <div className='footer'>
          <div className='username'>{value.username}</div>
        <div className='buttons'>
          
          </div>
        <label>{value.Likes.length}</label></div>
      </div >})}
        </div>
        

    </div>
  )
}

export default Profile