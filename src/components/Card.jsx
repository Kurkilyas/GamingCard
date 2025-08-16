import React from 'react'

const Card = ({card, handleSelected, rotated, disabled, isSelected}) => {
    const handleClick = () => {
      if (!disabled && !card.matched) {
        handleSelected(card);
      }
    }

    return (
      <div className={`w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 card perspective-1000 cursor-pointer transform transition-all duration-300 hover:scale-105 ${card.matched ? 'animate-pulse' : ''} ${isSelected ? 'ring-4 ring-cyan-400 ring-opacity-75 shadow-cyan-400/50' : ''}`}>
        <div className={`${rotated ? 'rotated' : ''} w-full h-full relative transform-style-preserve-3d transition-transform duration-500`}>
          {/* Kart ön yüzü (resim) */}
          <div className="front absolute inset-0 w-full h-full transform-style-preserve-3d">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
              <img 
                className="w-full h-full object-cover" 
                src={card.path}
                alt="Card front"
              />
              {/* Eşleşen kartlar için overlay */}
              {card.matched && (
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/80 to-emerald-500/80 flex items-center justify-center">
                  <div className="text-white text-4xl font-bold drop-shadow-lg">✓</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Kart arka yüzü (kapak) */}
          <div className="back absolute inset-0 w-full h-full transform-style-preserve-3d cursor-pointer" onClick={handleClick}>
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 relative group">
              {/* Kapak resmi */}
              <img 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
                src="/pictures/kapak.jpeg"
                alt="Card back"
              />
              
              {/* Hover efektleri */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Kart deseni */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="text-white text-2xl font-bold">?</div>
                </div>
              </div>
              
              {/* Köşe süsleri */}
              <div className="absolute top-2 left-2 w-3 h-3 bg-white/30 rounded-full"></div>
              <div className="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Card