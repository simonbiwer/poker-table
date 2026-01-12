import { useState } from 'react';

const questions = [
    "What is the goal of the game?",
    "How do you handle betting rounds?",
    "What happens when multiple players go all-in?",
    "How do side pots work?",
    "What are the rules for splitting the pot?",
];

export default function QuestionsNavigator() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    // Handler for the Previous Question button
    const goToPreviousQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: '#333',
                color: 'white',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                width: '400px',
            }}
        >
            {/* Display the current question */}
            <h4>Questions</h4>
            <p>{questions[currentIndex]}</p>

            {/* Navigation Buttons */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '15px', // Add space between the buttons
                    marginTop: '10px',
                }}
            >
                {/* Previous Button */}
                <button
                    onClick={goToPreviousQuestion}
                    disabled={currentIndex === 0}
                    style={{
                        backgroundColor: '#FFA500',
                        color: 'black',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                        opacity: currentIndex === 0 ? 0.6 : 1,
                    }}
                >
                    Previous
                </button>

                {/* Next Button */}
                <button
                    onClick={goToNextQuestion}
                    disabled={currentIndex === questions.length - 1}
                    style={{
                        backgroundColor: '#FFA500',
                        color: 'black',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        cursor: currentIndex === questions.length - 1 ? 'not-allowed' : 'pointer',
                        opacity: currentIndex === questions.length - 1 ? 0.6 : 1,
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}