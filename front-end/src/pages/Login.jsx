import React, { useState } from 'react'

const Login = () => {
  const [state,setState] = useState('Sign up');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');

  const onSubmitHandler = async(event)=>{
       event.preventDefault()
  }
  
  return (
   <form className='min-h-[80vh] flex items-center'>
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
      <p className='font-semibold text-2xl'>
        {state === 'Sign up' ? "Create Account":"Login"}
      </p>
      <p>Please {state === 'Sign up' ? "Create sign up":"Login"}  to book appointment</p>
      {
        state === "Sign up" &&  <div className='w-full'>
        <p>Full Name</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='text' onChange={(e)=>setName(e.target.name)} value={name}/>
      </div>
      }
    
       <div className='w-full'>
        <p>Email</p>
        <input  className='border border-zinc-300 rounded w-full p-2 mt-1' type='email' onChange={(e)=>setEmail(e.target.email)} value={email}/>
      </div>
       <div className='w-full'>
        <p>Password</p>
        <input  className='border border-zinc-300 rounded w-full p-2 mt-1' type='password' onChange={(e)=>setPassword(e.target.password)} value={password}/>
      </div>
      <button className='bg-indigo-500 text-white w-full py-2 rounded-md text-base'> {state === 'Sign up' ? "Create Account":"Login"}</button>
      {
        state === "Sign up" ?
        <p>Already have an account? <span onClick={()=>setState('Login')}  className='text-indigo-100 cursor-pointer underline'>Login here</span></p>
        : <p>Create an new account? <span onClick={()=>setState('Sign up')} className='text-indigo-100 cursor-pointer underline'>Click here</span></p>
      }
    </div>
   </form>
  )
}

export default Login