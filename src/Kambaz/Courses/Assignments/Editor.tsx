import { Container, Form, Row, Col, Button } from "react-bootstrap";
import {Link, useParams} from "react-router";
import * as db from "../../Database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    console.log(aid)
    const assignments = db.assignments;
    const assignment = assignments.find(a => a._id === aid) ??
        { title: "A1",
            release_date: "2000-00-00",
            due_date: "2000-00-00",
            due_time: "00:00",
            total_points: "100",
            description:"The assignment is available online. Submit a link to the landing page of Netlify",
            assignment_group: "ASSIGNMENTS",
            submission_type: "online",
            online_entry_option: ["Website URL"],
            assign_to: "Everyone"};
    console.log(assignment)
    return (
        <Container id="wd-assignments-editor" className="ps-5 pe-5">
            <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
                <Form.Control id="wd-name" type="text" defaultValue={assignment.title}
 />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-description">Description</Form.Label>
                <Form.Control as="textarea" id="wd-description" style={{ height: "250px" }} defaultValue={assignment.description} />
            </Form.Group>

            <Row className="mb-3">
                <Col md={3}>
                    <Form.Label htmlFor="wd-points">Points</Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Control id="wd-points" type="number" defaultValue={assignment.total_points} />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}>
                    <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Select id="wd-group">
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="PROJECTS">PROJECTS</option>
                        <option value="QUIZZES">QUIZZES</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}>
                    <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Select id="wd-display-grade-as">
                        <option value="Percentage">Percentage</option>
                        <option value="Letter">Letter</option>
                        <option value="GPA">GPA</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}>
                    <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
                </Col>
                <Col md={9}>
                    <div className="p-3 border border-secondary-subtle rounded">
                        <Form.Select id="wd-submission-type">
                            <option value="Online">Online</option>
                            <option value="Physical">Physical</option>
                        </Form.Select>

                        <Form.Label className="mt-2 fw-bold pb-1">Online Entry Options</Form.Label>
                        <Form.Check className="pb-2" type="checkbox" id="wd-text-entry" label="Text Entry" />
                        <Form.Check className="pb-2" type="checkbox" id="wd-website-url" label="Website URL" />
                        <Form.Check className="pb-21" type="checkbox" id="wd-media-recordings" label="Media Recordings" />
                        <Form.Check className="pb-2" type="checkbox" id="wd-student-annotation" label="Student Annotation" />
                        <Form.Check className="pb-2" type="checkbox" id="wd-file-upload" label="File Uploads" />
                    </div>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}>
                    <Form.Label>Assign</Form.Label>
                </Col>
                <Col md={9}>
                    <div className="p-3 border border-secondary-subtle rounded">
                    <Form.Group>
                        <Form.Label className="fw-bold" htmlFor="wd-assign-to">Assign To</Form.Label>
                        <Form.Control id="wd-assign-to" type="text" defaultValue="Everyone" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="fw-bold" htmlFor="wd-due-date">Due Date</Form.Label>
                        <Form.Control id="wd-due-date" type="date" defaultValue={assignment.due_date} />
                    </Form.Group>

                    <Row className="mt-2">
                        <Col>
                            <Form.Group>
                                <Form.Label className="fw-bold" htmlFor="wd-available-from">Available From</Form.Label>
                                <Form.Control id="wd-available-from" type="date" defaultValue={assignment.release_date} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className="fw-bold" htmlFor="wd-available-until">Until</Form.Label>
                                <Form.Control id="wd-available-until" type="date" defaultValue={assignment.due_date} />
                            </Form.Group>
                        </Col>
                    </Row>

                    </div>
                </Col>
            </Row>

            <div className="d-flex justify-content-end mt-3">
                <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                    <Button variant="light" className="me-2 border">Cancel</Button>
                </Link>
                <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                    <Button variant="danger">Save</Button>
                </Link>
            </div>
        </Container>
    );
}
