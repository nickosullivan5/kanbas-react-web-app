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
import { FaCheck } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import {AiOutlineExclamationCircle} from "react-icons/ai";
import {useSelector} from "react-redux";

export default function QuizResult() {
    const {cid, qid} = useParams();
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    // const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const [answer, setAnswer] = useState<any>();

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

            setAnswer(getAnswer);
        } catch (error) {
            console.error("Error fetching previous answer:", error);
        } finally {
            setLoading(false);
        }
    };
        // useEffect(() => {
        //     if (!currentUser || !currentUser._id) return;
        //
        //     fetchQuizzes();
        //     fetchPreviousAnswer();
        // }, [currentUser]);

const [quiz, setQuiz] = useState<any>(null);
useEffect(() => {
    const init = async () => {
        if (!currentUser || !currentUser._id) return;

        try {
            const [getQuizzes, getAnswer] = await Promise.all([
                coursesClient.findQuizzesForCourse(cid as string),
                userClient.findAnswerForUser(currentUser._id, qid as string, cid as string)
            ]);

            setQuizzes(getQuizzes);
            const foundQuiz = getQuizzes.find((q: any) => q._id === qid);
            setQuiz(foundQuiz || null);
            setQuestions(foundQuiz?.questions || []);
            setAnswer(getAnswer);
        } catch (err) {
            setError("Failed to load quiz. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    init();
}, [currentUser, cid, qid]);


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
    console.log("questions: ", questions)
    console.log("answer: ", answer)
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <Container className="my-4" style={{maxWidth: "800px", color: "#333"}}>
            <Card className="mb-4" style={{border: "1px solid #ddd", borderRadius: "0", boxShadow: "none"}}>
                <Card.Header
                    as="h3"
                    style={{
                        backgroundColor: "#ffffff",
                        color: "#434343",
                        borderBottom: "1px solid #ddd",
                        borderRadius: "0"
                    }}
                >
                    Results for: <b>{quiz.title}</b>
                    <h5>Score: <b className={"text-dark"}>{answer.grade * 100}%</b> </h5>

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
                                        <ListGroup variant="flush" style={{ borderRadius: "0" }}>
                                            {currentQuestion.choices.map((choice: string, idx: number) => {
                                                const isCorrect = idx === currentQuestion.correctAnswerIndex;
                                                console.log("idx: ", idx)
                                                console.log("user answer:  ", answer.answers[0][currentIndex])
                                                const isUserChoice = answer.answers[0][currentIndex] === idx;
                                                console.log("is user choice: ", isUserChoice)
                                                const isWrongUserChoice = isUserChoice && !isCorrect;
                                                console.log('is wrong user choice: ', isWrongUserChoice)

                                                return (
                                                <ListGroup.Item
                                                    key={idx}
                                                    style={{
                                                        padding: "0.75rem 1.25rem",
                                                        borderColor: "#ddd",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between"
                                                    }}
                                                >
                                                    <Form.Check
                                                        type="radio"
                                                        id={`choice-${currentIndex}-${idx}`}
                                                        name={`question-${currentIndex}`}
                                                        label={choice}
                                                        checked={isUserChoice}
                                                        disabled // disables the button
                                                        style={{ color: "#373737" }}
                                                    />

                                                    {/* Icon rendering */}
                                                    {isCorrect && (
                                                        <FaCheck style={{ color: "green", marginLeft: "0.5rem" }} />
                                                    )}
                                                    {isWrongUserChoice && (
                                                        <FiXCircle style={{ color: "red", marginLeft: "0.5rem" }} />
                                                    )}
                                                </ListGroup.Item>
                                                );
                                            })}
                                        </ListGroup>
                                    </Form>
                                )}

                                {/* True/False */}
                                {currentQuestion.type === "true_false" && (
                                    <Form>
                                        <ListGroup variant="flush" style={{borderRadius: "0"}}>
                                            {[true, false].map((val, idx) => {
                                                const isCorrect = val === currentQuestion.correctAnswer;
                                                console.log('is correct', isCorrect)
                                                console.log("user answer:  ", answer.answers[0][currentIndex])
                                                const isUserChoice = answer.answers[0][currentIndex] === val;
                                                const isWrongUserChoice = isUserChoice && !isCorrect;
                                                console.log("iswrong user choice: ", isWrongUserChoice)

                                                return (
                                                    <ListGroup.Item
                                                        key={idx}
                                                        style={{
                                                            padding: "0.75rem 1.25rem",
                                                            borderColor: "#ddd",
                                                            display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between"
                                                        }}
                                                    >
                                                        <Form.Check
                                                            type="radio"
                                                            id={`tf-${currentIndex}-${idx}`}
                                                            name={`question-${currentIndex}`}
                                                            label={val ? "True" : "False"}
                                                            checked={isUserChoice}
                                                            disabled
                                                            style={{color: "#333"}}
                                                        />

                                                        {/* Icon rendering */}
                                                        {isCorrect && (
                                                            <FaCheck style={{ color: "green", marginLeft: "0.5rem" }} />
                                                        )}
                                                        {isWrongUserChoice && (
                                                            <FiXCircle style={{ color: "red", marginLeft: "0.5rem" }} />
                                                        )}
                                                    </ListGroup.Item>
                                                )
                                            })}
                                        </ListGroup>
                                    </Form>
                                )}

                                {/* Fill in the Blank */}
                                {currentQuestion.type === "fill_in_blank" && (
                                    <div>
                                        <Form.Group
                                        controlId={`fillBlank-${currentIndex}`}
                                        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                                        >
                                        <Form.Control
                                            type="text"
                                            value={answer.answers[0][currentIndex]}
                                            disabled
                                             placeholder={answer.answers[0][currentIndex]}
                                            style={{
                                                borderRadius: "0",
                                            borderColor: "#ddd",
                                            color: "#333",
                                            flexGrow: 1
                                            }}
                                        />

                                        {/* Show icon */}
                                        {answer.answers[0][currentIndex] &&
                                            currentQuestion.possibleAnswers.some(
                                            (ans: any) =>
                                                ans.trim().toLowerCase() ===
                                                answer.answers[0][currentIndex].trim().toLowerCase()
                                            ) ? (
                                            <FaCheck style={{ color: "green" }} />
                                        ) : (
                                            answer.answers[0][currentIndex] && (
                                            <FiXCircle style={{ color: "red" }} />
                                            )
                                        )}
                                        </Form.Group>

                                        {/* Show list of correct answers */}
                                        <div style={{ marginTop: "0.5rem", color: "#666", fontStyle: "italic" }}>
                                            <strong>Accepted answers:</strong>{" "}
                                            {currentQuestion.possibleAnswers.join(", ")}
                                        </div>
                                    </div>
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