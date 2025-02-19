import { ListGroup } from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaCaretDown, FaRegEdit } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark.tsx";
import { IoEllipsisVertical } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.assignments;

    return (
        <div id="wd-assignments" className="container">
            {/* Search Bar */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div id="search-bar" className="rounded-1 border-gray border w-20 d-flex align-items-center">
                    <CiSearch className="text-muted fs-4 ps-1 pb-1 pe-1"/>
                    <input
                        placeholder="Search..."
                        className="border-0 flex-grow-1"
                        style={{ outline: 'none' }}
                    />
                </div>

                {/* Buttons for Adding Group and Assignment */}
                <div className="d-flex">
                    <button className="rounded-0 me-2" style={{ border: '1px solid #d3d3d3' }}>
                        <GoPlus/> Group
                    </button>
                    <button className="rounded-0 border-0 bg-danger text-white">
                        <GoPlus/> Assignment
                    </button>
                </div>
            </div>

            {/* Assignment List */}
            <ListGroup id="wd-modules" className="rounded-0">
                <ListGroup.Item className="wd-assignment p-0 bg-light border-gray d-flex align-items-center">
                    <div className="wd-title p-3 ps-2 flex-grow-1">
                        <BsGripVertical className="me-2 fs-5"/>
                        <FaCaretDown className="me-2 fs-5"/>
                        <b> ASSIGNMENTS</b>
                        <div className="float-end">
                            <div className="border border-gray rounded-pill border-1 d-inline-flex align-items-center p-2">
                                40% of Total
                            </div>
                            <BsPlus/>
                            <IoEllipsisVertical className="fs-5"/>
                        </div>
                    </div>
                </ListGroup.Item>

                {assignments
                    .filter((assignment: any) => assignment.course === cid)
                    .map((assignment: any) => (
                        <ListGroup.Item key={assignment._id} className="wd-assignment-list-item p-3 ps-2 fs-6 d-flex align-items-center border-start border-gray gap-2">
                            <BsGripVertical className="fs-5"/>
                            <Link to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}>
                                <FaRegEdit className="text-success fs-5"/>
                            </Link>
                            <div className="flex-grow-1">
                                <div><b>{assignment.title}</b></div>
                                <small className="text-muted">
                                    <span className="text-danger">
                                      {assignment.num_modules > 1 ? "Multiple Modules" : "One Module"}
                                    </span> |
                                    <b> Not available until </b> {(() => {
                                      const releaseDateTime = new Date(`${assignment.release_date}T00:00`);
                                      return releaseDateTime.toLocaleString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                      });
                                    })()}
                                    <text>   | </text>
                                    <b> Due </b>
                                    {(() => {
                                          const dueDateTime = new Date(`${assignment.due_date}T${assignment.due_time}`);
                                          return dueDateTime.toLocaleString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                          });
                                         })()}
                                </small>
                            </div>
                            <GreenCheckmark/>
                            <IoEllipsisVertical className="fs-4 ms-2"/>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
    );
}
