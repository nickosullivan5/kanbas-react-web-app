import { useState, useEffect } from "react";

export default function TrueFalseQuestionEditor({ correctAnswer, onChange }) {
    const [editingCorrectAnswer, setEditingCorrectAnswer] = useState(correctAnswer);

    const handleSave = (updatedAnswer = editingCorrectAnswer) => {
        onChange(updatedAnswer);
    };

    useEffect(() => {
        setEditingCorrectAnswer(correctAnswer);
    }, [correctAnswer]);

    return (
        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <label>Correct Answer</label>
            <div style={{ display: "flex", gap: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input
                        type="radio"
                        name="trueFalse"
                        value="true"
                        checked={editingCorrectAnswer === true}
                        onChange={() => {
                            setEditingCorrectAnswer(true);
                            handleSave(true);
                        }}
                    />
                    True
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input
                        type="radio"
                        name="trueFalse"
                        value="false"
                        checked={editingCorrectAnswer === false}
                        onChange={() => {
                            setEditingCorrectAnswer(false);
                            handleSave(false);
                        }}
                    />
                    False
                </label>
            </div>
        </div>
    );
}
