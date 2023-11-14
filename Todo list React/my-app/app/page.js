"use client"
import React, {useState} from 'react';

const page = () => {
  const [task, settask] = useState("");
  const [desc, setdesc] = useState("");
  const [mainTask, setmainTask] = useState([])
  const submitHandler = (e) => {
    // will prevent the form from submitting
    e.preventDefault();
    setmainTask([...mainTask, {task, desc}])
    settask("")
    setdesc("")
    // console.log(mainTask);
  }
  const deleteHandler = (index) => {
    let copyTask = [...mainTask];
    copyTask.splice(index,1);
    setmainTask(copyTask);
  }

  let renderTask = <h2>No Task Available</h2>;

  if(mainTask.length >0){
    renderTask = mainTask.map( (t,i) =>{
      return (
        <li key={i} className='flex items-center justify-between'>
          <div className='flex justify-between items-center mb-5 w-2/3 '>
            <h5 className='text-2xl text-gray-800'>{t.task}</h5>
            <h4 className='text-xl text-gray-800'>{t.desc}</h4>
          </div>
          <button className='p-2 rounded bg-slate-400 mb-5' onClick={ () =>{
            deleteHandler(i);
          }}>Delete</button>
        </li>
        
      )
    })
  }
  else{
    
  }
  return (
    <>
    <h1 className='bg-black text-white p-4 text-center text-xl font-bold'>Kamna's TodoList</h1>

    <form onSubmit={submitHandler}>

      <input 
      type="text" 
      placeholder='Add Task' 
      className='text-2xl border-black border-2 m-5 p-2'
      value = {task}
      onChange={(e)=>{
        settask(e.target.value)
      }} />
      
      <input type="text" 
      placeholder='Add Description' 
      className='text-2xl border-black border-2 m-5 p-2'
      value={desc}
      onChange={(e)=>{
        setdesc(e.target.value)
      }} />

      <button className='bg-black text-white p-3 rounded-xl font-bold'>Add Task</button>
    </form>

    <div className='bg-gray-300 p-3 text-center'>
      <ul>
        {renderTask}
      </ul>
    </div>
    </>
  )
}

export default page