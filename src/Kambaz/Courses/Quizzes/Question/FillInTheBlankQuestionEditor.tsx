import { useState, useEffect } from "react";

export default function FillInTheBlankQuestionEditor({ answers, onChange }) {
    const [editingAnswers, setEditingAnswers] = useState(answers);

    const handleSave = (updatedAnswers = editingAnswers) => {
        onChange(updatedAnswers);
    };

    useEffect(() => {
        setEditingAnswers(answers);
    }, [answers]);

    const updateAnswer = (index, value) => {
        const updated = [...editingAnswers];
        updated[index] = value;
        setEditingAnswers(updated);
        handleSave(updated);
    };

    const addAnswer = () => {
        const updated = [...editingAnswers, ""];
        setEditingAnswers(updated);
        handleSave(updated);
    };

    const removeAnswer = (index) => {
        const updated = editingAnswers.filter((_, i) => i !== index);
        setEditingAnswers(updated);
        handleSave(updated);
    };

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
            <label>Accepted Answers</label>
            {editingAnswers.map((answer, i) => (
                <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => updateAnswer(i, e.target.value)}
                        style={{ flex: 1, padding: "0.5rem" }}
                    />
                    <button type="button" onClick={() => removeAnswer(i)}>
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={addAnswer}>
                + Add Answer
            </button>
        </div>
    );
}
