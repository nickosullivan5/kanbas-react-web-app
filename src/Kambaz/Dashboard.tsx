import {Card, Col, FormControl, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {MdEditNote} from "react-icons/md";
import * as db from "./Database";
import FacultyOnlyRoute from "./Account/FacultyOnlyRoute";
import {useState} from "react";
import {addCourse, deleteCourse, updateCourse} from "./Courses/reducer.ts";
import {useDispatch, useSelector} from "react-redux";

export default function Dashboard() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const {enrollments} = db;
    const {courses} = useSelector((state: any) => state.coursesReducer);
    console.log("courses from Redux:", courses);
    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    const dispatch = useDispatch();

    return (
        <div id="wd-dashboard" className="pt-2 ps-5 fs-6">
            <h1 id="wd-dashboard-title">
                <b>Dashboard</b>
            </h1>
            <FacultyOnlyRoute>
                <h5>
                    New Course
                    <button
                        className="btn btn-warning float-end me-2"
                        onClick={() => dispatch(updateCourse(course))}

                        id="wd-update-course-click"
                    >
                        Update
                    </button>

                    <button
                        className="btn btn-light btn-outline-dark float-end"
                        id="wd-add-new-course-click"
                        onClick={() => dispatch(addCourse(course))}

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
                Published Courses ({courses.length})
            </h4>
            <hr/>
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.filter((course) =>
                        enrollments.some(
                            (enrollment) =>
                                enrollment.user === currentUser._id &&
                                enrollment.course === course._id
                        ))
                        .map((course) => (
                            <Col key={course._id} className="wd-dashboard-course" style={{width: "300px"}}>
                                <Card>
                                    <Link
                                        to={`/Kambaz/Courses/${course._id}/Home`}
                                        className="wd-dashboard-course-link text-decoration-none text-dark"
                                    >
                                        <Card.Img src="/images/NEU.png" variant="top" width="100%" height={160}/>
                                        <Card.Body className="card-body">
                                            <Card.Title
                                                className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                                {course.name}
                                            </Card.Title>
                                            <Card.Text className="wd-dashboard-course-description overflow-hidden"
                                                       style={{height: "100px"}}>
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
                                                        dispatch(deleteCourse(course._id));
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
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>
        </div>
    );
}
