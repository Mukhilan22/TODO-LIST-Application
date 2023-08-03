import React from 'react'

const Footer = ({length}) => {
    const date = new Date();
  return (
    <footer>
         <p>{length} {(length==1)? "ITEM in LIST" :  "ITEMS in LIST"  }</p>
    </footer>
  )
}

export default Footer