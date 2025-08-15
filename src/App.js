import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Home, Calculator, Rocket, BookOpen, Zap, Users, Heart, Trophy, ChevronRight } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [scores, setScores] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognitionRef.current = recognition;
    }
  }, []);

  const speak = (text) => {
    if (synthRef.current && !isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        if (transcript.includes('home')) setCurrentPage('home');
        else if (transcript.includes('math')) setCurrentPage('maths');
        else if (transcript.includes('space')) setCurrentPage('space');
        else if (transcript.includes('history')) setCurrentPage('history');
        else if (transcript.includes('sports')) setCurrentPage('sports');
        else if (transcript.includes('culture')) setCurrentPage('culturals');
        else if (transcript.includes('health')) setCurrentPage('health');
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  };

  const sections = [
    { id: 'maths', name: 'Mathematics', icon: Calculator, color: 'from-pink-400 to-rose-500', emoji: '🔢' },
    { id: 'space', name: 'Space', icon: Rocket, color: 'from-yellow-400 to-orange-500', emoji: '🚀' },
    { id: 'history', name: 'History', icon: BookOpen, color: 'from-green-400 to-emerald-500', emoji: '📚' },
    { id: 'sports', name: 'Sports', icon: Zap, color: 'from-blue-400 to-cyan-500', emoji: '⚽' },
    { id: 'culturals', name: 'Culturals', icon: Users, color: 'from-purple-400 to-violet-500', emoji: '🎭' },
    { id: 'health', name: 'Health', icon: Heart, color: 'from-red-400 to-pink-500', emoji: '💪' }
  ];

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-yellow-200 to-green-300">
      <div className="relative px-6 py-20 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-6 animate-bounce">EduTeen 🌈</h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto font-semibold">
          Your Ultimate Interactive Learning Adventure! Explore, Learn, and Master Amazing Facts!
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => speak("Welcome to EduTeen! Choose a subject to start your learning adventure!")}
            disabled={isSpeaking}
            className="bg-pink-500 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-600 transition-all duration-300 flex items-center gap-2 shadow-lg"
          >
            {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
            {isSpeaking ? 'Stop' : 'Hear Welcome'}
          </button>
          <button
            onClick={startListening}
            disabled={isListening}
            className="bg-yellow-500 text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition-all duration-300 flex items-center gap-2 shadow-lg"
          >
            {isListening ? <Pause size={20} /> : <Play size={20} />}
            {isListening ? 'Listening...' : 'Voice Control'}
          </button>
        </div>
      </div>

      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-500"
                onClick={() => setCurrentPage(section.id)}
              >
                <div className={`bg-gradient-to-br ${section.color} p-8 rounded-3xl shadow-2xl hover:shadow-xl relative overflow-hidden border-4 border-white`}>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="text-6xl mb-4 text-center animate-bounce">{section.emoji}</div>
                    <h3 className="text-2xl font-bold text-white mb-3 text-center">{section.name}</h3>
                    <div className="flex justify-center items-center text-white">
                      <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 opacity-30">
                    <section.icon size={120} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SubjectPage = ({ title, icon: Icon, bgColor, borderColor, facts, quiz, game }) => {
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState(null);

    return (
      <div className={`min-h-screen ${bgColor} p-6`}>
        <div className="max-w-4xl mx-auto">
          <div className={`bg-white rounded-3xl shadow-2xl p-8 mb-8 border-4 ${borderColor}`}>
            <div className="flex items-center gap-4 mb-6">
              <Icon size={40} className={`${borderColor.replace('border-', 'text-')}`} />
              <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
              <button onClick={() => speak(`Welcome to ${title}!`)} className="ml-auto bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <Volume2 size={20} />
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Amazing Facts!</h2>
              <div className="grid gap-4">
                {facts.map((fact, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border-l-4 border-gray-400 hover:shadow-md transition-all cursor-pointer"
                       onClick={() => speak(fact)}>
                    <p className="text-gray-700 font-medium">{fact}</p>
                  </div>
                ))}
              </div>
            </div>

            {game && (
              <div className="mb-8 bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl border-4 border-yellow-400">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{game.title}</h3>
                <div>{game.component(gameState, setGameState, score, setScore)}</div>
              </div>
            )}

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl border-4 border-green-400">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Quiz Time! 🧠</h3>
              <p className="text-lg mb-4 font-semibold">{quiz.question}</p>
              <div className="grid grid-cols-2 gap-4">
                {quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (index === quiz.correct) {
                        setScore(score + 10);
                        alert('Correct! +10 points 🎉');
                      } else {
                        alert('Try again! 😊');
                      }
                    }}
                    className="bg-white border-4 border-green-300 p-3 rounded-xl hover:bg-green-50 transition-colors font-bold shadow-md"
                  >
                    {option}
                  </button>
                ))}
              </div>
              {score > 0 && <p className="mt-4 text-lg font-bold text-green-600">Score: {score} points</p>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MathGame = (gameState, setGameState, score, setScore) => {
    const [answer, setAnswer] = useState('');

    const generateProblem = () => {
      const ops = ['+', '-', '×'];
      const op = ops[Math.floor(Math.random() * ops.length)];
      const a = Math.floor(Math.random() * 20) + 1;
      const b = Math.floor(Math.random() * 20) + 1;
      let result;
      if (op === '+') result = a + b;
      else if (op === '-') result = Math.abs(a - b);
      else result = a * b;
      setGameState({ a, b, op, result });
    };

    const checkAnswer = () => {
      if (parseInt(answer) === gameState.result) {
        setScore(score + 10);
        alert('Correct! +10 points 🎉');
      } else {
        alert(`Wrong! Answer is ${gameState.result} 😊`);
      }
      setAnswer('');
      generateProblem();
    };

    return (
      <div>
        {!gameState ? (
          <button onClick={generateProblem} className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 font-bold">
            Start Math Challenge!
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">{gameState.a} {gameState.op} {gameState.b} = ?</span>
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="border-4 border-yellow-300 rounded-xl px-4 py-2 text-xl w-20"
              placeholder="?"
            />
            <button onClick={checkAnswer} className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 font-bold">
              Check!
            </button>
          </div>
        )}
      </div>
    );
  };

  const ReactionGame = (gameState, setGameState, score, setScore) => {
    const startGame = () => {
      setGameState({ active: true, startTime: Date.now(), canClick: false });
      setTimeout(() => {
        setGameState(prev => ({ ...prev, canClick: true }));
      }, Math.random() * 3000 + 1000);
    };

    const handleClick = () => {
      if (gameState?.canClick) {
        const time = Date.now() - gameState.startTime;
        setGameState({ active: false, reactionTime: time });
      }
    };

    return (
      <div className="text-center">
        {!gameState?.active ? (
          <div>
            <button onClick={startGame} className="bg-cyan-500 text-white px-6 py-3 rounded-xl hover:bg-cyan-600 font-bold">
              Start Reaction Test!
            </button>
            {gameState?.reactionTime && (
              <p className="mt-4 text-lg font-bold">Your time: {gameState.reactionTime}ms!</p>
            )}
          </div>
        ) : (
          <div onClick={handleClick} className={`cursor-pointer p-6 rounded-xl text-white text-xl font-bold ${gameState.canClick ? 'bg-green-500' : 'bg-red-500'}`}>
            {gameState.canClick ? 'CLICK NOW!' : 'Wait for green...'}
          </div>
        )}
      </div>
    );
  };

  const subjects = {
    maths: {
      title: 'Mathematics 🔢',
      icon: Calculator,
      bgColor: 'bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300',
      borderColor: 'border-pink-400',
      facts: [
        "Zero is the only number that cannot be represented by Roman numerals! 🔢",
        "Pi (π) has been calculated to over 31 trillion digits! 🥧",
        "The Fibonacci sequence appears everywhere in nature! 🌻",
        "A googol is 1 followed by 100 zeros! ♾️",
        "Mathematics comes from Greek 'mathema' meaning knowledge! "
      ],
      quiz: {
        question: "What is 15 × 8?",
        options: ["120", "125", "115", "130"],
        correct: 0
      },
      game: { title: "Math Challenge! 🎯", component: MathGame }
    },
    space: {
      title: 'Space Exploration 🚀',
      icon: Rocket,
      bgColor: 'bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200',
      borderColor: 'border-yellow-400',
      facts: [
        "One day on Venus is longer than one year on Venus! 🌍",
        "Jupiter's Great Red Spot has been raging for 400+ years! 🌪️",
        "Neutron stars are incredibly dense - a sugar cube would weigh 6 billion tons! ⭐",
        "The Milky Way contains over 100 billion stars! 🌌",
        "Saturn would float in water because it's less dense! "
      ],
      quiz: {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
      }
    },
    history: {
      title: 'History Adventures 📚',
      icon: BookOpen,
      bgColor: 'bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200',
      borderColor: 'border-green-400',
      facts: [
        "The Great Wall of China took over 2,000 years to build! 🏯",
        "Cleopatra lived closer to the Moon landing than to the Great Pyramid! ",
        "The shortest war lasted only 38-45 minutes in 1896! ⚔️",
        "Ancient Romans used urine as mouthwash! 🏛️",
        "Napoleon was average height for his time at 5'7\"! 👑"
      ],
      quiz: {
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correct: 1
      }
    },
    sports: {
      title: 'Sports Arena ⚽',
      icon: Zap,
      bgColor: 'bg-gradient-to-br from-blue-200 via-cyan-200 to-teal-200',
      borderColor: 'border-blue-400',
      facts: [
        "Basketball hoops were originally peach baskets! 🏀",
        "Soccer is played by 250+ million people in 200+ countries! ⚽",
        "Olympic Games were held for 1,200+ years in ancient Greece! ",
        "Tennis was originally played with bare hands! 🎾",
        "Golf balls have 336 dimples to help them fly! ⛳"
      ],
      quiz: {
        question: "How many players on a basketball court per team?",
        options: ["4", "5", "6", "7"],
        correct: 1
      },
      game: { title: "Reaction Time Challenge! ⚡", component: ReactionGame }
    },
    culturals: {
      title: 'Cultural Wonders 🎭',
      icon: Users,
      bgColor: 'bg-gradient-to-br from-purple-200 via-violet-200 to-pink-200',
      borderColor: 'border-purple-400',
      facts: [
        "Over 7,000 languages are spoken worldwide! 🌍",
        "Mona Lisa has no eyebrows - it was fashionable to shave them! 🎨",
        "India celebrates over 50 festivals per year! 🎉",
        "Japanese has three writing systems: Hiragana, Katakana, Kanji! ",
        "The world's oldest musical instrument is a 40,000-year-old flute! 🎵"
      ],
      quiz: {
        question: "Which country is famous for origami?",
        options: ["China", "Japan", "Korea", "Thailand"],
        correct: 1
      }
    },
    health: {
      title: 'Health & Wellness 💪',
      icon: Heart,
      bgColor: 'bg-gradient-to-br from-red-200 via-pink-200 to-rose-200',
      borderColor: 'border-red-400',
      facts: [
        "Your brain uses 20% of your body's energy but is only 2% of weight! 🧠",
        "Humans have the same neck bones as giraffes - seven! 🦒",
        "Your heart beats about 100,000 times per day! ❤️",
        "Drinking water can boost brain performance by 14%! 💧",
        "Laughing burns calories and boosts immune system! 😂"
      ],
      quiz: {
        question: "How many hours of sleep do teenagers need?",
        options: ["6-7 hours", "7-8 hours", "8-10 hours", "10-12 hours"],
        correct: 2
      }
    }
  };

  const renderPage = () => {
    if (currentPage === 'home') return <HomePage />;
    const subject = subjects[currentPage];
    return <SubjectPage {...subject} />;
  };

  return (
    <div className="relative">
      {currentPage !== 'home' && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-bold"
          >
            <Home size={20} />
            Home
          </button>
        </div>
      )}

      {isListening && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-full animate-pulse">
          🎤 Listening...
        </div>
      )}

      {isSpeaking && (
        <div className="fixed top-16 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-full animate-pulse">
          🔊 Speaking...
        </div>
      )}

      {renderPage()}

      <div className="fixed bottom-4 right-4 bg-white rounded-2xl shadow-lg p-4 z-50">
        <div className="flex items-center gap-2 mb-2">
          <Trophy size={20} className="text-yellow-500" />
          <span className="font-bold text-gray-800">Total Score</span>
        </div>
        <div className="text-2xl font-bold text-center text-purple-600">
          {Object.values(scores).reduce((a, b) => a + b, 0)}
        </div>
      </div>
    </div>
  );
};

export default App;