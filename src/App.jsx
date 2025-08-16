import { useEffect, useState } from 'react'

import './App.css'
import Card from './components/Card'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import music from './assets/music.mp3';
import { use } from 'react';

function App() {
  // Oyun başladığında true olacak (örneğin, kartlar ve skor gösterimi için)
  const [gameStarted, setGameStarted] = useState(false);
  // Skor
  const [skor, setSkor] = useState(0);
  // Deneme sayısı (her iki tıklama 1 deneme sayılır)
  const [tryCount, setTryCount] = useState(0);

  

  // Temel kart tanımları
  const defaultCards = [
    { path: '/pictures/image1.jpeg', matched: false },
    { path: '/pictures/image2.jpeg', matched: false },
    { path: '/pictures/image3.jpeg', matched: false },
    { path: '/pictures/image4.jpeg', matched: false },
    { path: '/pictures/image5.jpeg', matched: false },
    { path: '/pictures/image6.jpeg', matched: false },
  ];

  const [cards, setCards] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedTwo, setSelectedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [musicState,setMusicState]=useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Oyun için kartları hazırlar, karıştırır ve her karta benzersiz id atar
  const prepareCards = () => {
    const sortedCards = [...defaultCards, ...defaultCards]
      .sort(() => 0.5 - Math.random())
      .map(card => ({ ...card, id: uuidv4() }));
    setCards(sortedCards);
    // Oyun başladığını, skorun ve deneme sayısının sıfırlandığını bildiriyoruz
    setGameStarted(true);
    setSkor(0);
    setTryCount(0);
    resetState();
    setMusicState(true);
    setShowConfetti(false); // Konfeti durumunu sıfırla
  };
  const play=()=>{
    new Audio(music).play();
  }
 

  // İki kart seçildiğinde eşleştirme kontrolü
  useEffect(() => {
    if (selectedOne && selectedTwo) {
      setDisabled(true);
      if (selectedOne.path === selectedTwo.path) {
        // Eşleşen kartların matched özelliğini güncelle
        setCards(prev => prev.map(card => 
          card.path === selectedOne.path ? { ...card, matched: true } : card
        ));
        // Skoru artır (her eşleşme 1 puan)
        setSkor(prevScore => prevScore + 1);
        resetState();
      } else {
        // Eşleşme yoksa 1 saniye bekleyip seçimi sıfırlayın
        setTimeout(() => {
          resetState();
        }, 500);
      }
    }
  }, [selectedOne, selectedTwo]);

  // Tüm kartlar eşleştirildiğinde oyunun bittiğini kontrol eder
  useEffect(() => {
    if (gameStarted && cards.length > 0 && cards.every(card => card.matched)) {
      const puan = Math.floor((skor / tryCount) * 100);
      toast.success(`🎉 Tebrikler! Oyun Bitti! Skor: ${puan}`, {
        autoClose: 5000,
      });
      setMusicState(false);
      setShowConfetti(true); // Konfeti animasyonunu başlat
      // Oyunu bitir ve yeniden başlatma butonunu göster
      setTimeout(() => {
        setGameStarted(false);
        setShowConfetti(false); // Konfeti animasyonunu durdur
      }, 4000); // 4 saniye sonra oyunu bitir
    }
  }, [cards, gameStarted]);
useEffect(()=>{
  if(musicState)
  {
    play();
  }


},[musicState])
  // Seçim ve disable durumunu sıfırlama
  const resetState = () => {
    setSelectedOne(null);
    setSelectedTwo(null);
    setDisabled(false);
  };


  // Kart seçimi işlemi, her tıklamada tryCount 1 artar
  const handleSelected = (card) => {
    if (disabled) return;
    setTryCount(prev => prev + 1);
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Kutlama konfetisi */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="confetti"></div>
          ))}
        </div>
      )}
      
      {/* Arka plan dekoratif elementleri */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <section className='relative z-10 flex flex-col items-center justify-center gap-8 pt-8 pb-16 px-4'>
        {/* Başlık */}
        <div className="text-center space-y-4">
          <h1 className='text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl'>
            Lamumu Card Game
          </h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            Test your memory, match the cards and achieve the highest score!
          </p>
        </div>

        {/* Oyun başlatma butonu */}
        {!gameStarted && (
          <button 
            className='group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-4 rounded-2xl text-white font-semibold text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-2 hover:scale-105 transform' 
            onClick={prepareCards}>
            <span className="relative z-10">
              {cards.length > 0 ? '🔄 Start Again' : '🎮 Start Game'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
          </button>
        )}

        {/* Skor tahtası */}
        {gameStarted && (
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20'>
            <div className='grid grid-cols-2 gap-8 text-center'>
              <div className='space-y-2'>
                <div className='text-2xl font-bold text-cyan-400'>Score</div>
                <div className='text-4xl font-bold text-white'>{skor}</div>
              </div>
              <div className='space-y-2'>
                <div className='text-2xl font-bold text-purple-400'>Trials</div>
                <div className='text-4xl font-bold text-white'>{Math.floor(tryCount / 2)}</div>
              </div>
            </div>
          </div>
        )}

        {/* Kartlar grid */}
        {gameStarted && (
          <div className='grid grid-cols-3 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto'>
            {cards.map((card) => (
              <Card 
                key={card.id}
                card={card}
                handleSelected={handleSelected}
                rotated={card === selectedOne || card === selectedTwo || card.matched}
                disabled={disabled}
                isSelected={card === selectedOne || card === selectedTwo}
              />
            ))}
          </div>
        )}

        {/* React Toastify bileşeni */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px'
          }}
        />
      </section>
    </div>
  );
}

export default App;
