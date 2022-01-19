import SquareComponent from "./SquareComponent";
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
const initialState = ["", "", "", "", "", "", "", "", ""]



export default function GamePage(props){
    const [gameState, updateGameState] = useState(initialState);
    const [isXchance, updateIsXChance] = useState(false);
    const [isLoggedIn, updateIsLoggedIn] = useState(false);

    let navigate = useNavigate();


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


    function onSquareClicked(index){
        let strings = Array.from(gameState);
        strings[index]= isXchance ? "X" : "O"
        updateGameState(strings);
        updateIsXChance(!isXchance);

    }

    useEffect(()=>{
       const winner= checkWinner();
       if(winner){
           alert(`Ta da! ${winner} has won the game!`)
           updateGameState(initialState)
       }
      },[gameState])

      function checkWinner(){
          const lines = [
              [0, 1, 2],
              [3, 4, 5],
              [6, 7, 8],
              [0, 3, 6],
              [1, 4, 7],
              [2, 5, 8],
              [0, 4, 8],
              [2, 4, 6],
          ];
          for(let i=0; i < lines.length; i++){
              const [a, b, c] = lines[i];
              if(gameState[a] && gameState[a]=== gameState[b] && gameState[a] === gameState[c]){
                  return gameState[a];
              }
          }
          return null;      }

    return(
        <div className="game-page h-screen flex  ">
                    <div className="  float-right ">{showLogout()}</div>

         <div className="  w-full m-4 flex  ">


             <div className="w-40  flex text-2xl flex-col font-bold ">
                 <span>{props.firstPlayer}</span>
                 <span></span>
                 
                 </div>
             
             <div className="  flex w-full justify-center flex-col  items-center">
             <div className="  rounded-2xl h-1/2  border-8 border-purple-500 hover:border-gray-500 text-3xl w-1/2 flex flex-col  font-bold justify-center items-center  ">
                 
                 <div className="flex ">
                     <SquareComponent className="border-b-4 flex justify-center items-center border-r-4 h-4 w-4 p-8" state={gameState[0]} onClick={()=>onSquareClicked(0)}/>
                     <SquareComponent className="border-b-4 flex justify-center items-center border-r-4  h-4 w-4 p-8" state={gameState[1]} onClick={()=>onSquareClicked(1)}/>
                     <SquareComponent className="border-b-4  flex justify-center items-center h-4 w-4 p-8" state={gameState[2]} onClick={()=>onSquareClicked(2)}/>
                </div>

                <div className="flex ">
                     <SquareComponent className="border-b-4 border-r-4 items-center flex justify-center  h-4 w-4 p-8" state={gameState[3]} onClick={()=>onSquareClicked(3)}/>
                     <SquareComponent className="border-b-4 border-r-4 items-center flex justify-center h-4 w-4 p-8" state={gameState[4]} onClick={()=>onSquareClicked(4)}/>
                     <SquareComponent className="border-b-4  h-4 flex items-center justify-center w-4 p-8" state={gameState[5]} onClick={()=>onSquareClicked(5)}/>
                </div>

                <div className="flex">
                     <SquareComponent className="border-r-4 flex justify-center items-center h-4 w-4 p-8" state={gameState[6]} onClick={()=>onSquareClicked(6)}/>
                     <SquareComponent className="border-r-4 flex justify-center items-center h-4 w-4 p-8" state={gameState[7]} onClick={()=>onSquareClicked(7)}/>
                     <SquareComponent className="p-8 flex justify-center items-center h-4 w-4" state={gameState[8]} onClick={()=>onSquareClicked(8)}/>
                </div>



             </div>

             <button className="p-2 m-4 rounded-xl font-bold text-indigo-700 px-4 border-2 bg-white hover:bg-purple-600" onClick={()=>updateGameState(initialState)}>Clear</button>
             </div>
             <div className="flex w-40 text-2xl flex-col font-bold ">
                 <span>{props.secondPlayer}</span>
                 <span></span>
                 
                 </div>
                 


         </div>

        </div>
    )
}