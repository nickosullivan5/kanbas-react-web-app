import {Link, useParams} from "react-router";
import {useState} from "react";
import dummyquizzes from "./dummy.json";
import {Button, Col, Form, Row, Tab, Tabs} from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {AiOutlineCheck, AiOutlineStop} from "react-icons/ai";

export default function QuizEditor() {
    const [activeTab, setActiveTab] = useState("details");
    const {cid, qid} = useParams();

    const [quizzes] = useState(dummyquizzes);
    const quizExists = quizzes.find((a: { _id: string | undefined }) => a._id === qid);

    const [courseID] = useState(cid);
    const [title, setTitle] = useState(quizExists?.title || "Quiz _");
    const [description, setDescription] = useState(quizExists?.description || "The QUIZ is available online.");
    const [quizType, setQuizType] = useState(quizExists?.quizType || "Graded Quiz");
    const [points, setPoints] = useState(quizExists?.points || 0);
    const [assignmentGroup, setAssignmentGroup] = useState(quizExists?.assignmentGroup || "Quizzes");
    const [shuffleAnswers, setShuffleAnswers] = useState(quizExists?.shuffleAnswers || "Yes");
    const [timeLimit, setTimeLimit] = useState(quizExists?.timeLimit || 20);
    const [multipleAttempts, setMultipleAttempts] = useState(quizExists?.multipleAttempts || false);
    const [howManyAttempts, setHowManyAttempts] = useState(quizExists?.howManyAttempts || 0);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(quizExists?.showCorrectAnswers || "Immediately after each attempt");
    const [accessCode, setAccessCode] = useState(quizExists?.accessCode || "");
    const [oneQuestionAtATime, setOneQuestionAtATime] = useState(quizExists?.oneQuestionAtATime || true);
    const [webcamRequired, setWebcamRequired] = useState(quizExists?.webcamRequired || false);
    const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(quizExists?.lockQuestionsAfterAnswering || false);
    const [dueDate, setDueDate] = useState(quizExists?.dueDate || "2025-01-01");
    const [availableDate, setAvailableDate] = useState(quizExists?.availableDate || "2025-01-01");
    const [untilDate, setUntilDate] = useState(quizExists?.untilDate || "2025-01-01");
    const [published, setPublished] = useState(quizExists?.published || false);
    const [questions, setQuestions] = useState(quizExists?.questions || [])

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
                                                checked={shuffleAnswers === "Yes"}
                                                onChange={(e) => setShuffleAnswers(e.target.checked ? "Yes" : "No")}
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

                        {/*<Form.Group as={Row} className="mb-4">*/}
                        {/*    <Form.Label column sm={3}>Published</Form.Label>*/}
                        {/*    <Col sm={9}>*/}
                        {/*        <Form.Check*/}
                        {/*            type="checkbox"*/}
                        {/*            checked={published}*/}
                        {/*            onChange={(e) => setPublished(e.target.checked)}*/}
                        {/*        />*/}
                        {/*    </Col>*/}
                        {/*</Form.Group>*/}

                        <div className="d-flex gap-2">
                            <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                                <Button variant="primary">Save</Button>
                            </Link>

                            <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                                <Button variant="danger" onChange={(e) => setPublished(true)}>Save & Publish</Button>
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
                            <h2 className="text-xl font-semibold">Questions</h2>
                            <span
                                className="text-muted-foreground">Total Points: {questions.reduce((acc, q) => acc + q.points, 0)}</span>
                        </div>

                        {questions.map((q, index) => (
                            <div
                                key={index}
                                className="rounded-xl border p-4 shadow-sm bg-white space-y-2"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium">{q.questionText}</h3>
                                    <span className="text-muted-foreground text-sm">{q.type} — {q.points} pts</span>
                                </div>

                                {q.type === "Multiple Choice" && (
                                    <ul className="list-disc pl-6 space-y-1">
                                        {q.choices.map((choice, i) => (
                                            <li key={i} className={i === q.correctAnswerIndex ? "font-semibold" : ""}>
                                                {choice}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {q.type === "True Or False" && (
                                    <p className="text-muted-foreground">
                                        Correct Answer: <span
                                        className="font-medium">{q.correctAnswer ? "True" : "False"}</span>
                                    </p>
                                )}

                                {q.type === "Fill In The Blank" && (
                                    <div>
                                        <p className="text-muted-foreground">Accepted Answers:</p>
                                        <ul className="list-disc pl-6">
                                            {q.possibleAnswers.map((ans, i) => (
                                                <li key={i}>{ans}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="pt-4">
                            <Button variant="outline" className="w-full">
                                + New Question
                            </Button>
                        </div>
                        <div>
                            <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                                <Button variant="danger">Save</Button>
                            </Link>

                            <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                                <Button variant="secondary">Cancel</Button>

                            </Link>
                        </div>
                    </div>

                </Tab>
            </Tabs>
        </div>
    );
}
