import { Container, Form, Row, Col, Button } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
        <Container id="wd-assignments-editor" className="ps-5 pe-5">
            {/* Assignment Name */}
            <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
                <Form.Control id="wd-name" type="text" defaultValue="A1 " />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-description">Description</Form.Label>
                <Form.Control as="textarea" id="wd-description" style={{ height: "250px" }} defaultValue="The assignment is available online. Submit a link to the landing page of Netlify" />
            </Form.Group>

            <Row className="mb-3">
                <Col md={3}>
                    <Form.Label htmlFor="wd-points">Points</Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Control id="wd-points" type="number" defaultValue={100} />
                </Col>
            </Row>

            {/* Assignment Group */}
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

            {/* Display Grade As */}
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

            {/* Submission Type */}
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
                        <Form.Control id="wd-due-date" type="date" defaultValue="2024-05-21" />
                    </Form.Group>

                    <Row className="mt-2">
                        <Col>
                            <Form.Group>
                                <Form.Label className="fw-bold" htmlFor="wd-available-from">Available From</Form.Label>
                                <Form.Control id="wd-available-from" type="date" defaultValue="2024-05-14" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className="fw-bold" htmlFor="wd-available-until">Until</Form.Label>
                                <Form.Control id="wd-available-until" type="date" defaultValue="2024-05-21" />
                            </Form.Group>
                        </Col>
                    </Row>
                    </div>
                </Col>
            </Row>

            {/* Buttons */}
            <div className="d-flex justify-content-end mt-3">
                <Button variant="light" className="me-2 border">Cancel</Button>
                <Button variant="danger">Save</Button>
            </div>
        </Container>
    );
}
