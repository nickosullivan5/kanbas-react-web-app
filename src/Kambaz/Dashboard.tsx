import {Card, Col, FormControl, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {MdEditNote} from "react-icons/md";
import FacultyOnlyRoute from "./Account/FacultyOnlyRoute";
import StudentOnlyRoute from "./Account/StudentOnlyRoute";
import {useEffect, useState} from "react";

import { useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import * as coursesClient from "./Courses/client.ts";
import * as userClient from "./Account/client.ts";
import * as courseClient from "./Courses/client";
import * as enrollmentsClient from "./Courses/enrollmentsclient.ts"
export default function Dashboard() {
    const [courses, setCourses] = useState<any[]>([]);
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    // const dispatch = useDispatch();
    const [showAllClasses, setShowAllClasses] = useState(false);

    const [course, setCourse] = useState<any>({
        _id: "1234",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        description: "New Description",
    });

    const deleteCourse = async (courseId: string) => {
        try {
            await courseClient.deleteCourse(courseId);
            setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
            setEnrollments((prevEnrollments) => prevEnrollments.filter((enrollment) => enrollment._id !== courseId));
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    const updateCourse = async () => {
        await courseClient.updateCourse(course);
        setCourses((prevCourses) =>
            prevCourses.map((c) => (c._id === course._id ? course : c))
        );
    };

    const addNewCourse = async () => {
        const newCourse = { ...course, _id: uuidv4() };
        await userClient.createCourse(newCourse);
        setCourses((prevCourses) => [...prevCourses, newCourse]);
        setEnrollments((prevEnrollments) => [...prevEnrollments, newCourse])

    };


    const fetchCourses = async () => {
        try {
            const fetchedCourses = await coursesClient.fetchAllCourses();
            setCourses(fetchedCourses);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchEnrolledCourses = async () => {
        try {
            const enrolledCourses = await userClient.findMyCourses();
            setEnrollments(enrolledCourses);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteEnrollment = async (cid: string) => {
        await enrollmentsClient.deleteEnrollment(cid)
        await fetchEnrolledCourses()
    };
     const createEnrollment = async (cid: string) => {
        await enrollmentsClient.createEnrollment(cid)
        await fetchEnrolledCourses()
    };

    useEffect(() => {
        fetchCourses();
        fetchEnrolledCourses();
    }, [currentUser]);

    return (
        <div id="wd-dashboard" className="pt-2 ps-5 fs-6">
            <h1 id="wd-dashboard-title">
                <b>Dashboard</b>
            </h1>

            <StudentOnlyRoute>
                <h5>
                    <button
                        className="btn btn-primary float-end me-2"
                        onClick={() => setShowAllClasses(!showAllClasses)}
                        id="wd-enrollments-click"
                    >
                        {showAllClasses ? "Show Enrollments" : "Show All Classes"}
                    </button>
                </h5>
            </StudentOnlyRoute>

            <FacultyOnlyRoute>
                <h5>
                    New Course
                    <button
                        className="btn btn-warning float-end me-2"
                        onClick={updateCourse}
                        id="wd-update-course-click"
                    >
                        Update
                    </button>

                    <button
                        className="btn btn-light btn-outline-dark float-end"
                        id="wd-add-new-course-click"
                        onClick={addNewCourse}
                    >
                        Add
                    </button>
                </h5>
                <br/>
                <FormControl
                    value={course.name}
                    className="mb-2"
                    onChange={(e) => setCourse({...course, name: e.target.value})}
                />
                <FormControl
                    value={course.description}
                    onChange={(e) => setCourse({...course, description: e.target.value})}
                />
            </FacultyOnlyRoute>

            <hr/>
            <h4 id="wd-dashboard-published">
                {showAllClasses ? "All Courses" : "Enrolled Courses"} ({showAllClasses ? courses.length : enrollments.length})
            </h4>
            <hr/>

            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {(showAllClasses ? courses : enrollments).map((course: any) => (
                        <Col key={course._id} className="wd-dashboard-course" style={{width: "300px"}}>
                            <Card>
                                <Link
                                    to={`/Kambaz/Courses/${course._id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark"
                                >
                                    <Card.Img src="/images/NEU.png" variant="top" width="100%" height={160}/>
                                </Link>

                                <Card.Body className="card-body">
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        {course.name}
                                    </Card.Title>
                                    <Card.Text
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{height: "100px"}}
                                    >
                                        {course.description}
                                    </Card.Text>
                                    <MdEditNote
                                        color="gray"
                                        size={25}
                                        style={{border: "2px solid gray", borderRadius: "4px"}}
                                    />

                                    <FacultyOnlyRoute>
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault();
                                                deleteCourse(course._id);
                                            }}
                                            className="btn btn-danger fs-6 float-end"
                                            id="wd-delete-course-click"
                                        >
                                            Delete
                                        </button>
                                    </FacultyOnlyRoute>

                                    <FacultyOnlyRoute>
                                        <button
                                            id="wd-edit-course-click"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setCourse(course);
                                            }}
                                            className="btn btn-warning me-2 float-end"
                                        >
                                            Edit
                                        </button>
                                    </FacultyOnlyRoute>

                                    <StudentOnlyRoute>
                                        {(() => {
                                            const isEnrolled = enrollments.some(
                                                (enrollment) => enrollment._id === course._id
                                            );
                                            return (
                                                <button
                                                    id={
                                                        isEnrolled
                                                            ? "wd-unenroll-course-click"
                                                            : "wd-enroll-course-click"
                                                    }
                                                    onClick={() => {
                                                        if (isEnrolled) {

                                                            deleteEnrollment(course._id);
                                                        } else {
                                                            createEnrollment(course._id)
                                                        }
                                                    }}
                                                    className={`btn ${
                                                        isEnrolled ? "btn-danger" : "btn-success"
                                                    } me-2 float-end`}
                                                >
                                                    {isEnrolled ? "Unenroll" : "Enroll"}
                                                </button>
                                            );
                                        })()}
                                    </StudentOnlyRoute>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}
