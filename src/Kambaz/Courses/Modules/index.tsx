import ModulesControls from "./ModuleControls.tsx";
import { ListGroup } from "react-bootstrap";
import {BsGripVertical} from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons.tsx";
import LessonControlButtons from "./LessonControlButtons.tsx";

export default function Modules() {
    return (
        <div>
            <div>
                <ModulesControls />
                <br /><br /><br /><br />
                <ListGroup className="rounded-0" id="wd-modules">
                    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3"/>Week 1 <ModuleControlButtons/>
   </div>
                            <ListGroup className="wd-lessons rounded-0">
                                <ListGroup.Item className="wd-lesson p-3 ps-1">
                                     <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />

                                </ListGroup.Item>
                                <ListGroup.Item className="wd-lesson p-3 ps-1">
                                     <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />

                                </ListGroup.Item>
                                <ListGroup.Item className="wd-lesson p-3 ps-1">
                                     <BsGripVertical className="me-2 fs-3" /> Learn what is web development <LessonControlButtons />

                                </ListGroup.Item>
                            </ListGroup>
                    </ListGroup.Item>

                    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3"/>Week 2 <ModuleControlButtons/></div>
                        <ListGroup className="wd-lessons rounded-0">
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                                <BsGripVertical className="me-2 fs-3" /> LESSON 1 <LessonControlButtons />
                            </ListGroup.Item>
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                                <BsGripVertical className="me-2 fs-3" /> LESSON 2<LessonControlButtons />
                            </ListGroup.Item>
                        </ListGroup>
                    </ListGroup.Item>

                    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3"/>Week 3 <ModuleControlButtons/></div>
                        <ListGroup className="wd-lessons rounded-0">
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                               <BsGripVertical className="me-2 fs-3" /> CSS selectors and properties<LessonControlButtons />
                            </ListGroup.Item>
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                               <BsGripVertical className="me-2 fs-3" />  Box model and layout techniques<LessonControlButtons />
                            </ListGroup.Item>
                        </ListGroup>
                    </ListGroup.Item>
                    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3"/>Week 4<ModuleControlButtons/></div>
                        <ListGroup className="wd-lessons rounded-0">
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                               <BsGripVertical className="me-2 fs-3" /> JavaScript<LessonControlButtons />
                            </ListGroup.Item>
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                              <BsGripVertical className="me-2 fs-3" />  Variables and data types<LessonControlButtons />
                            </ListGroup.Item>
                        </ListGroup>
                    </ListGroup.Item>

                    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3"/>Week 5 <ModuleControlButtons/></div>
                        <ListGroup className="wd-lessons rounded-0">
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                             <BsGripVertical className="me-2 fs-3" />   API's<LessonControlButtons />
                            </ListGroup.Item>
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                             <BsGripVertical className="me-2 fs-3" />   Handling JSON<LessonControlButtons />
                            </ListGroup.Item>
                        </ListGroup>
                    </ListGroup.Item>
                    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3"/>Week 6 <ModuleControlButtons/></div>
                        <ListGroup className="wd-lessons rounded-0">
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />    JSX<LessonControlButtons />
                            </ListGroup.Item>
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                           <BsGripVertical className="me-2 fs-3" />     Components<LessonControlButtons />
                            </ListGroup.Item>
                        </ListGroup>
                    </ListGroup.Item>
                    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3"/>Week 8<ModuleControlButtons/></div>
                        <ListGroup className="wd-lessons rounded-0">
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                           <BsGripVertical className="me-2 fs-3" />     Router<LessonControlButtons />
                            </ListGroup.Item>
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />    Redux<LessonControlButtons />
                            </ListGroup.Item>
                        </ListGroup>
                    </ListGroup.Item>
                </ListGroup>
            </div>

        </div>
)
    ;
}
