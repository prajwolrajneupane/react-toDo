import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaFlagCheckered } from "react-icons/fa";
import './App.css'
function App() {
// these are the states that are used
  const [isCompScreen,setIsCompScreen]=useState(false)
const [allToDos,setToDos]=useState([]);
const [newTitle,setTitle]=useState("");
const [newDesp,setDesp]=useState("");
const [completedTodos, setCompletedTodos] = useState ([]);

//these two are the function created to change todo dekhi completed samma lai switch ko rupp ma use garauna 
function changestateFalse(){
  setIsCompScreen(false)

}

function changestateTrue(){
  setIsCompScreen(true)
}

//yo function ma chai todo handle wala chij basxa
function handleAddTodo(){
  
  let newTodoitem={
    title:newTitle,
    desp:newDesp
 
//  title ra desp ko value chai newTitle ra newDesp bata aairako xa(input ma setTitle ra setTodo garya xam)
  }

  let updatedTodoArr=[...allToDos];
  // updatedTodoArr lai define garya
  // three dots "..." le array ko sabai items harlai janauxa, jastai allToDos[0],allToDos[1] sabai ... le janauni vayo
  //so updatedTodoArr chai alltodos  ho
  


  updatedTodoArr.push(newTodoitem);
  //updatedtodoArr ma chai newTodoitem push vairako xa
  // vanna le aba input ma haleko title ra desp chai updatedTodoArr ma push hunxa
setToDos(updatedTodoArr);
//hamro allTodos set hunxa updatedtodoArr ma


//k bujna paro ta vanda updateTodoArr le sabbai add gareko array content garxa ra harek choti teslai dekhauxa


localStorage.setItem('just-A-Name',JSON.stringify(updatedTodoArr))
// localStorage.setItem() is a method in the localStorage object, which allows you to store data in the browser's local storage. It takes two arguments: a key and a value. 
//json.stringify le chai stringify gardai xa aako chij laii

}

useEffect(()=>{
  let savedTodo=JSON.parse(localStorage.getItem('just-A-Name'))
if(savedTodo){
setToDos(savedTodo)
}
},[])


// delete garna

function deleteWala(index){
  let reducedTodo=[...allToDos];
    reducedTodo.splice(index,1);
    localStorage.setItem('just-A-Name',JSON.stringify(reducedTodo))
    setToDos(reducedTodo);


  }


  

  return (
    <div className='App'>
      <h1>My todos</h1>

      <div className="todo-wrapper">

        <div className="todo-input">
          <div className='todo-input-item'>
            <label >Title</label>
            <input type="text"  onChange={(e)=>setTitle(e.target.value)} placeholder='Whats the task title?' />
        {/* ya chai onchange vanna le kei saano change aayo vaney pani, e.target.value trigger hunxa ra title chai user le j value halya xa tesmai set hunxa */}
        
          </div>

          <div className='todo-input-item'>
            <label >Description</label>
            <input type="text"  onChange={  (e)=>{setDesp(e.target.value)}} placeholder='Whats the discription?' />
        {/* ya chai onchange vanna le kei saano change aayo vaney pani, e.target.value trigger hunxa ra desp chai user le j value halya xa tesmai set hunxa */}


{/* set title ra set desp handleAddTodo ma pani janxan */}
          </div> <div className='todo-input-item'>
          <button type='button'  onClick={handleAddTodo} className='primaryBtn'>Add</button>

          
          </div>
        </div>

        <div className="btn-area">


        <button onClick={changestateFalse}  className={`secondaryBtn ${isCompScreen === false? 'active' : 'activeCompleted'}`}  >Todo</button>
<button onClick={changestateTrue} className={`secondaryBtn ${isCompScreen===true ? 'active' : 'activeTodo'}`} >Completed</button>
{/* `secondaryBtn ${isCompScreen === false? 'active' : 'activeCompleted'} vanna le chai yedi secondary button false xa vaney active class
 add gar natra activeCompleted vanni add gar vanya, yeta activeCompleted vanni case nei aaudaina kinaki todo ma thichda iscompscreen kaile true hudaina*/}

        </div>
        <div className="todo-list">
  


          {isCompScreen===false? allToDos.map((item,countGarniWala)=>{
            //map=loop, so item ra countGarniWala chai parameters vanam
          //item vanya chai current element being processed of allTodos
          // countGarniWala normally termed index is the current 
            return(


<div className='todo-list-item' key={countGarniWala}>

  {/* key chai map/loop use garda use garna parxa uniquely identify garna ko lagi */}
            
            <div>
              
              <h3>{item.title}</h3>
            <p>{item.desp}</p>
              </div>
       <div>

        <MdDelete className='icon' onClick={deleteWala} title='delete?'/>
        <FaFlagCheckered className='check-icon' title='complete?'  />
       </div>
          </div>

            )
          })
          :console.log("suii")
          }

        </div>

      </div>

    </div>
  )
}

export default App
