import CourseNavigation from "./Navigation.tsx";
import {Navigate, Route, Routes, useLocation, useParams} from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor.tsx";
import {FaAlignJustify} from "react-icons/fa";
import PeopleTable from "./People/Table.tsx";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import * as coursesClient from "./client.ts"
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails.tsx";
import QuizEditor from "./Quizzes/QuizEditor.tsx";
import QuizSession from "./Quizzes/QuizSession.tsx";
    import QuizResult from "./Quizzes/QuizResult.tsx";

export default function Courses() {
    const {pathname} = useLocation();
    const {courses} = useSelector((state: any) => state.coursesReducer);
    const [users, setUsers] = useState<any[]>([]);

    const {cid} = useParams();
    const fetchUsers = async () => {
        if (!cid) return; // Or show an error message
        const users = await coursesClient.findUsersForCourse(cid);
        console.log("users for people table: ", users)
        setUsers(users);
    };
    const course = courses.find((course: { _id: string | undefined; }) => course._id === cid);
    useEffect(() => {
        fetchUsers();
    }, [cid]);
    return (
        <div id="wd-courses" className="ps-4e">
            <h5 className="text-danger ps-3">
                <FaAlignJustify className="me-4 fs-4 mb-1"/>
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h5>
            <hr/>
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation/>
                </div>


                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home"/>}/>
                        <Route path="Home" element={<Home/>}/>
                        <Route path="Modules" element={<Modules/>}/>
                        <Route path="Assignments" element={<Assignments/>}/>
                        <Route path="Assignments/:aid" element={<AssignmentEditor/>}/>
                        <Route path="People" element={<PeopleTable users={users}/>}/>
                        <Route path="Piazza" element={<h2>Piazza</h2>}/>
                        <Route path="Zoom" element={<h2>Zoom</h2>}/>
                        <Route path="Quizzes" element={<Quizzes/>}/>
                        <Route path="Quizzes/:qid" element={<QuizDetails/>}/>
                        <Route path="Quizzes/:qid/Editor" element={<QuizEditor/>}/>
                        <Route path="Quizzes/:qid/Session" element={<QuizSession/>}/>
                        <Route path="Quizzes/:qid/:aid" element={<QuizResult/>}/>
                        <Route path="Grades" element={<h2>Grades</h2>}/>

                    </Routes>
                </div>
            </div>
        </div>
    );
}
