import CourseNavigation from "./Navigation.tsx";
import { Navigate, Route, Routes } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor.tsx";
import {FaAlignJustify} from "react-icons/fa";
import PeopleTable from "./People/Table.tsx";
export default function Courses() {
  return (
      <div id="wd-courses" className="ps-4e">
          <h5 className="text-danger ps-3">
              <FaAlignJustify className="me-4 fs-4 mb-1"/>
              Course 1234 </h5>
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
                          <Route path="People" element={<PeopleTable/>}/>
                          <Route path="Piazza" element={<h2>Piazza</h2>}/>
                          <Route path="Zoom" element={<h2>Zoom</h2>}/>
                          <Route path="Quizzes" element={<h2>Quizzes</h2>}/>
                          <Route path="Grades" element={<h2>Grades</h2>}/>

                      </Routes>
                  </div>
              </div>
      </div>
              );
              }
