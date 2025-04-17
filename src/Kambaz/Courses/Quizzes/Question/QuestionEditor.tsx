import { useEffect, useState } from "react";
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import FillInTheBlankQuestionEditor from "./FillInTheBlankQuestionEditor";

export default function QuestionsEditor({ question, onCancel, onSave }) {
    const [editingQuestion, setEditingQuestion] = useState({ ...question });

    useEffect(() => {
        setEditingQuestion({ ...question });
    }, [question]);

    const handleSave = () => {
        onSave(editingQuestion);
    };

    const updateField = (field: any, value: any) => {
        setEditingQuestion((prev: any) => ({ ...prev, [field]: value }));
    };

    return (
        <div
            style={{
                padding: "1rem",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
            className="rounded-0"
        >
            {/* Shared Fields */}
            <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                    <label>Question</label>
                    <input
                        type="text"
                        value={editingQuestion.questionText}
                        onChange={(e) => updateField("questionText", e.target.value)}
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>
                <div>
                    <label>Points</label>
                    <input
                        type="number"
                        value={editingQuestion.points}
                        onChange={(e) => updateField("points", parseInt(e.target.value))}
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>
            </div>

            <div>
                <label>Question Type</label>
                <select
                    value={editingQuestion.type}
                    onChange={(e) => updateField("type", e.target.value)}
                    style={{ width: "100%", padding: "0.5rem" }}
                >
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="True Or False">True/False</option>
                    <option value="Fill In The Blank">Fill in the Blank</option>
                </select>
            </div>



            {/* Dynamic Sub-Editor */}
            {editingQuestion.type === "Multiple Choice" && (
                <MultipleChoiceQuestionEditor
                    choices={editingQuestion.choices || []}
                    correctAnswerIndex={editingQuestion.correctAnswerIndex}
                    onChange={(newChoices, newCorrect) =>
                        setEditingQuestion((prev) => ({
                            ...prev,
                            choices: newChoices,
                            correctAnswerIndex: newCorrect,
                        }))
                    }
                />
            )}

            {editingQuestion.type === "True Or False" && (
                <TrueFalseQuestionEditor
                    correctAnswer={editingQuestion.correctAnswer}
                    onChange={(newAnswer) =>
                        setEditingQuestion((prev) => ({
                            ...prev,
                            correctAnswer: newAnswer,
                        }))
                    }
                />
            )}

            {editingQuestion.type === "Fill In The Blank" && (
                <FillInTheBlankQuestionEditor
                    answers={editingQuestion.possibleAnswers || []}
                    onChange={(newAnswers) =>
                        setEditingQuestion((prev) => ({
                            ...prev,
                            possibleAnswers: newAnswers,
                        }))
                    }
                />
            )}

            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="button" onClick={handleSave}>
                    Update Question
                </button>
            </div>
        </div>
    );
}
