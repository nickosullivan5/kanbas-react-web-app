import ModulesControls from "./ModuleControls.tsx";
import {Container, FormControl, ListGroup} from "react-bootstrap";
import {BsGripVertical} from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons.tsx";
import LessonControlButtons from "./LessonControlButtons.tsx";
import {useParams} from "react-router";

import {useSelector, useDispatch} from "react-redux";
import FacultyOnlyRoute from "../../Account/FacultyOnlyRoute.tsx";
import {setModules, addModule, editModule, updateModule, deleteModule} from "./reducer";
import {useState, useEffect} from "react";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
    const {cid} = useParams();
    const [moduleName, setModuleName] = useState("");
    const {modules} = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();
    const fetchModules = async () => {
        const modules = await coursesClient.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
    };
    const createModuleForCourse = async () => {
        if (!cid) return;
        const newModule = {name: moduleName, course: cid};
        const module = await coursesClient.createModuleForCourse(cid, newModule);
        dispatch(addModule(module));
    };
    const removeModule = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    };
    const saveModule = async (module: any) => {
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
    };


    useEffect(() => {
        fetchModules();
    }, []);


    return (

        <Container className="position-relative">
            <FacultyOnlyRoute>

                <div className="pt-3 position-sticky top-0 bg-white z-3">
                    <ModulesControls setModuleName={setModuleName} moduleName={moduleName}
                                     addModule={createModuleForCourse}/>

                </div>
            </FacultyOnlyRoute>


            <div className="z-2 mt-5"> {/* Added margin-top to separate the list from the controls */}
                <ListGroup id="wd-modules" className="rounded-0">
                    {modules

                        .map((module: any) => (
                            <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                                <div className="wd-title p-3 ps-2 bg-light">
                                    <BsGripVertical className="me-2 fs-5"/> {!module.editing && module.name}
                                    {module.editing && (
                                        <FormControl className="w-50 d-inline-block"
                                                     onChange={(e) =>
                                                         dispatch(
                                                             updateModule({...module, name: e.target.value})
                                                         )
                                                     }
                                                     onKeyDown={(e) => {
                                                         if (e.key === "Enter") {
                                                             saveModule({...module, editing: false});

                                                         }
                                                     }}
                                                     defaultValue={module.name}/>
                                    )}
                                    <FacultyOnlyRoute>

                                        <ModuleControlButtons
                                            moduleId={module._id}
                                            deleteModule={(moduleId) => removeModule(moduleId)}

                                            editModule={(moduleId) => dispatch(editModule(moduleId))}/>
                                    </FacultyOnlyRoute>


                                </div>
                                {module.lessons && (
                                    <ListGroup className="wd-lessons rounded-0">
                                        {module.lessons.map((lesson: any) => (
                                            <ListGroup.Item key={lesson._id} className="wd-lesson p-3 ps-1">
                                                <BsGripVertical className="me-2 fs-4"/> {lesson.name}
                                                <LessonControlButtons/>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        ))}
                </ListGroup>
            </div>
        </Container>

    );
}
