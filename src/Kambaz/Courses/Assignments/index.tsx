import { ListGroup } from "react-bootstrap";
import {BsGripVertical, BsPlus} from "react-icons/bs";

import { FaCaretDown } from "react-icons/fa";

import { FaRegEdit } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark.tsx";
import { IoEllipsisVertical } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import {Link} from "react-router-dom";

export default function Assignments() {
    return (
        <div id="wd-assignments" className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div id="search-bar" className="rounded-1 border-gray border w-20 ">
                    <CiSearch className="text-muted fs-4 ps-1 pb-1 pe-1"/>
                <input
                    placeholder="Search..."
                    id="wd-search-"
                    className="border-0"
                      style={{ outline: 'none' }}
                />

                </div>

                <div className="d-flex">
                    <button className="rounded-0  me-2" style={{border: '1px solid #d3d3d3'}}><GoPlus/> Group</button>
                    <button className="rounded-0 border-0 bg-danger text-white">
                        <GoPlus/> Assignment
                    </button>


                </div>
            </div>


            <ListGroup className="rounded-0 pt-3" id="wd-assignment-list">

                <ListGroup.Item className="wd-assignment p-0 bg-light border-gray d-flex align-items-center">
                    <div className="wd-title p-3 ps-2 flex-grow-1">
                        <BsGripVertical className="me-2 fs-5"/>
                        <FaCaretDown className={"me-2 fs-5"}/>
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
                    <ListGroup.Item className="wd-assignment-list-item p-3 ps-2 fs-6 d-flex align-items-center border-start border-gray gap-2">
                        <BsGripVertical className="fs-5" />
                        <Link to="/Kambaz/Courses/1234/Assignments/A1">
                            <FaRegEdit className="text-success fs-5" />
                      </Link>
                        <div className="flex-grow-1">
                            <div><b>A1</b></div>
                            <small className="text-muted">
                                <span className="text-danger">Multiple Modules</span> |
                                <b> Not available until </b> May 6 at 12:00 am |
                                <b> Due </b> May 13 at 11:59PM | 100 Pts
                            </small>
                        </div>
                        <GreenCheckmark />
                        <IoEllipsisVertical className="fs-4 ms-2" />
                    </ListGroup.Item>


                    <ListGroup.Item className="wd-assignment-list-item p-3 ps-2 fs-6 d-flex align-items-center border-start border-gray gap-2">
                        <BsGripVertical className="fs-5" />
                        <Link to="/Kambaz/Courses/1234/Assignments/A2">
                            <FaRegEdit className="text-success fs-5" />
                      </Link>
                        <div className="flex-grow-1">
                            <div><b>A2</b></div>
                            <small className="text-muted">
                                <span className="text-danger">Multiple Modules</span> |
                                <b> Not available until </b> May 6 at 12:00 am |
                                <b> Due </b> May 13 at 11:59PM | 100 Pts
                            </small>
                        </div>
                        <GreenCheckmark />
                        <IoEllipsisVertical className="fs-4 ms-2" />
                    </ListGroup.Item>

                    <ListGroup.Item className="wd-assignment-list-item p-3 ps-2 fs-6 d-flex align-items-center border-start border-gray gap-2">
                        <BsGripVertical className="fs-5" />
                        <Link to="/Kambaz/Courses/1234/Assignments/A3">
                            <FaRegEdit className="text-success fs-5" />
                      </Link>
                        <div className="flex-grow-1">
                            <div><b>A3</b></div>
                            <small className="text-muted">
                                <span className="text-danger">Multiple Modules</span> |
                                <b> Not available until </b> May 6 at 12:00 am |
                                <b> Due </b> May 13 at 11:59PM | 100 Pts
                            </small>
                        </div>
                        <GreenCheckmark />
                        <IoEllipsisVertical className="fs-4 ms-2" />
                    </ListGroup.Item>

            </ListGroup>
        </div>
    );
}
