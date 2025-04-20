import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {Button, Col, Form, Row, Tab, Tabs} from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {AiOutlineCheck, AiOutlineStop} from "react-icons/ai";
import {FaPencil} from "react-icons/fa6";
import QuestionEditor from "./Question/QuestionEditor.tsx";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import {FaTrash} from "react-icons/fa";

export default function QuizEditor() {
    const {cid, qid} = useParams();
    const [activeTab, setActiveTab] = useState("details");
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [points, setPoints] = useState(0);
    // const [courseID] = useState(cid); // Ensure this is unconditionally used

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [quizType, setQuizType] = useState("Graded Quiz");
    const [assignmentGroup, setAssignmentGroup] = useState("Quizzes");
    const [shuffleAnswers, setShuffleAnswers] = useState(true);
    const [timeLimit, setTimeLimit] = useState(20);
    const [multipleAttempts, setMultipleAttempts] = useState(false);
    const [howManyAttempts, setHowManyAttempts] = useState(1);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState("Immediately after each attempt");
    const [accessCode, setAccessCode] = useState("");
    const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
    const [webcamRequired, setWebcamRequired] = useState(false);
    const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(false);
    const [dueDate, setDueDate] = useState("2025-01-01");
    const [availableDate, setAvailableDate] = useState("2025-01-01");
    const [untilDate, setUntilDate] = useState("2025-01-01");
    const [published, setPublished] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

    const fetchQuizzes = async () => {
        const getQuizzes = await coursesClient.findQuizzesForCourse(cid as string);
        setQuizzes(getQuizzes);
        console.log("quizzes from server: ", getQuizzes)
        setLoading(false);
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const quizExists = quizzes.find((a: { _id: string }) => a._id === qid);

    useEffect(() => {
        if (quizExists) {
            setTitle(quizExists.title);
            setDescription(quizExists.description);
            setQuizType(quizExists.quizType);
            setAssignmentGroup(quizExists.assignmentGroup);
            setShuffleAnswers(quizExists.shuffleAnswers);
            setTimeLimit(quizExists.timeLimit);
            setMultipleAttempts(quizExists.multipleAttempts);
            setHowManyAttempts(quizExists.howManyAttempts);
            setShowCorrectAnswers(quizExists.showCorrectAnswers);
            setAccessCode(quizExists.accessCode);
            setOneQuestionAtATime(quizExists.oneQuestionAtATime);
            setWebcamRequired(quizExists.webcamRequired);
            setLockQuestionsAfterAnswering(quizExists.lockQuestionsAfterAnswering);
            setDueDate(quizExists.dueDate);
            setAvailableDate(quizExists.availableDate);
            setUntilDate(quizExists.untilDate);
            setPublished(quizExists.published);
            setQuestions(quizExists.questions);
        }
    }, [quizExists]);

    const calculateTotalPoints = () => {
        setPoints(questions.reduce((acc: Number, q: any) => acc + q.points, 0));
    };

    const updateQuizForCourse = async (publish: boolean = published) => {
        const updatedQuiz = {
            ...quizExists,
            title: title,
            description: description,
            quizType: quizType,
            points: points,
            assignmentGroup: assignmentGroup,
            shuffleAnswers: shuffleAnswers,
            timeLimit: timeLimit,
            multipleAttempts: multipleAttempts,
            howManyAttempts: howManyAttempts === 0 ? 1 : howManyAttempts,
            showCorrectAnswers: showCorrectAnswers,
            accessCode: accessCode,
            oneQuestionAtATime: oneQuestionAtATime,
            webcamRequired: webcamRequired,
            lockQuestionsAfterAnswering: lockQuestionsAfterAnswering,
            dueDate: dueDate,
            availableDate: availableDate,
            untilDate: untilDate,
            published: publish,
            questions: questions
        };
        await quizzesClient.updateQuiz(updatedQuiz);
        console.log("updated QUiz: ", updatedQuiz)
        fetchQuizzes();
        calculateTotalPoints();
    };

    if (loading) {
        return <div className="text-center mt-5">Loading quiz...</div>;
    }

    if (!quizExists) {
        return <div className="text-center mt-5 text-danger">Quiz not found.</div>;
    }
    console.log("questions: ", questions)
        console.log("how many atempts:" , howManyAttempts)

    return (
        <div className="p-4">
            <div className="d-flex justify-content-end align-items-center gap-3 mb-3">
                <h5 className="text-secondary mb-0">Points: {points}</h5>
                <span className="text-muted d-flex align-items-center gap-1">
                    {published ? (
                        <>
                            Published <AiOutlineCheck className="text-success fs-5"/>
                        </>
                    ) : (
                        <>
                            Not Published <AiOutlineStop className="text-secondary fs-5"/>
                        </>
                    )}
                </span>
            </div>
            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || "details")} className="mb-3">
                <Tab eventKey="details" title="Details">
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Title</Form.Label>
                            <Col sm={9}>
                                <Form.Control value={title} onChange={(e) => setTitle(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4">
                            <Form.Label column sm={3}>Quiz Instructions</Form.Label>
                            <Col sm={9}>
                                <div style={{maxHeight: "250px", overflow: "auto"}}>
                                    <ReactQuill
                                        theme="snow"
                                        value={description}
                                        onChange={setDescription}
                                        style={{height: "300px"}}
                                    />
                                </div>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Quiz Type</Form.Label>
                            <Col sm={9}>
                                <Form.Select value={quizType} onChange={(e) => setQuizType(e.target.value)}>
                                    <option>Graded Quiz</option>
                                    <option>Practice Quiz</option>
                                    <option>Graded Survey</option>
                                    <option>Ungraded Survey</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-4">
                            <Form.Label column sm={3}>Assignment Group</Form.Label>
                            <Col sm={9}>
                                <Form.Select value={assignmentGroup}
                                             onChange={(e) => setAssignmentGroup(e.target.value)}>
                                    <option>Quizzes</option>
                                    <option>Exams</option>
                                    <option>Assignments</option>
                                    <option>Project</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        {/* Options Section */}
                        <div className="p-3 border rounded mb-4" style={{borderStyle: "dotted"}}>
                            <h5 className="mb-3">Options</h5>

                            <Row className="mb-3">
                                <Col sm={6}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={6}>Shuffle Answers</Form.Label>
                                        <Col sm={6}>
                                            <Form.Check
                                                type="checkbox"
                                                onChange={(e) => setShuffleAnswers(e.target.checked)}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col sm={6}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={6}>One Q at a Time</Form.Label>
                                        <Col sm={6}>
                                            <Form.Check
                                                type="checkbox"
                                                checked={oneQuestionAtATime}
                                                onChange={(e) => setOneQuestionAtATime(e.target.checked)}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Row className="mb-3">
                                <Col sm={6}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={6}>Multiple Attempts</Form.Label>
                                        <Col sm={6}>
                                            <Form.Check
                                                type="checkbox"
                                                checked={multipleAttempts}
                                                onChange={(e) => setMultipleAttempts(e.target.checked)}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col sm={6}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={6}>Webcam Required</Form.Label>
                                        <Col sm={6}>
                                            <Form.Check
                                                type="checkbox"
                                                checked={webcamRequired}
                                                onChange={(e) => setWebcamRequired(e.target.checked)}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>


                            </Row>
                            <Row className="mb-3">
                                <Col sm={6}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={6}>Lock Qs After Answering</Form.Label>
                                        <Col sm={6}>
                                            <Form.Check
                                                type="checkbox"
                                                checked={lockQuestionsAfterAnswering}
                                                onChange={(e) => setLockQuestionsAfterAnswering(e.target.checked)}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm={6}>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={6}>Show Correct Answers</Form.Label>
                                        <Col sm={6}>
                                            <Form.Select value={showCorrectAnswers}
                                                         onChange={(e) => setShowCorrectAnswers(e.target.value)}>
                                                <option>After last attempt</option>
                                                <option>Never</option>
                                                <option>After each attempt</option>
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm={6}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={6}>Time Limit (min)</Form.Label>
                                        <Col sm={6}>
                                            <Form.Control
                                                type="number"
                                                value={timeLimit}
                                                onChange={(e) => setTimeLimit(Number(e.target.value))}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                {multipleAttempts && (
                                    <Form.Group className="mb-3">
                                        <Form.Label column sm={6}>Max Attempts</Form.Label>
                                        <Col sm={6}>
                                            <Form.Control
                                                type="number"
                                                value={howManyAttempts}
                                                onChange={(e) => setHowManyAttempts(Number(e.target.value))}
                                            />
                                        </Col>
                                    </Form.Group>
                                )}
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>Access Code</Form.Label>
                                    <Col sm={6}>
                                        <Form.Control
                                            value={accessCode}
                                            onChange={(e) => setAccessCode(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Row>


                        </div>

                        {/* Dates & Publishing */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Available Date</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="date"
                                    value={availableDate}
                                    onChange={(e) => setAvailableDate(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Until Date</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="date"
                                    value={untilDate}
                                    onChange={(e) => setUntilDate(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Due Date</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <div className="d-flex gap-2">
                            <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                                <Button variant="primary" onClick={() => updateQuizForCourse()}>Save</Button>
                            </Link>

                            <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                                <Button variant="danger" onClick={() => {
                                    updateQuizForCourse(true); // pass true to indicate publish

                                }}>Save & Publish</Button>
                            </Link>

                            <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                                <Button variant="secondary">Cancel</Button>
                            </Link>
                        </div>

                    </Form>
                </Tab>

                <Tab eventKey="questions" title="Questions">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <span
                                className="text-muted-foreground">Total Points: <b>{points}</b></span>
                        </div>

                        {questions.map((q: any, index) => (
                            <div key={index} className="rounded-xl border p-4 shadow-sm bg-white space-y-2">
                                {editingQuestionIndex === index ? (
                                    <QuestionEditor
                                        question={q}
                                        onCancel={() => setEditingQuestionIndex(null)}
                                        onSave={(updatedQuestion: any) => {
                                            const updated = [...questions];
                                            updated[index] = updatedQuestion;
                                            setQuestions(updated);
                                            setEditingQuestionIndex(null);
                                        }}
                                    />
                                ) : (
                                    <>
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-medium">{q.questionText}</h3>
                                            <span className="text-muted-foreground text-sm">
                                                {q.title}: <b>{q.points}</b> pts
                                            </span>
                                        </div>

                                        {q.type === "multiple_choice" && (
                                            <ul className="pl-6 space-y-1">
                                                {q.choices.map((choice: any, i: any) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        {i === q.correctAnswerIndex && (
                                                            <AiOutlineCheck className="h-4 w-4 text-green-600"/>
                                                        )}
                                                        <span>{choice}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                    {q.type === "true_false" && (
                                        <p className="text-muted-foreground">
                                            Correct Answer: <span
                                            className="font-medium">{q.correctAnswer ? "True" : "False"}</span>
                                        </p>
                                    )}

                                    {q.type === "fill_in_blank" && (
                                        <div>
                                            <p className="text-muted-foreground">Accepted Answers:</p>
                                            <ul className="list-disc pl-6">
                                                {q.possibleAnswers.map((ans, i) => (
                                                    <li key={i}>{ans}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                        <span>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-sm text-muted-foreground hover:text-black flex items-center gap-md-3 ml-auto btn-outline rounded-0"
                                            onClick={() => setEditingQuestionIndex(index)}
                                        >
                                            <FaPencil className="w-4 h-4"/>
                                            Edit

                                    </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-sm text-muted-foreground hover:text-black flex items-center gap-md-3 ml-auto btn-outline rounded-0"
                                            onClick={() => {const updated = [...questions];
                                                updated.splice(index, 1); // Remove one item at the given index
                                                setQuestions(updated);
                                                setEditingQuestionIndex(null);}}>

                                            <FaTrash className="w-4 h-4"/>
                                            Delete

                                        </Button>
 </span>
                                    </>
                                )}
                            </div>
                        ))}

                        <div className="pt-3 pb-4 ">
                            <Button
                                variant="light"
                                className="w-full rounded-0 btn-outline-dark"
                                onClick={() => {
                                    const updated = [...questions];
                                    const defaultQuestion = {
                                        type: "multiple_choice",
                                        title: "Multiple Choice",
                                        points: 20,
                                        questionText: "New Question",
                                        choices: [],
                                        correctAnswerIndex: 0
                                    };
                                    updated.push(defaultQuestion);
                                    setQuestions(updated);
                                    setEditingQuestionIndex(null);
                                }}
                            >
                                + New Question
                            </Button>
                        </div>
                        <Row>
                            <br/>
                            <hr></hr>
                            <div className="pt-2 fs-3">
                                <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                                    <Button variant="danger" className="rounded-0"
                                            onClick={() => updateQuizForCourse()}>Save</Button>
                                </Link>

                                <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                                    <Button variant="light" className="rounded-0">Cancel</Button>
                                </Link>
                            </div>
                        </Row>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}