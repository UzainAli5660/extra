import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import QuestionForm from "../components/Form";

const SeeQuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    setQuizzes(storedQuizzes);
  }, []);

  const handleDeleteQuiz = (index) => {
    const updatedQuizzes = quizzes.filter((_, i) => i !== index);
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    alert('Quiz deleted');
  };

  const handleEditQuiz = (quiz, index) => {
    setEditingQuiz({ ...quiz, index });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuiz(null);
  };

  // New function to handle quiz updates from the modal
  const handleQuizUpdate = (updatedQuizzes) => {
    setQuizzes(updatedQuizzes);  // Update the quizzes in state
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes)); // Store in localStorage
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-green-600 text-3xl font-bold mt-6">Here are the Quizzes</h1>

      {quizzes.length > 0 ? (
        <div className="quiz-list py-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz, index) => (
              <div
                key={index}
                className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-4">{quiz.question}</h3>
                <p className="text-sm mb-2 font-semibold">Option 1: {quiz.option1}</p>
                <p className="text-sm mb-2 font-semibold">Option 2: {quiz.option2}</p>
                <p className="text-sm mb-2 font-semibold">Option 3: {quiz.option3}</p>
                <p className="text-sm font-semibold bg-green-400 p-2">Correct Answer: {quiz.correctAnswer}</p>
                <div className="flex gap-4 mt-4">
                  <button onClick={() => handleEditQuiz(quiz, index)} className="text-blue-500"><FaEdit /></button>
                  <button onClick={() => handleDeleteQuiz(index)} className="text-red-500"><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-black">No quizzes available. Please create some quizzes first.</p>
      )}

      {isModalOpen && editingQuiz && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={handleCloseModal}>X</button>
            <QuestionForm closeModal={handleCloseModal} quiz={editingQuiz} onQuizUpdate={handleQuizUpdate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SeeQuizPage;
