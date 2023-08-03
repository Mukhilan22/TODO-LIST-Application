import React from 'react'
import Itemslist from './Itemslist';

const Content = ({items,handleCheck,handleDelete}) => {
  
  return (
    <>
      {(items.length)? ( 
        <Itemslist 
          items = {items}
          handleCheck = {handleCheck}
          handleDelete = {handleDelete}
        />
        ) : (<p>LIST IS EMPTY</p>)}
    </>
  )
}

export default Content