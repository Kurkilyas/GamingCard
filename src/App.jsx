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
    { path: '/pictures/image1.jpg', matched: false },
    { path: '/pictures/image2.jpg', matched: false },
    { path: '/pictures/image3.jpg', matched: false },
    { path: '/pictures/image4.jpg', matched: false },
    { path: '/pictures/image5.jpg', matched: false },
    { path: '/pictures/image6.jpg', matched: false },
  ];

  const [cards, setCards] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedTwo, setSelectedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [musicState,setMusicState]=useState(false);

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
    setMusicState(true)
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
      toast.success(`Oyun Bitti Score: ${puan}`);
      setMusicState(false)
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
    <section className='flex flex-col items-center justify-center gap-10 mt-10'>
      <h1 className='text-3xl font-semibold text-center'>Tectra NFT Card Game</h1>
      {/* Oyun başlatma butonu */}
      <button 
        className='bg-[#00ADB5] px-3 py-2 rounded hover:-translate-y-1.5 transition-all' 
        onClick={prepareCards}>
        Start Game
      </button>
      {/* Skor tahtası (scoreboard) */}
      <div className='scoreboard text-xl font-bold'>
        Score: {skor}
      </div>
      {/* Deneme sayısını gösteren alan; her iki tıklamada 1 deneme sayılır */}
      <div className='scoreboard text-xl font-bold'>
        Number Of Trials: {Math.floor(tryCount / 2)}
      </div>
      {/* Kartların render edildiği grid */}
      <div className='grid grid-cols-4 gap-2 mt-10'>
        {gameStarted &&
          cards.map((card) => (
            <Card 
              key={card.id}
              card={card}
              handleSelected={handleSelected}
              rotated={card === selectedOne || card === selectedTwo || card.matched}
              disabled={disabled}
            />
          ))
        }
      </div>
      {/* React Toastify bileşenini ekleyin */}
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
      />
    </section>
  );
}

export default App;
