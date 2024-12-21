import { useState, useEffect } from 'react';

function QuestionForm({ closeModal, quiz = null, onQuizUpdate }) {
  const [formData, setFormData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    correctAnswer: '',
  });

  useEffect(() => {
    if (quiz) {
      setFormData({
        question: quiz.question,
        option1: quiz.option1,
        option2: quiz.option2,
        option3: quiz.option3,
        correctAnswer: quiz.correctAnswer,
      });
    }
  }, [quiz]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let existingQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    if (quiz) {
   
      existingQuizzes[quiz.index] = formData;
    
      onQuizUpdate(existingQuizzes);
    } else {
     
      existingQuizzes.push(formData);
    }

    localStorage.setItem('quizzes', JSON.stringify(existingQuizzes));

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white text-black p-4 rounded-lg max-w-lg mx-auto shadow-lg">
      <h2 className="text-center text-green-600 text-3xl mb-6 font-semibold">{quiz ? 'Edit Quiz' : 'Create Quiz'}</h2>

      <div className="mb-4">
        <label htmlFor="question" className="block text-sm font-semibold mb-2">Question:</label>
        <input
          type="text"
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="Enter your question here"
          required
          className="w-full p-3 rounded-lg border border-green-500 bg-white text-black focus:outline-none focus:border-green-700"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="option1" className="block text-sm font-semibold mb-2">Option 1:</label>
          <input
            type="text"
            id="option1"
            name="option1"
            value={formData.option1}
            onChange={handleChange}
            placeholder="Enter first option"
            required
            className="w-full p-3 rounded-lg border border-green-500 bg-white text-black focus:outline-none focus:border-green-700"
          />
        </div>
        <div>
          <label htmlFor="option2" className="block text-sm font-semibold mb-2">Option 2:</label>
          <input
            type="text"
            id="option2"
            name="option2"
            value={formData.option2}
            onChange={handleChange}
            placeholder="Enter second option"
            required
            className="w-full p-3 rounded-lg border border-green-500 bg-white text-black focus:outline-none focus:border-green-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="option3" className="block text-sm font-semibold mb-2">Option 3:</label>
          <input
            type="text"
            id="option3"
            name="option3"
            value={formData.option3}
            onChange={handleChange}
            placeholder="Enter third option"
            required
            className="w-full p-3 rounded-lg border border-green-500 bg-white text-black focus:outline-none focus:border-green-700"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="correctAnswer" className="block text-sm text-green-700 font-bold mb-2">Correct Answer:</label>
          <input
            type="text"
            id="correctAnswer"
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            placeholder="Enter the correct answer"
            required
            className="w-full p-3 rounded-lg border border-green-500 bg-white text-black focus:outline-none focus:border-green-700"
          />
        </div>
      </div>

      <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300">
        {quiz ? 'Update Quiz' : 'Submit'}
      </button>
    </form>
  );
}

export default QuestionForm;
