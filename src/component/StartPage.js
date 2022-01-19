import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";


export default function StartPage(){

    let navigate = useNavigate();

    const [isLoggedIn, updateIsLoggedIn] = useState(false);

    useEffect(()=>{
      onAuthStateChanged(auth, (user)=>{
        if (user) {
          console.log("user", user);
          
          //User is signed in, see docs for a list of available properties
          updateIsLoggedIn(true)
        } else{
          //User is signed out
          updateIsLoggedIn(false)
  
        }
      })
    },[])
      
      function logOut(e){
        signOut(auth).then(()=>{
          navigate("/")
          //Sign-out successful
        })
        .catch((error)=>{
          //An error Occured
          console.log("Error in logout", error);
        })
    
        
    }
        
  
       function showLogout(){
        if(isLoggedIn === true){
          return(
            
            <button className="rounded-xl p-2 bg-white" onClick={(e)=>logOut(e)}>Log out</button>
          
          )
    
        }
  
       }

    function startGamePage(){
        navigate("/gamepage")
    }
    return(
        <div className="startpage flex flex-col h-screen ">
          <div className=" mt-2 mr-2 float-right">{showLogout()}</div>
             <div className="flex justify-center items-end w-full h-full ">
            <div className="mb-40 text-indigo-800 ">
            <button className="p-2 bg-white hover:bg-red-800 rounded-3xl px-8  text-2xl font-bold " onClick={()=>startGamePage()}>Let's Play</button>
            </div>
            </div>

        </div>
    )
}