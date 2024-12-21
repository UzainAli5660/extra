// src/pages/HomePage.js
import { useState  , } from 'react';
import { Link } from 'react-router-dom';
import QuestionForm from "../components/Form";
import "../App.css";

const HomePage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateQuizClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img
        src="/saylani.png" 
        alt="Saylani"
        className="w-50% h-32 object-cover bg-transparent mb-4"
      />
    
      <h1 className="text-green-600 mt-2 font-bold text-center text-3xl">Welcome to Saylani</h1>
    
      <div className="flex gap-3 mt-3 justify-center">
        <button
          className="w-25 text-xl font-semibold p-3 border border-black rounded-md"
          onClick={handleCreateQuizClick}
        >
          Create quiz
        </button>

        <Link
          to="/see-quiz"
          className="w-25 text-xl font-semibold p-3 border border-black rounded-md"
        >
          See quiz
        </Link>
        <Link
          to="/play-quiz"
          className="w-25 text-xl font-semibold p-3 border border-black rounded-md"
        >
          Play Quiz        </Link>

      
      </div>

      {/* Modal for Creating Quiz */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={handleCloseModal}>X</button>
            <QuestionForm closeModal={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
