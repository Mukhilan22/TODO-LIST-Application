import React from 'react'
import {FaTrashAlt } from "react-icons/fa";

const Itemslist = ({items,handleCheck,handleDelete}) => {
  return (
    <ul>
          {items.map((item) => (
            <li className='item' key={item.id}>
              <input className= 'check'
              type= "checkbox"
              checked= {item.checked} 
              onChange={()=>handleCheck(item.id)}
              //call as annonyous fn so thatit runs nly when clicked
              ></input>
              <label style={(item.checked)? {textDecoration:'line-through'}:null} 
              onDoubleClick={()=>handleCheck(item.id)}>{item.item}</label> 
              <FaTrashAlt 
              role= "button" 
              tabIndex={0} 
              aria-label={`Delete ${item.item}`}
              onClick={() => handleDelete(item.id)}/>
            </li>
          ))}
        </ul> 
    
  )
}

export default Itemslist