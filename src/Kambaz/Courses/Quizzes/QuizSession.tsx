import {useParams} from "react-router";
import {useEffect, useState} from "react";
import * as coursesClient from "../client.ts";
import * as userClient from "../../Account/client.ts"
import FacultyOnlyRoute from "../../Account/FacultyOnlyRoute.tsx"
import {
    Container,
    Card,
    Form,
    Button,
    Spinner,
    Alert,
    ListGroup,
    ProgressBar,
    Row,
    Col,
    Badge
} from "react-bootstrap";
import {v4 as uuidv4} from "uuid";
import {AiOutlineExclamationCircle} from "react-icons/ai";
import {useSelector} from "react-redux";
import * as answersClient from "./Answers/client.ts"
import {useNavigate} from "react-router-dom";

export default function QuizSession() {
    const navigate = useNavigate()

    const {cid, qid} = useParams();
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentAnswers, setCurrentAnswers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [attemptNumber, setAttemptNumber] = useState(0)
    const [answerId, setAnswerId] = useState(0);
    const {currentUser} = useSelector((state: any) => state.accountReducer);

    const fetchQuizzes = async () => {
        try {
            const getQuizzes = await coursesClient.findQuizzesForCourse(cid as string);
            setQuizzes(getQuizzes);
        } catch (err) {
            setError("Failed to load quiz. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const fetchPreviousAnswer = async () => {
        try {
            const getAnswer = await userClient.findAnswerForUser(
                currentUser._id as string,
                qid as string,
                cid as string
            );

            if (getAnswer && typeof getAnswer.attemptNum === 'number') {
                setAttemptNumber(getAnswer.attemptNum + 1);
                setAnswerId(getAnswer._id)
            } else {
                setAttemptNumber(1);
                setAttemptNumber(uuidv4())
            }
        } catch (error) {
            console.error("Error fetching previous answer:", error);
            setAttemptNumber(1); // fallback in case of an actual error (e.g. network/server error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
        fetchPreviousAnswer();
    }, [currentUser]);

    const quiz = quizzes.find((q: any) => q._id === qid);

    useEffect(() => {
        if (quiz) {
            setQuestions(quiz.questions || []);
        }
    }, [quiz]);

    const handleSelectAnswer = (index: number, value: any) => {
        setCurrentAnswers({...currentAnswers, [index]: value});
    };

    const calculateScore = (currentAnswers: any, questions: any[]) => {
        let correctCount = 0;
        questions.forEach((question, index) => {
            const userAnswer = currentAnswers[index];
            switch (question.type) {
                case "multiple_choice":
                    if (userAnswer === question.correctAnswerIndex) {
                        correctCount++;
                    }
                    break;

                case "true_false":
                    if (userAnswer === question.correctAnswer) {
                        correctCount++;
                    }
                    break;

                case "fill_in_blank": {
                    const possibleAnswers = Array.isArray(question.possibleAnswers)
                        ? question.possibleAnswers
                        : [question.possibleAnswers];

                    const userText = (userAnswer || "").trim().toLowerCase();

                    const isCorrect = possibleAnswers.some(answer  =>
                        (answer || "").trim().toLowerCase() === userText
                    );

                    if (isCorrect) {
                        correctCount++;
                    }
                    break;
                }

                default:
                    break;
            }
        });
        console.log("correct count", correctCount);
        return correctCount / questions.length;
    };
    const handleSubmit = async () => {
        console.log("User:", currentUser?._id);
        console.log("Quiz ID:", qid);
        console.log("Course ID:", cid);
        console.log("Attempt Number:", attemptNumber);

        const score = calculateScore(currentAnswers, questions);
        const answer = {
            _id: answerId,
            quiz: qid,
            user: currentUser._id,
            course: cid,
            grade: score,
            date: new Date(),
            attemptNum: attemptNumber,
            answers: currentAnswers
        }
        // create answer object
        // check student answers against correct answers
        // calculate score
        // update answer object score
        //createAnswer(answer: any, courseId: string, quizId: string) if attemptNum = 1
        //updateAnswer if attemptNum > 1
        if (attemptNumber === 1) {
            const newAnswer = await userClient.createAnswer(answer, cid as string, qid as string);
            console.log("updateanswer from server: ", newAnswer)

            navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/${newAnswer._id}`)

        } else if (attemptNumber > 1) {
            await answersClient.updateAnswer(answer);
            const updatedAnswer = await userClient.findAnswerForUser(currentUser._id, qid as string, cid as string)
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/${updatedAnswer._id}`)

        }
        try {
            setLoading(true);

            setSubmitted(true);

        } catch (err) {
            setError("Failed to submit answers. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container className="text-center my-5" style={{color: "#555"}}>
                <Spinner animation="border" role="status" style={{color: "#777"}}>
                    <span className="visually-hidden">Loading quiz...</span>
                </Spinner>
                <p className="mt-2">Loading quiz...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="secondary">{error}</Alert>
            </Container>
        );
    }

    if (!quiz) {
        return (
            <Container className="my-5">
                <Alert variant="secondary">Quiz not found.</Alert>
            </Container>
        );
    }


    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <Container className="my-4" style={{maxWidth: "800px", color: "#333"}}>
            <Card className="mb-4" style={{border: "1px solid #ddd", borderRadius: "0", boxShadow: "none"}}>
                <Card.Header
                    as="h3"
                    style={{
                        backgroundColor: "#ffffff",
                        color: "#4c4c4c",
                        borderBottom: "1px solid #ddd",
                        borderRadius: "0"
                    }}
                >
                    {quiz.title}

                </Card.Header>
                <FacultyOnlyRoute>

                    <Card.Header
                        as="h6"
                        style={{
                            backgroundColor: "rgba(255,147,147,0.63)",
                            color: "#970000",
                            borderBottom: "1px solid #ddd",
                            borderRadius: "0",

                        }} className="pt-2"
                    >
                        <AiOutlineExclamationCircle></AiOutlineExclamationCircle> This is a preview of the published
                        version of the quiz
                    </Card.Header>
                </FacultyOnlyRoute>

                <Card.Body style={{padding: "1.5rem"}} className="pt-5">
                    {/* Current Question */}
                    {currentQuestion && (
                        <Card className="mb-4" style={{border: "1px solid #ddd", borderRadius: "0px"}}>
                            <Card.Header style={{backgroundColor: "#dfdfdf", borderBottom: "1px solid #ddd"}}>
                                <h5 style={{margin: "0"}}>
                                    Question {currentIndex + 1}{" "}
                                    <Badge
                                        bg="secondary"
                                        style={{
                                            backgroundColor: "#8e8d8d",
                                            borderRadius: "0",
                                            fontSize: "0.75rem",
                                            fontWeight: "normal"
                                        }}
                                    >
                                        {currentQuestion.type.replace("_", " ")}
                                    </Badge>
                                </h5>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text className="mb-4" style={{fontSize: "1rem"}}>
                                    {currentQuestion.questionText}
                                </Card.Text>

                                {/* Multiple Choice */}
                                {currentQuestion.type === "multiple_choice" && (
                                    <Form>
                                        <ListGroup variant="flush" style={{borderRadius: "0"}}>
                                            {currentQuestion.choices.map((choice: string, idx: number) => (
                                                <ListGroup.Item
                                                    key={idx}
                                                    style={{
                                                        padding: "0.75rem 1.25rem",
                                                        borderColor: "#ddd"
                                                    }}
                                                >
                                                    <Form.Check
                                                        type="radio"
                                                        id={`choice-${currentIndex}-${idx}`}
                                                        name={`question-${currentIndex}`}
                                                        label={choice}
                                                        checked={currentAnswers[currentIndex] === idx}
                                                        onChange={() => handleSelectAnswer(currentIndex, idx)}
                                                        style={{color: "#373737"}}
                                                    />
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Form>
                                )}

                                {/* True/False */}
                                {currentQuestion.type === "true_false" && (
                                    <Form>
                                        <ListGroup variant="flush" style={{borderRadius: "0"}}>
                                            {[true, false].map((val, idx) => (
                                                <ListGroup.Item
                                                    key={idx}
                                                    style={{
                                                        padding: "0.75rem 1.25rem",
                                                        borderColor: "#ddd"
                                                    }}
                                                >
                                                    <Form.Check
                                                        type="radio"
                                                        id={`tf-${currentIndex}-${idx}`}
                                                        name={`question-${currentIndex}`}
                                                        label={val ? "True" : "False"}
                                                        checked={currentAnswers[currentIndex] === val}
                                                        onChange={() =>
                                                            handleSelectAnswer(currentIndex, val)
                                                        }
                                                        style={{color: "#333"}}
                                                    />
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Form>
                                )}

                                {/* Fill in the Blank */}
                                {currentQuestion.type === "fill_in_blank" && (
                                    <Form.Group controlId={`fillBlank-${currentIndex}`}>
                                        <Form.Control
                                            type="text"
                                            value={currentAnswers[currentIndex] || ""}
                                            onChange={(e) =>
                                                handleSelectAnswer(currentIndex, e.target.value)
                                            }
                                            placeholder="Type your answer here..."
                                            style={{
                                                borderRadius: "0",
                                                borderColor: "#ddd",
                                                color: "#333"
                                            }}
                                        />
                                    </Form.Group>
                                )}
                            </Card.Body>
                        </Card>
                    )}

                    {/* Navigation Buttons */}
                    <Row className="g-2 mb-4">
                        <Col md={4}>
                            <Button
                                variant="light"
                                onClick={() =>
                                    setCurrentIndex((prev) => Math.max(prev - 1, 0))
                                }
                                disabled={currentIndex === 0}
                                className="w-100"
                                style={{
                                    borderRadius: "0",
                                    borderColor: "#ddd",
                                    color: "#333"
                                }}
                            >
                                Previous
                            </Button>
                        </Col>
                        <Col md={4} className="mx-auto">
                            <Button
                                variant="light"
                                onClick={() =>
                                    setCurrentIndex((prev) =>
                                        Math.min(prev + 1, questions.length - 1)
                                    )
                                }
                                disabled={currentIndex === questions.length - 1}
                                className="w-100"
                                style={{
                                    borderRadius: "0",
                                    borderColor: "#b1b1b1",
                                    color: "#3c3c3c"
                                }}
                            >
                                Next
                            </Button>
                        </Col>
                        <Col md={4}>
                            <Button
                                variant="danger"
                                onClick={handleSubmit}
                                className="w-100 wd-bg-color-red"
                                disabled={Object.keys(currentAnswers).length !== questions.length}
                                style={{borderRadius: "0"}}
                            >
                                Submit Quiz
                            </Button>
                        </Col>
                    </Row>

                    {/* Progress Bar - Smaller and at bottom */}
                    <div className="mb-2">
                        <ProgressBar
                            now={progress}
                            style={{
                                height: "6px",
                                borderRadius: "0",
                                backgroundColor: "#eee"
                            }}
                            variant="secondary"
                        />
                    </div>

                    {/* Question Navigation - Smaller and at bottom */}
                    <div className="d-flex flex-wrap gap-1">
                        {questions.map((_, i) => (
                            <Button
                                key={i}
                                variant={i === currentIndex ? "dark" : "outline-dark"}
                                onClick={() => setCurrentIndex(i)}
                                size="sm"
                                style={{
                                    borderRadius: "0",
                                    padding: "0.15rem 0.5rem",
                                    fontSize: "0.75rem",
                                    borderColor: "#ddd"
                                }}
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}