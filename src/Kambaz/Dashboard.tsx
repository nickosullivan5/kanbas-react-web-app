import {Link} from "react-router-dom";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr/>
            <h2 id="wd-dashboard-published">Published Courses (12)</h2>
            <hr/>
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                          className="wd-dashboard-course-link">
                        <img src="/images/reactjs.jpg" width={200}/>
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/5678/Home" className="wd-dashboard-course-link">
                        <img src="/images/javascript.jpg" width={200}/>
                        <div>
                            <h5> CS5678 JavaScript </h5>
                            <p className="wd-dashboard-course-title"> Frontend Web Development </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/9101/Home" className="wd-dashboard-course-link">
                        <img src="/images/python.jpg" width={200}/>
                        <div>
                            <h5> CS9101 Python Programming </h5>
                            <p className="wd-dashboard-course-title"> Data Science & AI </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1122/Home" className="wd-dashboard-course-link">
                        <img src="/images/java.jpg" width={200}/>
                        <div>
                            <h5> CS1122 Java Fundamentals </h5>
                            <p className="wd-dashboard-course-title"> Object-Oriented Programming </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/3344/Home" className="wd-dashboard-course-link">
                        <img src="/images/sql.jpg" width={200}/>
                        <div>
                            <h5> CS3344 SQL & Databases </h5>
                            <p className="wd-dashboard-course-title"> Database Management Systems </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/5566/Home" className="wd-dashboard-course-link">
                        <img src="/images/cplusplus.jpg" width={200}/>
                        <div>
                            <h5> CS5566 C++ Programming </h5>
                            <p className="wd-dashboard-course-title"> System Programming & Algorithms </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/7788/Home" className="wd-dashboard-course-link">
                        <img src="/images/cybersecurity.jpg" width={200}/>
                        <div>
                            <h5> CS7788 Cybersecurity </h5>
                            <p className="wd-dashboard-course-title"> Ethical Hacking & Network Security </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}
