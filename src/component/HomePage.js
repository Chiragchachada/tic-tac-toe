import {useNavigate} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import React,{useState, useEffect} from "react";


export default function HomePage(props){
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
     function  handleToStartPage(){
        navigate("/startpage")
      }
    return(
        <div className="homepage h-screen">
          <div className=" mt-2 mr-2 float-right">{showLogout()}</div>

<div className="border-2 form w-1/4 rounded-2xl p-2 float-right mr-16 mt-72 bg-white opacity-30">
        <div className=" flex flex-col text-2xl mt-4">
          
          <input type="text"
           value={props.firstPlayer} 
          onChange={(e)=>props.updateFirstPlayer(e.target.value)}
          required
          placeholder="First Player Name" 
          className="border-2 bg-gray-300 placeholder-black text-center font-semibold hover:bg-gray-400 mt-2 rounded-full p-2"/>
        </div>

        <div className=" flex flex-col text-2xl mt-4">
          
          <input type="text"
           value={props.secondPlayer} 
          onChange={(e)=>props.updateSecondPlayer(e.target.value)}
          required
          placeholder="Second Player Name" 
          className="border-2 bg-gray-300 placeholder-black text-center font-semibold hover:bg-gray-400 mt-2 rounded-full p-2"/>
        </div>

        <button className="p-2 border-2 text-xl font-semibold mt-4 bg-gray-400 hover:bg-gray-500 rounded-3xl" onClick={()=>handleToStartPage()}> Submit</button>

      </div>
     

        </div>
    )
}