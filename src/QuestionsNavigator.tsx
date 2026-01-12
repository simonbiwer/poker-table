import { useState } from "react";

const questions = [
    {
        question: "Wie lang ist eine genormte EC-Karte?",
        tips: ["Eine EC-Karte ist 5,4 cm hoch.",
            "Die längste Praline der Welt ist mit 11,3 cm länger."],
    },
    {
        question: "Wie viele Seiten hat die gebundene StPO Kommentierung (62. Auflage 2019, Meyer Goßner/Schmitt)?",
        tips: ["Mit Einband ist die Kommentierung 6,0 cm dick.",
            "Wenn man ab heute jeden Tag 32 Seiten lesen würde, wäre man noch vor Ostern fertig."],
    },
    {
        question: "Wie lange ist der Skywalk (Homo)?",
        tips: ["Philipp Lahm würde die Strecke in unter 16 Sekunden laufen.",
            "Die Ortschaft 'Kommen' hat mit 282 Einwohnern (12/24) nicht einmal doppel so viele Einwohner wie der Skywalk Meter."],
    },
    {
        question: "Wie lange dauert laut Statista das Liebesspiel der Deutschen im Durchschnitt?",
        tips: ["Unser Sex-Nachbar Frankreich vergnügt sich im Durchschnitt 3 Minuten kürzer.",
            "Startet das Liebesspiel pünktlich zur Halbzeit eines Fußballspiels, verpasst man knapp den Anstoß zur 2. Hälfte."],
    },
    {
        question: "Wie viele TÜV-Verstöße hat Jessica im Jahr 2025 bearbeitet?",
        tips: ["Die Differenz zwischen der Lösung und dem Durchschnittsalter des aktuellen Schichtdienst beträgt 4,7.",
            "Natalie Meister steht alphabetisch an eben dieser Stelle in der Alarmierungsliste der PI BKS."],
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