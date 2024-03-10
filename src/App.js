import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { signInWithGoogle } from './Firebase'


axios.defaults.baseURL="http://localhost:8000/v1"

export default function App() {

const [name,setName]=useState()
const [email,setEmail]=useState()
const [mobile,setMobile]=useState()
const[age,setAge]=useState()
const[userid,setuserid]=useState()
const[alldata,setAlldata]=useState([])
const[popup,setPopup]=useState(false)
const[id,setId]=useState()
const[err,setErr]=useState()

const GetAllData=async ()=>{
  const existing=localStorage.getItem("id")
  const alldatas=await axios.get(`/crud/${existing}`)
  setAlldata(alldatas.data)
  console.log(alldatas)
  setuserid(localStorage.getItem("id"))

}

const SubmitData=(e)=>{
  e.preventDefault()


  if(!localStorage.getItem("id")){
    setErr("login first")
  }
  else{
    const datas=[{name,email,mobile}]
    const postedData= axios.post('/crud',{name:name,email:email,number:mobile,age:age,userid:userid})
    console.log(datas)
    setErr("")

    GetAllData()
  }
 
}

const delThis=async(e)=>{
  const del=await axios.delete(`/crud/${e}`)
  GetAllData()
}

useEffect(()=>{
  GetAllData()
},[])




const Update=(item)=>{
  setPopup(true)
  setName(item.name)
  setEmail(item.email)
  setMobile(item.mobile)
  setId(item._id)
  console.log(id)
}

const updateData=async (e)=>{
  e.preventDefault()
const update=await axios.put(`/crud/${id}`,{name:name,email:email,number:mobile,age:age,userid:userid})
GetAllData()
setPopup(false)
}

const LogOut=()=>{
  localStorage.clear()
  window.location.reload();
}




  return (
    <>
    <header>
  <h1 className='logo'>Logo</h1>
  <nav>
    <ul>
      <li>Home</li>
      <li>About Us</li>
      <li>Services</li>
      <li>Contact Us</li>
      <li>
        <div className='authendication'>
        {alldata && alldata.length>0? <div className='UserDetails'>
  <img src={localStorage.getItem("dp")}/>
  <div className='detail'>
  <p>{localStorage.getItem("name")}</p>
  <p>{localStorage.getItem("email")}</p>
</div> 
</div>
:
<button onClick={signInWithGoogle}>Sign In With Google</button>


}
        </div>
      </li>
    </ul>
  </nav>
</header>
    <div className='main'>



<h1>This is CRUD Method</h1>





{alldata && alldata.length>0?<button onClick={LogOut}>Logout</button>:""}

<form onSubmit={SubmitData}>
  <div>
    <label>Name</label> <input type='text' placeholder='Enter Name' onChange={(e)=>setName(e.target.value)}/>
  </div>
  <div>
    <label>Email</label> <input type="email" placeholder='Enter Mail'  onChange={(e)=>setEmail(e.target.value)}/>
  </div>
  <div>
    <label>Number</label> <input type='number' placeholder='Enter Number'  onChange={(e)=>setMobile(e.target.value)}/>
  </div>
  <div>
    <label>Age</label> <input type='number' placeholder='Enter Number'  onChange={(e)=>setAge(e.target.value)}/>
  </div>
  {err}
  <button type='submit' value="Submit">Submit</button>

</form>

<table>
<tr>
  <td>name</td>
  <td>email</td>
  <td>number</td>
  <td>update</td>
  <td>delete</td>
</tr>
{alldata &&
  alldata.map((item)=>(
    <tr>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.number}</td>
      <td>{item.age}</td>

      <td><button onClick={()=>Update(item)}>Update</button></td>
      <td><button onClick={()=>delThis(item._id)}>Delete</button></td>
    </tr>
  ))
}
</table>
{popup &&
<div className='popup'>
<form onSubmit={updateData}>
  <div>
    <label>Name</label> <input type='text' value={name} placeholder='Enter Name' onChange={(e)=>setName(e.target.value)}/>
  </div>
  <div>
    <label>Email</label> <input type="email" value={email} placeholder='Enter Mail'  onChange={(e)=>setEmail(e.target.value)}/>
  </div>
  <div>
    <label>Number</label> <input type='text' value={mobile} placeholder='Enter Number'  onChange={(e)=>setMobile(e.target.value)}/>
  </div>
  <button type='submit' value="Submit">Submit</button>

</form>
</div>
}

    </div>

    </>
  )
}
