import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {useParams} from "react-router";

export default function CourseSidebar() {


    const { cid } = useParams();
    const { pathname } = useLocation();

    const links = [
        { label: "Home", path: `/Kambaz/Courses/${cid}/Home` },
        { label: "Modules", path: `/Kambaz/Courses/${cid}/Modules` },
        { label: "Piazza", path: `/Kambaz/Courses/${cid}/Piazza` },
        { label: "Zoom", path: `/Kambaz/Courses/${cid}/Zoom` },
        { label: "Assignments", path: `/Kambaz/Courses/${cid}/Assignments` },
        { label: "Quizzes", path: `/Kambaz/Courses/${cid}/Quizzes` },
        { label: "Grades", path: `/Kambaz/Courses/${cid}/Grades` },
        { label: "People", path: `/Kambaz/Courses/${cid}/People` }
    ];

    return (
        <ListGroup id="wd-courses-navigation" style={{ width: 100 }}
                   className="rounded-0   fs-6 pe-1">
            {links.map((link) => (
                <ListGroup.Item
                    key={link.path}
                    as={Link}
                    to={link.path}
                    className={`text-center border-0 text-danger bg-white 
                        ${pathname.includes(link.path) ? "bg-white text-black border-start border-3 border-dark" : "text-danger bg-white"}`}
                    style={{ width: "90%", whiteSpace: "nowrap" }}
                >
                    {link.label}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
