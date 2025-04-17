import { useState, useEffect } from "react";

export default function MultipleChoiceQuestionEditor({ choices, correctAnswerIndex, onChange }) {
    const [editingChoices, setChoices] = useState(choices);
    const [editingCorrectAnswerIndex, setCorrectAnswerIndex] = useState(correctAnswerIndex);

    // Call onChange with updated data
    const handleSave = (updatedChoices = editingChoices, updatedCorrectIndex = editingCorrectAnswerIndex) => {
        onChange(updatedChoices, updatedCorrectIndex);
    };

    // Keep internal state in sync if props change
    useEffect(() => {
        setChoices(choices);
        setCorrectAnswerIndex(correctAnswerIndex);
    }, [choices, correctAnswerIndex]);

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
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label>Choices</label>
                {editingChoices.map((choice: any, i: any) => (
                    <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <input
                            type="radio"
                            name="correct"
                            checked={editingCorrectAnswerIndex === i}
                            onChange={() => {
                                setCorrectAnswerIndex(i);
                                handleSave(editingChoices, i);
                            }}
                        />
                        <textarea
                            value={choice}
                            onChange={(e) => {
                                const updatedChoices = [...editingChoices];
                                updatedChoices[i] = e.target.value;
                                setChoices(updatedChoices);
                                handleSave(updatedChoices, editingCorrectAnswerIndex);
                            }}
                            style={{ flex: 1, padding: "0.5rem" }}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                const updatedChoices = editingChoices.filter((_, idx) => idx !== i);
                                let updatedCorrectIndex = editingCorrectAnswerIndex;

                                if (editingCorrectAnswerIndex === i) {
                                    updatedCorrectIndex = null; // deleted correct choice
                                } else if (editingCorrectAnswerIndex > i) {
                                    updatedCorrectIndex = editingCorrectAnswerIndex - 1;
                                }

                                setChoices(updatedChoices);
                                setCorrectAnswerIndex(updatedCorrectIndex);
                                handleSave(updatedChoices, updatedCorrectIndex);
                            }}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => {
                        const updatedChoices = [...editingChoices, ""];
                        setChoices(updatedChoices);
                        handleSave(updatedChoices, editingCorrectAnswerIndex);
                    }}
                >
                    + Add Choice
                </button>
            </div>
        </div>
    );
}
