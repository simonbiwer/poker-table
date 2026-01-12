import { useState } from "react";

const questions = [
    {
        question: "What is the goal of the game?",
        tips: ["The goal is to win the pot.", "Focus on making the best hand or forcing folds."],
    },
    {
        question: "How do you handle betting rounds?",
        tips: ["Players can bet, call, raise, or fold.", "Follow the betting sequence strictly."],
    },
    {
        question: "What happens when multiple players go all-in?",
        tips: ["All-in players can win only the portion of the pot they covered.", "Use side pots to manage uncalled amounts."],
    },
    {
        question: "How do side pots work?",
        tips: ["A side pot is created when one or more players are all-in.", "Calculations should take player stacks into account."],
    },
    {
        question: "What are the rules for splitting the pot?",
        tips: ["Split the pot equally between tied hands."],
    },
    {
        question: "This question has no tips!", // Example without tips
    },
];

export default function QuestionsNavigator() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTipIndex, setCurrentTipIndex] = useState(-1); // State for showing tips incrementally

    const goToNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setCurrentTipIndex(-1); // Reset tips visibility for the next question
        }
    };

    const goToPreviousQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setCurrentTipIndex(-1); // Reset tips visibility for the previous question
        }
    };

    const revealNextTip = () => {
        if (currentTipIndex < (questions[currentIndex].tips?.length || 0) - 1) {
            setCurrentTipIndex(currentTipIndex + 1);
        }
    };

    const currentQuestion = questions[currentIndex];
    const allTipsRevealed = currentTipIndex >= (currentQuestion.tips?.length || 0) - 1;

    return (
        <div
            style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                backgroundColor: "#333",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                width: "520px",
            }}
        >
            {/* Display the current question */}
            <h4>Questions</h4>
            <p style={{ fontWeight: "bold" }}>{currentQuestion.question}</p>

            {/* Reveal Tips Button: Only visible if tips exist */}
            {currentQuestion.tips && currentQuestion.tips.length > 0 && (
                <button
                    onClick={revealNextTip}
                    disabled={allTipsRevealed} // Disable button when all tips are revealed
                    style={{
                        backgroundColor: allTipsRevealed ? "#ccc" : "#FFA500", // Gray out when disabled
                        color: "black",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        display: "block",
                        marginTop: "15px",
                        cursor: allTipsRevealed ? "not-allowed" : "pointer",
                    }}
                >
                    {allTipsRevealed ? "No more tips" : "Show Next Tip"}
                </button>
            )}

            {/* Display revealed tips */}
            {currentTipIndex >= 0 && currentQuestion.tips && (
                <div style={{ marginTop: "15px" }}>
                    <h5>Tips Revealed:</h5>
                    <ul style={{ paddingLeft: "20px" }}>
                        {currentQuestion.tips.slice(0, currentTipIndex + 1).map((tip, index) => (
                            <li key={index} style={{ marginBottom: "5px" }}>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Display message if no tips are available */}
            {!currentQuestion.tips && (
                <p style={{ fontStyle: "italic", color: "#aaa", marginTop: "15px" }}>
                    No tips available for this question.
                </p>
            )}

            {/* Navigation Buttons */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "15px",
                    marginTop: "10px",
                }}
            >
                {/* Previous Button */}
                <button
                    onClick={goToPreviousQuestion}
                    disabled={currentIndex === 0}
                    style={{
                        backgroundColor: "#FFA500",
                        color: "black",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: currentIndex === 0 ? "not-allowed" : "pointer",
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
                        backgroundColor: "#FFA500",
                        color: "black",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: currentIndex === questions.length - 1 ? "not-allowed" : "pointer",
                        opacity: currentIndex === questions.length - 1 ? 0.6 : 1,
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}