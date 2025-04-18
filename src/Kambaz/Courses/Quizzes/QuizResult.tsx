import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as coursesClient from "../client.ts";
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
import { FaExclamation } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function QuizSession() {
  const { cid, qid } = useParams();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const quiz = quizzes.find((q: any) => q._id === qid);

  useEffect(() => {
    if (quiz) {
      setQuestions(quiz.questions || []);
    }
  }, [quiz]);

  const handleSelectAnswer = (index: number, value: any) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // await coursesClient.submitQuizAnswers(cid, qid, answers);
      setSubmitted(true);
      alert("Answers submitted successfully!");
    } catch (err) {
      setError("Failed to submit answers. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5" style={{ color: "#555" }}>
        <Spinner animation="border" role="status" style={{ color: "#777" }}>
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

  if (submitted) {
    return (
      <Container className="my-5 text-center" style={{ color: "#555" }}>
        <Alert variant="light">
          <h4><b>Quiz Submitted Successfully!</b></h4>
          <p>Your answers have been recorded.</p>
        </Alert>
        <Button
          variant="light"
          onClick={() => setSubmitted(false)}
          style={{ borderRadius: "0" }}
        >
          Review Answers
        </Button>
      </Container>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <Container className="my-4" style={{ maxWidth: "800px", color: "#333" }}>
      <Card className="mb-4" style={{ border: "1px solid #ddd", borderRadius: "0", boxShadow: "none" }}>
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
            <AiOutlineExclamationCircle ></AiOutlineExclamationCircle > This is a preview of the published version of the quiz
          </Card.Header>
        </FacultyOnlyRoute>

        <Card.Body style={{ padding: "1.5rem" }} className="pt-5">
          {/* Current Question */}
          {currentQuestion && (
            <Card className="mb-4" style={{ border: "1px solid #ddd", borderRadius: "0px" }}>
              <Card.Header style={{ backgroundColor: "#dfdfdf", borderBottom: "1px solid #ddd" }}>
                <h5 style={{ margin: "0" }}>
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
                <Card.Text className="mb-4" style={{ fontSize: "1rem" }}>
                  {currentQuestion.questionText}
                </Card.Text>

                {/* Multiple Choice */}
                {currentQuestion.type === "multiple_choice" && (
                  <Form>
                    <ListGroup variant="flush" style={{ borderRadius: "0" }}>
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
                            checked={answers[currentIndex] === idx}
                            onChange={() => handleSelectAnswer(currentIndex, idx)}
                            style={{ color: "#373737" }}
                          />
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Form>
                )}

                {/* True/False */}
                {currentQuestion.type === "true_false" && (
                  <Form>
                    <ListGroup variant="flush" style={{ borderRadius: "0" }}>
                      {["True", "False"].map((val, idx) => (
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
                            label={val}
                            checked={answers[currentIndex] === (val === "True")}
                            onChange={() =>
                              handleSelectAnswer(currentIndex, val === "True")
                            }
                            style={{ color: "#333" }}
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
                      value={answers[currentIndex] || ""}
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
                disabled={Object.keys(answers).length !== questions.length}
                style={{ borderRadius: "0" }}
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