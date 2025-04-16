import React from 'react'

const Card = ({card,handleSelected,rotated,disabled}) => {
    const handleClick=()=>{
      if(!disabled)
      {
        handleSelected(card);
      }
    }
  return (
    <div className=' w-[200px] card'>
      <div  className={`${rotated ? 'rotated': ''}`}>
      <img className={`front `} src={card.path}></img>
      <img className='back' onClick={handleClick}src='/pictures/kapak.jpg'></img>
      </div>
    
    
  </div>
  )
}

export default Card