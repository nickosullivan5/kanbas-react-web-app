import {Button, Container, ListGroup, Modal} from "react-bootstrap";
import {useParams} from "react-router";
import {CiSearch} from "react-icons/ci";
import FacultyOnlyRoute from "../../Account/FacultyOnlyRoute.tsx";
import StudentOnlyRoute from "../../Account/StudentOnlyRoute.tsx";
import {GoPlus} from "react-icons/go";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {BsGripVertical, BsPlus} from "react-icons/bs";
import {FaCaretDown, FaRegEdit} from "react-icons/fa";
import {IoEllipsisVertical} from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark.tsx";
import {useEffect, useState} from "react";
import {AiOutlineStop} from "react-icons/ai";
import {useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import * as userClient from "../../Account/client.ts"

export default function Quizzes() {
    const navigate = useNavigate();
    const {cid} = useParams();
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const [show, setShow] = useState(false);
    const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [answerMap, setAnswerMap] = useState<{ [quizId: string]: string }>({});

    const handleClose = () => {
        setShow(false);
        setSelectedQuizId(null);
    };

    const handleShow = (quizId: string) => {
        setSelectedQuizId(quizId);
        setShow(true);
    };

    const dialogTitle = "Quiz Options";

    const fetchQuizzes = async () => {
        const getQuizzes = await coursesClient.findQuizzesForCourse(cid as string);
        setQuizzes(getQuizzes);
    };

    const fetchAnswers = async () => {
        const map: { [quizId: string]: string } = {};
        for (const quiz of quizzes) {
            try {
                const answer = await userClient.findAnswerForUser(currentUser._id, quiz._id, cid as string);
                if (answer?._id) {
                    map[quiz._id] = answer._id;
                }
            } catch (e) {
                // no previous attempt
            }
        }
        setAnswerMap(map);
    };

    const createQuizForCourse = async () => {
        if (!cid) return;
        const newQuiz = {
            title: "New Quiz",
            course: cid,
            description: "New Quiz Description",
            quizType: "Graded Quiz",
            points: 0,
            _id: uuidv4(),
            assignmentGroup: "Quizzes",
            shuffleAnswers: true,
            timeLimit: 20,
            multipleAttempts: false,
            howManyAttempts: 0,
            showCorrectAnswers: "Immediately after each attempt",
            accessCode: "",
            oneQuestionAtATime: true,
            webcamRequired: false,
            lockQuestionsAfterAnswering: false,
            dueDate: "2025-01-01",
            availableDate: "2025-01-01",
            untilDate: "2025-01-01",
            published: false,
            questions: []
        };
        const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
        fetchQuizzes();
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`);
    };

    const removeQuiz = async () => {
        if (selectedQuizId) {
            await quizzesClient.deleteQuiz(selectedQuizId);
            fetchQuizzes();
        }
    };

    const publishQuiz = async () => {
        const selectedQuiz = quizzes.find(q => q._id === selectedQuizId);
        const updatedQuiz = { ...selectedQuiz, published: !selectedQuiz.published };
        await quizzesClient.updateQuiz(updatedQuiz);
        fetchQuizzes();
    };

    const getAvailabilityStatus = (quiz: any) => {
        const now = new Date();
        const available = new Date(quiz.availableDate);
        const until = new Date(quiz.untilDate);

        if (now < available) {
            return `Not available until ${available.toLocaleString("en-US", {
                month: "long", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true
            })}`;
        } else if (now >= available && now <= until) {
            return "Available";
        } else {
            return "Closed";
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    useEffect(() => {
        if (quizzes.length > 0) {
            fetchAnswers();
        }
    }, [quizzes]);

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div id="search-bar" className="rounded-1 border-gray border w-20 d-flex align-items-center">
                    <CiSearch className="text-muted fs-4 ps-1 pb-1 pe-1"/>
                    <input placeholder="Search..." className="border-0 flex-grow-1" style={{outline: 'none'}} />
                </div>
                <FacultyOnlyRoute>
                    <div className="d-flex">
                        <button className="rounded-0 border-0 bg-danger text-white" onClick={createQuizForCourse}>
                            <GoPlus/> Quiz
                        </button>
                    </div>
                </FacultyOnlyRoute>
            </div>

            <ListGroup id="wd-quizzes" className="rounded-0">
                <ListGroup.Item className="wd-quizzes p-0 bg-light border-gray d-flex align-items-center">
                    <div className="wd-title p-3 ps-2 flex-grow-1">
                        <BsGripVertical className="me-2 fs-5"/>
                        <FaCaretDown className="me-2 fs-5"/>
                        <b> QUIZZES</b>
                        <div className="float-end">
                            <div className="border border-gray rounded-pill border-1 d-inline-flex align-items-center p-2">
                                40% of Total
                            </div>
                            <BsPlus/>
                            <IoEllipsisVertical className="fs-5"/>
                        </div>
                    </div>
                </ListGroup.Item>
                {(currentUser.role === "FACULTY" ? quizzes : quizzes.filter((quiz: any) => quiz.published))
                    .map((quiz: any) => (
                        <ListGroup.Item key={quiz._id || quiz.title} className="wd-assignment-list-item p-3 ps-2 fs-6 d-flex align-items-center border-start border-gray gap-2">
                            <BsGripVertical className="fs-5"/>
                            <FacultyOnlyRoute>
                                <Link to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id || "placeholder-id"}`}>
                                    <FaRegEdit className="text-success fs-5"/>
                                </Link>
                            </FacultyOnlyRoute>
                            <div className="flex-grow-1">
                                <Link to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Session`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div><b>{quiz.title}</b></div>
                                </Link>
                                <small className="text-muted d-block mb-1">{getAvailabilityStatus(quiz)}</small>
                                <small className="text-muted">
                                    <b>Due:</b> {new Date(quiz.dueDate).toLocaleString("en-US", { month: "long", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true })} |
                                    <b> Points:</b> {quiz.points} |
                                    <b> Questions:</b> {quiz.questions?.length || "N/A"} |
                                    <StudentOnlyRoute>
                                    {answerMap[quiz._id] && (
                                        <Link to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/${answerMap[quiz._id]}`}>
                                            <i className="text-danger">View previous attempt</i>
                                        </Link>
                                    )}
                                    </StudentOnlyRoute>
                                    <StudentOnlyRoute>
                                        {quiz.score !== undefined && (
                                            <> | <b>Score:</b> {quiz.score}</>
                                        )}
                                    </StudentOnlyRoute>
                                </small>
                            </div>
                            <FacultyOnlyRoute>
                                {quiz.published ? (
                                    <GreenCheckmark/>
                                ) : (
                                    <AiOutlineStop className="text-danger fs-4"/>
                                )}
                            </FacultyOnlyRoute>
                            <FacultyOnlyRoute>
                                <IoEllipsisVertical className="fs-4 ms-2" style={{cursor: "pointer"}} onClick={() => handleShow(quiz._id || "placeholder-id")} />
                            </FacultyOnlyRoute>
                        </ListGroup.Item>
                    ))}
            </ListGroup>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{dialogTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Alter Quiz "<b>{quizzes.find(q => q._id === selectedQuizId)?.title}</b>"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="warning" onClick={() => {publishQuiz(); handleClose();}}>Publish/Unpublish</Button>
                    <Button variant="danger" onClick={() => { removeQuiz(); handleClose(); }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}