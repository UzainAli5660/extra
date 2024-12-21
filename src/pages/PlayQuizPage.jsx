import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayQuizPage = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answerFeedback, setAnswerFeedback] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [timer, setTimer] = useState(60);  // Timer for 1 minute
  const [intervalId, setIntervalId] = useState(null);
  const [quizTimedOut, setQuizTimedOut] = useState(false);

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    setQuizzes(storedQuizzes);
    if (storedQuizzes.length > 0) {
      const options = shuffleOptions([storedQuizzes[0].option1, storedQuizzes[0].option2, storedQuizzes[0].option3], storedQuizzes[0].correctAnswer);
      setShuffledOptions(options);
    }
  }, []);

  useEffect(() => {
    if (quizzes.length > 0 && currentQuestionIndex < quizzes.length) {
      const currentQuiz = quizzes[currentQuestionIndex];
      const options = shuffleOptions([currentQuiz.option1, currentQuiz.option2, currentQuiz.option3], currentQuiz.correctAnswer);
      setShuffledOptions(options);
    }
  }, [currentQuestionIndex, quizzes]);

  useEffect(() => {
    if (timer <= 0) {
      stopQuiz();
    }
  }, [timer]);

  const shuffleOptions = (options, correctAnswer) => {
    const allOptions = [...options];
    if (!allOptions.includes(correctAnswer)) {
      allOptions.push(correctAnswer);
    }
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }
    return allOptions;
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const correctAnswer = quizzes[currentQuestionIndex].correctAnswer;
    if (answer === correctAnswer) {
      setAnswerFeedback('correct');
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setAnswerFeedback('incorrect');
      setIncorrectAnswers(incorrectAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setAnswerFeedback('');
    } else {
      stopQuiz();
    }
  };

  const stopQuiz = () => {
    clearInterval(intervalId);  // Clear the timer when quiz stops
    setQuizCompleted(true);
    if (timer <= 0) {
      setQuizTimedOut(true); // Set the timeout flag
      alert("Time's up! You can't complete the quiz.");
    }
    navigate('/result', {
      state: {
        correctAnswers,
        incorrectAnswers,
        timeSpent: 60 - timer,  // Time spent (60 - remaining time)
        quizTimedOut,
      },
    });
  };

  const startTimer = () => {
    const id = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    setIntervalId(id);
  };

//   const handleRetakeQuiz = () => {
//     setCurrentQuestionIndex(0);
//     setQuizCompleted(false);
//     setSelectedAnswer('');
//     setAnswerFeedback('');
//     setTimer(60);
//     setCorrectAnswers(0);
//     setIncorrectAnswers(0);
//     setQuizTimedOut(false); // Reset timeout flag
//     startTimer();
//   };

  useEffect(() => {
    startTimer(); // Start timer on component mount
  }, []);

  if (!quizzes.length || !quizzes[currentQuestionIndex]) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-3xl text-red-500">No quizzes available or error loading quiz.</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 py-2 px-6 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300"
        >
          Go Home
        </button>
      </div>
    );
  }

  const currentQuiz = quizzes[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {quizCompleted ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Quiz Completed!</h2>
          
          <button
            onClick={() => navigate("/")}
            className="mt-2 py-2 px-6 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Go Home
          </button>
        </div>
      ) : (
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-center mb-4">{currentQuiz?.question}</h3>
          <div className="space-y-4">
            {shuffledOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full py-3 rounded-lg border ${
                  selectedAnswer === option
                    ? answerFeedback === 'correct'
                      ? 'bg-green-500 text-white border-green-600'
                      : 'bg-red-500 text-white border-red-600'
                    : 'bg-white text-black border-gray-300'
                } hover:bg-gray-100 focus:outline-none`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === ''}
              className="py-3 px-6 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition duration-300"
            >
              {currentQuestionIndex < quizzes.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">Time Remaining: {timer}s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayQuizPage;
