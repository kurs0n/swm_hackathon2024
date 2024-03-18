import * as React from "react";
import { useEffect,useState } from "react";
import './mainAppStyles.css'
import userPicture from '../graphics/user.png'
import axios from 'axios';

function FloatingUsername(){
    const[state,setState]= useState({
        firstname: "Patryk",
        lastname: "Kurek"
    });
    useEffect(()=>{
        const getData = async()=>{
            const res = await axios.get('http://localhost:8080/users',{headers:{
                "Authorization": "Bearer "+localStorage.getItem("access_token") 
            }});
            setState({
                firstname: res.data.firstname,
                lastname: res.data.lastname
            })
        } 
        try{
            getData();
        }
        catch(err){ 
            console.log(err);
        }

    },[]);
    return(
        <div className="floatingUsername">
            <img src={userPicture} alt="UserPicture" width={25} height={25}/>
            <p>{state.firstname} {state.lastname}</p>
        </div>
    );

}

export default FloatingUsername;