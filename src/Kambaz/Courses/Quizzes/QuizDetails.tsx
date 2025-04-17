import {Container} from "react-bootstrap";
import {useParams} from "react-router";
import {useState, useEffect} from "react";
import * as coursesClient from "../client.ts";
import {Link} from "react-router-dom";
import {FaPencilAlt} from "react-icons/fa";

export default function QuizDetails() {
    const {cid, qid} = useParams();
    console.log("CID:", cid);
    console.log("qid:", qid);
    
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const fetchQuizzes = async () => {
        const getQuizzes = await coursesClient.findQuizzesForCourse(cid as string);
        setQuizzes(getQuizzes);
        console.log("Quizzes from server:", quizzes);
    };
    useEffect(() => {
        fetchQuizzes();
    }, []);
    const quizExists = quizzes.find((a: { _id: string }) => a._id === qid);

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
                <h1 className="mt-2 text-center">{quizExists.title}</h1>
                <div className="mt-3 text-center">
                    <p><b>Quiz Type</b>: {quizExists.quizType}</p>
                    <p><b>Description</b>: {quizExists.description}</p>
                    <p><b>Points</b>: {quizExists.points}</p>
                    <p><b>Assignment Group</b>: {quizExists.assignmentGroup}</p>
                    <p><b>Shuffle Answers</b>: {quizExists.shuffleAnswers}</p>
                    <p><b>Time Limit</b>: {quizExists.timeLimit} minutes</p>
                    <p><b>Multiple Attempts</b>: {quizExists.multipleAttempts ? "Yes" : "No"}</p>
                    <p><b>Max Attempts</b>: {quizExists.howManyAttempts}</p>
                    <p><b>Show Correct Answers</b>: {quizExists.showCorrectAnswers}</p>
                    <p><b>Access Code</b>: {quizExists.accessCode || "None"}</p>
                    <p><b>One Question At A Time</b>: {quizExists.oneQuestionAtATime ? "Yes" : "No"}</p>
                    <p><b>Webcam Required</b>: {quizExists.webcamRequired ? "Yes" : "No"}</p>
                    <p><b>Lock Questions After Answering</b>: {quizExists.lockQuestionsAfterAnswering ? "Yes" : "No"}</p>
                    <p><b>Published</b>: {quizExists.published ? "Yes" : "No"}</p>
                </div>

                <hr className="w-100"/>

                <div className="d-flex justify-content-around w-100 mb-2">
                    <div><b>Due</b>: {quizExists.dueDate}</div>
                    <div><b>Assigned To</b>: Everyone</div>
                    <div><b>Available From</b>: {quizExists.availableDate}</div>
                    <div><b>Until</b>: {quizExists.untilDate}</div>
                </div>
            </div>
        </Container>
    );
}

