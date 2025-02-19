import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as db from "./Database";
import {MdEditNote} from "react-icons/md";
export default function Dashboard() {
    const courses = db.courses;

    return (
        <div id="wd-dashboard" className="pt-2 ps-5 fs-6">
            <h1 id="wd-dashboard-title"><b>Dashboard</b></h1>
            <hr/>
            <h4 id="wd-dashboard-published">Published Courses  ({courses.length})</h4>
            <hr/>
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((course) => (
                        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                          <Card>
                            <Link to={`/Kambaz/Courses/${course._id}/Home`}
                                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                              <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                              <Card.Body className="card-body">
                                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                  {course.name} </Card.Title>
                                <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                  {course.description} </Card.Text>
                                <MdEditNote color="gray" size={25} style={{
                                         border: "2px solid gray",
                                         borderRadius: "4px",
                                     }}>Go</MdEditNote>
                              </Card.Body>
                            </Link>
                          </Card>
                        </Col>
                      ))}


                    {/*// <Col className="wd-dashboard-course pt-2" style={{width: "300px"}}>*/}
                    {/*//     <Card>*/}
                    {/*//         <Link to="/Kambaz/Courses/1234/Home"*/}
                    {/*//               className="wd-dashboard-course-link text-decoration-none text-dark">*/}
                    {/*//*/}
                    {/*//             <Card.Img variant="top" src="/images/react.png" style={{*/}
                    {/*//                 width: "275px",*/}
                    {/*//                 height: "200px",*/}
                    {/*//                 objectFit: "cover",*/}
                    {/*//             }}/>*/}
                    {/*//             <Card.Body>*/}
                    {/*//                 <Card.Title className="wd-dashboard-course-title">CS1234 React JS</Card.Title>*/}
                    {/*//                 <Card.Text className="wd-dashboard-course-description">Full Stack software*/}
                    {/*//                     developer</Card.Text>*/}
                    {/*//                 <MdEditNote color="gray" size={25} style={{*/}
                    {/*                     border: "2px solid gray",*/}
                    {/*                     borderRadius: "4px",*/}
                    {/*                 }}>Go</MdEditNote>*/}
                    {/*//             </Card.Body>*/}
                    {/*//         </Link>*/}
                    {/*//     </Card>*/}
                    {/*// </Col>*/}
                    {/*//*/}
                    {/*// <Col className="wd-dashboard-course pt-2" style={{width: "300px"}}>*/}
                    {/*//     <Card>*/}
                    {/*//         <Link to="/Kambaz/Courses/5678/Home"*/}
                    {/*//               className="wd-dashboard-course-link text-decoration-none text-dark">*/}
                    {/*//*/}
                    {/*//             <Card.Img variant="top" src="/images/javascript.png" style={{*/}
                    {/*//                 width: "275px",*/}
                    {/*//                 height: "200px",*/}
                    {/*//                 objectFit: "cover",*/}
                    {/*//             }}/>*/}
                    {/*//             <Card.Body>*/}
                    {/*//                 <Card.Title className="wd-dashboard-course-title">CS5678 Javascript</Card.Title>*/}
                    {/*//                 <Card.Text className="wd-dashboard-course-description">Frontend Web Development*/}
                    {/*//                 </Card.Text>*/}
                    {/*//                 <MdEditNote color="gray" size={25} style={{*/}
                    {/*//                     border: "2px solid gray",*/}
                    {/*//                     borderRadius: "4px",*/}
                    {/*//                 }}>Go</MdEditNote>*/}
                    {/*//             </Card.Body>*/}
                    {/*//         </Link>*/}
                    {/*//     </Card>*/}
                    {/*// </Col>*/}
                    {/*//*/}
                    {/*// <Col className="wd-dashboard-course pt-2" style={{width: "300px"}}>*/}
                    {/*//     <Card>*/}
                    {/*//         <Link to="/Kambaz/Courses/9101/Home"*/}
                    {/*//               className="wd-dashboard-course-link text-decoration-none text-dark">*/}
                    {/*//*/}
                    {/*//             <Card.Img variant="top" src="/images/python.png" style={{*/}
                    {/*//                 width: "275px",*/}
                    {/*//                 height: "200px",*/}
                    {/*//                 objectFit: "cover",*/}
                    {/*//             }}/>*/}
                    {/*//             <Card.Body>*/}
                    {/*//                 <Card.Title className="wd-dashboard-course-title">CS9101 Python </Card.Title>*/}
                    {/*//                 <Card.Text className="wd-dashboard-course-description">Data Science*/}
                    {/*//                 </Card.Text>*/}
                    {/*//                 <MdEditNote color="gray" size={25} style={{*/}
                    {/*//                     border: "2px solid gray",*/}
                    {/*//                     borderRadius: "4px",*/}
                    {/*//                 }}>Go</MdEditNote>*/}
                    {/*//             </Card.Body>*/}
                    {/*//         </Link>*/}
                    {/*//     </Card>*/}
                    {/*// </Col>*/}
                    {/*//*/}
                    {/*// <Col className="wd-dashboard-course  pt-2" style={{width: "300px"}}>*/}
                    {/*//     <Card>*/}
                    {/*//         <Link to="/Kambaz/Courses/1122/Home"*/}
                    {/*//               className="wd-dashboard-course-link text-decoration-none text-dark">*/}
                    {/*//*/}
                    {/*//             <Card.Img variant="top" src="/images/java.jpg" width={200}/>*/}
                    {/*//             <Card.Body>*/}
                    {/*//                 <Card.Title className="wd-dashboard-course-title"> CS1122 Java*/}
                    {/*//                     Fundamentals </Card.Title>*/}
                    {/*//                 <Card.Text className="wd-dashboard-course-description"> Object-Oriented Programming*/}
                    {/*//                 </Card.Text>*/}
                    {/*//                 <MdEditNote color="gray" size={25} style={{*/}
                    {/*//                     border: "2px solid gray",*/}
                    {/*//                     borderRadius: "4px",*/}
                    {/*//                 }}>Go</MdEditNote>*/}
                    {/*//             </Card.Body>*/}
                    {/*//         </Link>*/}
                    {/*//     </Card>*/}
                    {/*// </Col>*/}
                    {/*// <Col className="wd-dashboard-course  pt-2" style={{width: "300px"}}>*/}
                    {/*//     <Card>*/}
                    {/*//         <Link to="/Kambaz/Courses/3344/Home"*/}
                    {/*//               className="wd-dashboard-course-link text-decoration-none text-dark">*/}
                    {/*//*/}
                    {/*//             <Card.Img variant="top" src="/images/sql.png" style={{*/}
                    {/*//                 width: "275px",*/}
                    {/*//                 height: "200px",*/}
                    {/*//                 objectFit: "cover",*/}
                    {/*//             }}/>*/}
                    {/*//             <Card.Body>*/}
                    {/*//                 <Card.Title className="wd-dashboard-course-title"> CS3344 SQL &*/}
                    {/*//                     Databases </Card.Title>*/}
                    {/*//                 <Card.Text className="wd-dashboard-course-description"> Database Management*/}
                    {/*//                 </Card.Text>*/}
                    {/*//                 <MdEditNote color="gray" size={25} style={{*/}
                    {/*//                     border: "2px solid gray",*/}
                    {/*//                     borderRadius: "4px",*/}
                    {/*//                 }}>Go</MdEditNote>*/}
                    {/*//             </Card.Body>*/}
                    {/*//         </Link>*/}
                    {/*//     </Card>*/}
                    {/*// </Col>*/}
                    {/*//*/}
                    {/*// <Col className="wd-dashboard-course  pt-2" style={{width: "300px"}}>*/}
                    {/*//     <Card>*/}
                    {/*//         <Link to="/Kambaz/Courses/5566/Home"*/}
                    {/*//               className="wd-dashboard-course-link text-decoration-none text-dark">*/}
                    {/*//*/}
                    {/*//             <Card.Img variant="top" src="/images/cplusplus.png" style={{*/}
                    {/*//                 width: "275px",*/}
                    {/*//                 height: "200px",*/}
                    {/*//                 objectFit: "cover",*/}
                    {/*//             }}/>*/}
                    {/*//             <Card.Body>*/}
                    {/*//                 <Card.Title className="wd-dashboard-course-title"> CS5566 C++*/}
                    {/*//                     Programming </Card.Title>*/}
                    {/*//                 <Card.Text className="wd-dashboard-course-description"> System Programming in C++*/}
                    {/*//                 </Card.Text>*/}
                    {/*//                 <MdEditNote color="gray" size={25} style={{*/}
                    {/*//                     border: "2px solid gray",*/}
                    {/*//                     borderRadius: "4px",*/}
                    {/*//                 }}>Go</MdEditNote>*/}
                    {/*//             </Card.Body>*/}
                    {/*//         </Link>*/}
                    {/*//     </Card>*/}
                    {/*// </Col>*/}
                    {/*//*/}
                    {/*// <Col className="wd-dashboard-course pt-2" style={{width: "300px"}}>*/}
                    {/*//     <Card>*/}
                    {/*//         <Link to="/Kambaz/Courses/2000/Home"*/}
                    {/*//               className="wd-dashboard-course-link text-decoration-none text-dark">*/}
                    {/*//*/}
                    {/*//             <Card.Img variant="top" src="/images/cybersecurity.jpg" style={{*/}
                    {/*//                 width: "275px",*/}
                    {/*//                 height: "200px",*/}
                    {/*//                 objectFit: "cover",*/}
                    {/*//             }}/>*/}
                    {/*//             <Card.Body>*/}
                    {/*//                 <Card.Title className="wd-dashboard-course-title"> CY2000*/}
                    {/*//                     Cybersecurity </Card.Title>*/}
                    {/*//                 <Card.Text className="wd-dashboard-course-description"> Network Security*/}
                    {/*//                 </Card.Text>*/}
                    {/*//                 <MdEditNote color="gray" size={25} style={{*/}
                    {/*//                     border: "2px solid gray",*/}
                    {/*//                     borderRadius: "4px",*/}
                    {/*//                 }}>Go</MdEditNote>*/}
                    {/*//             </Card.Body>*/}
                    {/*//         </Link>*/}
                    {/*//     </Card>*/}
                    {/*// </Col>*/}

                </Row>

            </div>
        </div>
    );
}
