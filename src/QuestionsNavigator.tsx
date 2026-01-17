import { useState } from "react";
import questionsJson from "../data/questions.json"

type Question = {
    question: string;
    tips: string[];
    solution: string;
}

type Questions = Question[];

const questions: Questions = questionsJson as Questions;


export default function QuestionsNavigator() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTipIndex, setCurrentTipIndex] = useState(-1); // State for showing tips incrementally
    const [solutionRevealed, setSolutionRevealed] = useState(false); // Track whether the solution is revealed


    const goToNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setCurrentTipIndex(-1); // Reset tips visibility for the next question
            setSolutionRevealed(false)
        }
    };

    const goToPreviousQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setCurrentTipIndex(-1); // Reset tips visibility for the previous question
            setSolutionRevealed(false)
        }
    };

    const revealNextTip = () => {
        if (currentTipIndex < (questions[currentIndex].tips?.length || 0) - 1) {
            setCurrentTipIndex(currentTipIndex + 1);
        }
    };

    const revealSolution = () => {
        setSolutionRevealed(true); // Reveal the solution
        setCurrentTipIndex(-1)
    };

    const currentQuestion = questions[currentIndex];
    const allTipsRevealed = currentTipIndex >= (currentQuestion.tips?.length || 0) - 1;

    if (!questions || questions.length === 0){
        return <p>No questions available.</p>;
    }

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

            {/* Show Solution */}
            {!solutionRevealed && (
                <button
                    onClick={revealSolution}
                    style={{
                        backgroundColor: "#4CAF50", // Green color for the solution button
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        marginTop: "10px",
                        cursor: "pointer",
                    }}
                >
                    Show Solution
                </button>
            )}

            {/* Revealed Solution */}
            {solutionRevealed && (
                <div
                    style={{
                        marginTop: "10px",
                        border: "1px solid #4CAF50",
                        padding: "5px",
                        borderRadius: "6px",
                        backgroundColor: "#222",
                        maxWidth: "300px",
                        fontSize: "14px",
                        lineHeight: "1.4",
                        textAlign: "left"
                    }}
                >
                    <h5
                        style={{
                            fontSize: "16px",
                            margin: "0 0 8px",
                        }}
                    >
                        Solution:
                    </h5>
                    <p>{currentQuestion.solution}</p>
                </div>
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