import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const { state } = useLocation();
  const { correctAnswers, incorrectAnswers, timeSpent, } = state;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Quiz Results</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg">Correct Answers: {correctAnswers}</p>
        <p className="text-lg">Incorrect Answers: {incorrectAnswers}</p>
        <p className="text-lg">Time Spent: {timeSpent} seconds</p>
        <button className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
         <a href="/">Go to Home Page</a>
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
