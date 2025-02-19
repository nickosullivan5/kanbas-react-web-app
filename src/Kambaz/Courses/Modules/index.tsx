import ModulesControls from "./ModuleControls.tsx";
import { Container, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons.tsx";
import LessonControlButtons from "./LessonControlButtons.tsx";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Modules() {
    const { cid } = useParams();
    const modules = db.modules;

    return (
        <>
            <Container className="position-relative"> {/* Position context for absolute elements */}
                {/* Make the module controls stack over the list */}
                <div className="pt-3 position-sticky top-0 bg-white z-3">
                    <ModulesControls />
                </div>

                <div className="z-2 mt-5"> {/* Added margin-top to separate the list from the controls */}
                    <ListGroup id="wd-modules" className="rounded-0">
                        {modules
                            .filter((module: any) => module.course === cid)
                            .map((module: any) => (
                                <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                                    <div className="wd-title p-3 ps-2 bg-light">
                                        <BsGripVertical className="me-2 fs-5"/> {module.name} <ModuleControlButtons />
                                    </div>
                                    {module.lessons && (
                                        <ListGroup className="wd-lessons rounded-0">
                                            {module.lessons.map((lesson: any) => (
                                                <ListGroup.Item key={lesson._id} className="wd-lesson p-3 ps-1">
                                                    <BsGripVertical className="me-2 fs-4"/> {lesson.name}
                                                    <LessonControlButtons />
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </div>
            </Container>
            <br /><br /><br />
        </>
    );
}
