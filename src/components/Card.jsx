import React from 'react'

const Card = ({card,handleSelected,rotated,disabled}) => {
    const handleClick=()=>{
      if(!disabled)
      {
        handleSelected(card);
      }
    }
  return (
    <div className='w-[200px] h-[200px] card'>
      <div className={`${rotated ? 'rotated': ''} w-full h-full`}>
        <img 
          className="front w-full h-full object-cover rounded" 
          src={card.path}
          alt="Card front"
        />
        <img 
          className="back w-full h-full object-cover rounded" 
          onClick={handleClick}
          src="/pictures/kapak.jpg"
          alt="Card back"
        />
      </div>
    </div>
  )
}

export default Card