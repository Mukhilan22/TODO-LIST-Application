import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'

const Additem = ({newItem,setNewitems,handleSubmit}) => {
  const inputRef = useRef()
  return (
    <form className='addForm' onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor='addItem'>Add Item</label>

        <input
          type='text'
          placeholder='Add Item'
          id='addItem'
          ref = {inputRef}
          required
          value = {newItem} //value we type here is set as newItem
          onChange= {(e) => setNewitems(e.target.value)}
        //when we type each keystroke, it is passed as parameter
        //the each letter we type is set as newItems untill we click submit
        />

        <button type='submit'aria-label='addItem' 
          onClick={()=>inputRef.current.focus()}> 
            < FaPlus />  
        </button>

    </form>
  )
}

export default Additem