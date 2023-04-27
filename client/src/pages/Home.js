import React from 'react'
import axios from "axios";
import {useEffect, useState} from "react";
import { useNavigate , Link} from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function Home() {
    const [listOfPosts,setListOfPosts] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        axios.get("http://localhost:3001/posts").then((response)=>{
        setListOfPosts(response.data.listOfPosts);
        });
      },[]);
      
      const likeAPost = (postId) =>{
        axios.post("http://localhost:3001/likes",{PostId:postId},
        {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) =>{
          setListOfPosts(listOfPosts.map((post) =>{
            if(post.id === postId) {
              if(response.data.liked) {
                return {...post, Likes: [...post.Likes,0]};
              } else {
                const likesArray =post.Likes;
                likesArray.pop();
                return {...post, Likes: likesArray};
              }
            } else{
              return post;
            }
          }))
        })
      }

  return (
    <div>
        {listOfPosts.map((value,key)=>{
      return <div key={[value.id]} className='post' > 
        <div className='title'>{value.title}</div>
        <div className='body' onClick={()=>{navigate(`/post/${value.id}`)}}>{value.postText}</div>
        <div className='footer'>
          <div className='username'><Link to={`/profile/${value.UserId}`}>{value.username}</Link></div>
        <div className='buttons'>
          <FavoriteBorderIcon className='likeBttn' onClick={() =>{likeAPost(value.id)}}
          //className={}
          />
          </div>
        <label>{value.Likes.length}</label></div>
      </div >})}
    </div>
  )
}

export default Home;