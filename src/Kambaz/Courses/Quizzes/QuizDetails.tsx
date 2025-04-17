import {Container} from "react-bootstrap";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import * as coursesClient from "../client.ts";
import {Link} from "react-router-dom";
import {FaPencilAlt} from "react-icons/fa";

import dummyquizzes from "./dummy.json";

export default function QuizDetails() {
    const {cid, qid} = useParams();
    console.log("CID:", cid);
    console.log("qid:", qid);
    const [quizzes, setQuizzes] = useState(dummyquizzes)
    const quizExists = quizzes.find((a: { _id: string | undefined; }) => a._id === qid);
    const [courseID] = useState(cid);
    const [title, setTitle] = useState(quizExists?.title || "Quiz _");
    const [description, setDescription] = useState(quizExists?.description || "The QUIZ is available online.");
    const [quizType, setQuizType] = useState(quizExists?.quizType || "Graded Quiz");
    const [points, setPoints] = useState(quizExists?.points || 0);
    const [assignmentGroup, setAssignmentGroup] = useState(quizExists?.assignmentGroup || "Quizzes ");
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


    // const fetchQuizzes = async () => {
    //     // const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    //     setQuizzes(quizzes);
    //     console.log("Quizzes from server:", quizzes);
    //
    // };
    // const createQuizForCourse = async () => {
    //     if (!cid) return;
    //     if (!qid) return;
    //     const newQuiz = {
    //         title: title,
    //         course: cid,
    //         description: description,
    //         quizType: quizType,
    //         points: assignmentGroup,
    //         _id: qid,
    //         assignmentGroup: assignmentGroup,
    //         shuffleAnswers: shuffleAnswers,
    //         timeLimit: dueDate,
    //         multipleAttempts: multipleAttempts,
    //         howManyAttempts: howManyAttempts,
    //         showCorrectAnswers: showCorrectAnswers,
    //         accessCode: accessCode,
    //         oneQuestionAtATime: oneQuestionAtATime,
    //         webcamRequired: webcamRequired,
    //         lockQuestionsAfterAnswering: lockQuestionsAfterAnswering,
    //         dueDate: dueDate,
    //         availableDate: availableDate,
    //         untilDate: untilDate,
    //         published: published
    //     };
    // const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
    // console.log("added quiz: ", quiz)
    //     fetchQuizzes();
    // };

    // const saveQuiz = async (quiz: any) => {
    // const updatedQuiz = await quizzesClient.updateQuiz(quiz);
    //     console.log("updated assignment: ", updatedQuiz)
    //     fetchQuizzes();
    // };
    return (
        <Container className="d-flex flex-column align-items-center">
            {/* Buttons */}
            <div className="d-flex justify-content-center gap-3 mt-4 mb-3">
                <Link
                    to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Preview`}
                    className="btn btn-light btn-outline-dark rounded-0"
                >
                    Preview
                </Link>
                <Link
                    to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Editor`}
                    className="btn btn-light d-flex align-items-center gap-2 btn-outline-dark rounded-0"
                >
                    <FaPencilAlt/>
                    Edit
                </Link>
            </div>

            <div className="border  rounded-1 p-4 w-100" style={{
                border: "2px dotted #ccc"
                , backgroundColor: "rgba(224,224,224,0.06)", maxWidth: "800px"
            }}>
                <h1 className="mt-2 text-center">{title}</h1>
                <div className="mt-3 text-center">
                    <p><b>Quiz Type</b>: {quizType}</p>
                    <p><b>Description</b>: {description}</p>
                    <p><b>Points</b>: {points}</p>
                    <p><b>Assignment Group</b>: {assignmentGroup}</p>
                    <p><b>Shuffle Answers</b>: {shuffleAnswers}</p>
                    <p><b>Time Limit</b>: {timeLimit} minutes</p>
                    <p><b>Multiple Attempts</b>: {multipleAttempts ? "Yes" : "No"}</p>
                    <p><b>Max Attempts</b>: {howManyAttempts}</p>
                    <p><b>Show Correct Answers</b>: {showCorrectAnswers}</p>
                    <p><b>Access Code</b>: {accessCode || "None"}</p>
                    <p><b>One Question At A Time</b>: {oneQuestionAtATime ? "Yes" : "No"}</p>
                    <p><b>Webcam Required</b>: {webcamRequired ? "Yes" : "No"}</p>
                    <p><b>Lock Questions After Answering</b>: {lockQuestionsAfterAnswering ? "Yes" : "No"}</p>
                    <p><b>Published</b>: {published ? "Yes" : "No"}</p>
                </div>

                <hr className="w-100"/>

                <div className="d-flex justify-content-around w-100 mb-2">
                    <div><b>Due</b>: {dueDate}</div>
                    <div><b>Assigned To</b>: Everyone</div>
                    <div><b>Available From</b>: {availableDate}</div>
                    <div><b>Until</b>: {untilDate}</div>
                </div>
            </div>
        </Container>
    );
}

