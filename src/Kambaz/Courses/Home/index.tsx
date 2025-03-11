import Modules from "../Modules";
import CourseStatus from "./Status";
import FacultyOnlyRoute from "../../Account/FacultyOnlyRoute";

export default function Home() {
  return (
      <div className="d-flex " id="wd-home">
          <div className="flex-fill me-3 ps-4">
              <Modules/>
          </div>
          <FacultyOnlyRoute>
          <div className="d-none d-xl-block">
              <CourseStatus/>
          </div>
       </FacultyOnlyRoute>
      </div>

  );
}
