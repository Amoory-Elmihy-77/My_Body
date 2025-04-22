import { useEffect, useRef, useState } from "react";
import excellentSound from "../../assets/excellent.mp3";
import wrongAnswerSound from "../../assets/wrong.mp3";

// Commenting out the random question selection function since we want to show all questions
// const getRandomUniqueNumbers = () => {
//     const numbers = [...Array(10).keys()];
//     for (let i = numbers.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
//     }
//     return numbers.slice(0, 4).sort((a, b) => a - b);
// };

export default function Questions({ questions }) {
    const correctAudio = useRef(new Audio(excellentSound));
    const wrongAudio = useRef(new Audio(wrongAnswerSound));
    const [allQuestions, setAllQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(null);
    // Removing the questionIndexes state since we'll show all questions
    // const [questionIndexes, setQuestionsIndexes] = useState(getRandomUniqueNumbers());
    const [showCorrectAnswer, setShowCorrectAnswer] = useState({});

    useEffect(() => {
        if (questions) {
            fetch(questions)
                .then((response) => response.json())
                .then((data) => setAllQuestions(data))
                .catch((error) => console.error("Error loading questions:", error));
        }
    }, [questions]);

    const handleAnswer = (questionIndex, option) => {
        if (selectedAnswers[questionIndex] !== undefined) return;

        setSelectedAnswers((prev) => {
            const updatedAnswers = {
                ...prev,
                [questionIndex]: option,
            };

            if (option !== allQuestions[questionIndex].answer) {
                updatedAnswers[questionIndex] = option;
                setShowCorrectAnswer((prevState) => ({
                    ...prevState,
                    [questionIndex]: true,
                }));
            }

            return updatedAnswers;
        });

        if (option === allQuestions[questionIndex].answer) {
            correctAudio.current.play();
        } else {
            wrongAudio.current.play();
        }
    };

    const calculateScore = () => {
        let totalScore = 0;
        allQuestions.forEach((q, index) => {
            if (selectedAnswers[index] === q.answer) {
                totalScore++;
            }
        });
        setScore(totalScore);
    };

    const restartQuiz = () => {
        setSelectedAnswers({});
        setScore(null);
        // Removing the random question selection on restart
        // setQuestionsIndexes(getRandomUniqueNumbers());
        setShowCorrectAnswer({});
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-100 shadow-lg rounded-xl">
            {allQuestions.map((question, index) => {
                // Remove the questionIndexes check to show all questions
                return (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-md mb-4 transition-all duration-300 hover:shadow-lg"
                    >
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            {index + 1}. {question.question}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {question.options.map((option, i) => (
                                <label
                                    key={i}
                                    className={`flex items-center p-2 rounded-lg cursor-pointer transition ${selectedAnswers[index] === option
                                        ? option === question.answer
                                            ? "bg-green-400 text-white"
                                            : "bg-red-400 text-white"
                                        : "bg-gray-200 hover:bg-gray-300"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name={`q${index}`}
                                        className="mr-2 hidden"
                                        onChange={() => handleAnswer(index, option)}
                                    />
                                    {option}
                                </label>
                            ))}

                            {showCorrectAnswer[index] && (
                                <p className="text-sm text-green-600 mt-2">✅ الإجابة الصحيحة: {question.answer}</p>
                            )}
                        </div>
                    </div>
                );
            })}

            {score === null ? (
                <button
                    className="block w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={calculateScore}
                >
                    إنهاء الاختبار وحساب النتيجة
                </button>
            ) : (
                <div className="text-center mt-4">
                    <p className="text-xl font-semibold text-blue-700">
                        ✅ نتيجتك: {score} / {allQuestions.length}
                    </p>
                    <button
                        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                        onClick={restartQuiz}
                    >
                        إعادة الاختبار 🔄
                    </button>
                </div>
            )}
        </div>
    );
}
