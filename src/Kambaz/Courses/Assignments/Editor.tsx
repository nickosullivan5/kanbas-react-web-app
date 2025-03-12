import {Container, Form, Row, Col, Button} from "react-bootstrap";
import {Link, useParams} from "react-router";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addAssignment, updateAssignment} from "./reducer";

export default function AssignmentEditor() {
    const {cid, aid} = useParams();
    const {assignments} = useSelector((state: any) => state.assignmentsReducer);
    const assignmentExists = assignments.find((a: { _id: string | undefined; }) => a._id === aid);
    console.log("CID:", cid);

    const [courseID] = useState(cid);
    const [title, setTitle] = useState(assignmentExists?.title || "A1");
    const [description, setDescription] = useState(assignmentExists?.description || "The assignment is available online. Submit a link to the landing page of Netlify");
    const [totalPoints, setTotalPoints] = useState(assignmentExists?.total_points || "100");
    const [assignmentGroup, setAssignmentGroup] = useState(assignmentExists?.assignment_group || "ASSIGNMENTS");
    const [submissionType, setSubmissionType] = useState(assignmentExists?.submission_type || "Online");
    const [assignTo, setAssignTo] = useState(assignmentExists?.assign_to || "Everyone");
    const [dueDate, setDueDate] = useState(assignmentExists?.due_date || "2000-00-00");
    const [dueTime] = useState(assignmentExists?.due_time || "00:00");
    const [numModules] = useState(assignmentExists?.num_modules || "1");
    const [onlineEntryOption, setOnlineEntryOption] = useState(assignmentExists?.online_entry_option || ["Text Entry"]);
    const [releaseDate, setReleaseDate] = useState(assignmentExists?.release_date || "2000-00-00");
    const dispatch = useDispatch();

    return (
        <Container id="wd-assignments-editor" className="ps-5 pe-5">
            <Form.Group className="mb-3">
                <Form.Label htmlFor="title">Assignment Name</Form.Label>
                <Form.Control id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control as="textarea" id="description" style={{height: "250px"}} value={description}
                              onChange={(e) => setDescription(e.target.value)}/>
            </Form.Group>

            <Row className="mb-3">
                <Col md={3}><Form.Label htmlFor="total_points">Points</Form.Label></Col>
                <Col md={9}><Form.Control id="total_points" type="number" value={totalPoints}
                                          onChange={(e) => setTotalPoints(e.target.value)}/></Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}><Form.Label htmlFor="assignment_group">Assignment Group</Form.Label></Col>
                <Col md={9}>
                    <Form.Select id="assignment_group" value={assignmentGroup}
                                 onChange={(e) => setAssignmentGroup(e.target.value)}>
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="PROJECTS">PROJECTS</option>
                        <option value="QUIZZES">QUIZZES</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}><Form.Label htmlFor="submission_type">Submission Type</Form.Label></Col>
                <Col md={9}>
                    <Form.Select id="submission_type" value={submissionType}
                                 onChange={(e) => setSubmissionType(e.target.value)}>
                        <option value="Online">Online</option>
                        <option value="Physical">Physical</option>
                    </Form.Select>
                    <Form.Label className="mt-2 fw-bold pb-1">Online Entry Options</Form.Label>
                    {["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"].map((option) => (
                        <Form.Check
                            key={option}
                            className="pb-2"
                            type="checkbox"
                            id={`wd-${option.toLowerCase().replace(/\s/g, "-")}`}
                            label={option}
                            checked={onlineEntryOption.includes(option)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setOnlineEntryOption([...onlineEntryOption, option]);
                                } else {
                                    setOnlineEntryOption(onlineEntryOption.filter((item: string) => item !== option));
                                }
                            }}
                        />
                    ))}

                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}><Form.Label htmlFor="assign_to">Assign To</Form.Label></Col>
                <Col md={9}><Form.Control id="assign_to" type="text" value={assignTo}
                                          onChange={(e) => setAssignTo(e.target.value)}/></Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}><Form.Label htmlFor="due_date">Due Date</Form.Label></Col>
                <Col md={9}><Form.Control id="due_date" type="date" value={dueDate}
                                          onChange={(e) => setDueDate(e.target.value)}/></Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}><Form.Label htmlFor="release_date">Available From</Form.Label></Col>
                <Col md={9}><Form.Control id="release_date" type="date" value={releaseDate}
                                          onChange={(e) => setReleaseDate(e.target.value)}/></Col>
            </Row>

            <div className="d-flex justify-content-end mt-3">
                <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                    <Button variant="light" className="me-2 border">Cancel</Button>
                </Link>
                <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                    <Button
                        onClick={() => {
                            const updatedAssignment = {
                                _id: aid,
                                course: courseID,
                                title: title,
                                description,
                                total_points: totalPoints,
                                assignment_group: assignmentGroup,
                                submission_type: submissionType,
                                assign_to: assignTo,
                                due_date: dueDate,
                                due_time: dueTime,
                                num_modules: numModules,
                                online_entry_option: onlineEntryOption,
                                release_date: releaseDate,
                            };
                            if (assignmentExists) {
                                dispatch(updateAssignment(updatedAssignment));
                            } else {
                                dispatch(addAssignment(updatedAssignment));
                            }
                        }}
                        variant="danger"
                    >
                        Save
                    </Button>
                </Link>
            </div>
        </Container>
    );
}
