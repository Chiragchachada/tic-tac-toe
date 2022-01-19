import { useState } from "react"
import {auth} from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";



export default function Login(){
const [ emailId, updateEmailId]= useState();
const [ password, updatePassword]= useState();
let navigate = useNavigate();

async function loginUser(e){
    e.preventDefault()
  try{
       const res = await signInWithEmailAndPassword(auth, emailId, password)
       console.log("response", res);
       navigate("/homepage")
  }catch(err){
      console.log("Error in login", err);

  }

}

    return(
        <div className="login flex  justify-center items-center h-screen ">

            <div className="border-2 rounded-xl bg-white opacity-60 w-1/4 h-1/2">
                <p className="mt-4"> Sign in to your account</p>
              <form>
                <div className="mt-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={emailId}
                  required
                  onChange={(e)=>updateEmailId(e.target.value)}
                  autoComplete="email"
                  className=" rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                </div>

                <div className="mt-8">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="password-address"
                  name="password"
                  type="password"
                  value={password}
                  required

                  onChange={(e)=>updatePassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder=" password"
                />
                </div>

                <div>
                    <button className="group relative mt-8 w-full flex justify-center py-2 px-4 border border-transparent mt-2  rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"  onClick={(e)=>loginUser(e)}>Log In</button>
                </div>

                <div className="mt-8"> 
                Not registered yet?
              <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent mt-2  rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={()=>navigate("/registeration")}> Register Now
              </button>
            </div>
                </form>

            </div>

          
        </div>
        
    )
}