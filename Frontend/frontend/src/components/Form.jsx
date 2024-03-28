/* eslint-disable react/prop-types */
import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import '../styles/form.css'
import LoadingIndicator from "./LoadingIndicator"
 
 function Form({ route, method }) {
    const [username , setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register";


   const handlSubmit =  async(e) => {
    setLoading(true)
    e.preventDefault()

    try {
        const res = await  api.post(route, { username, password })
        if (method === 'login'){
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/")
        }else{
            navigate("/login")
        }
    }
    catch (error){
        alert(error)
        setLoading(false)
    }
    finally{
        setLoading(false)
    }
   } 
   return <form onSubmit={handlSubmit} className="form-container">
    <h1>{name}</h1>
    <div className="form-group">
      <label>Username</label>
      <input
        type="text"
        className="form-input"
        value={username}
        placeholder="UserName"
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label>Password</label>
      <input
    
        type="password"
        className="form-input"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    {loading && <LoadingIndicator />}
    <button type="submit" className="form-button" >
      {name}
    </button>
   
   </form>
 }
 
 export default Form;