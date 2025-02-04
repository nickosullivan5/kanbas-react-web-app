import {LiaFileImportSolid} from "react-icons/lia";
import {Button} from "react-bootstrap";
import {BiImport} from "react-icons/bi";
import {FaCheckCircle} from "react-icons/fa";
import {MdDoNotDisturbAlt} from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaStream } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";

export default function CourseStatus() {
    return (
        <div id="wd-course-status" className="fs-6" style={{width: "300px"}}>
            <h4 style={{textAlign: "center"}}>Course Status</h4>
            <div className="d-flex">
                <div className="w-50 pe-1">
                    <Button variant="secondary" size="sm" className="w-100 text-nowrap ">
                        <MdDoNotDisturbAlt className="me-2 fs-6"/> Unpublish </Button></div>
                <div className="w-50">
                    <Button variant="success" size="sm" className="w-100">
                        <FaCheckCircle className="me-2 fs-6"/> Publish </Button></div>
            </div>
            <br/>
            <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
                <BiImport className="me-2 fs-6"/> Import Existing Content </Button>
            <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
                <LiaFileImportSolid className="me-2 fs-6"/> Import from Commons </Button>
           <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
                <FaHome className="me-2 fs-6"/> Choose Home Page</Button>
           <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
                <FaStream className="me-2 fs-6"/> View Course Stream</Button>
            <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
                <TfiAnnouncement className="me-2 fs-6"/> New Announcement</Button>
            <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
                <TbBrandGoogleAnalytics className="me-2 fs-6"/> New Analytics</Button>

            <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
                <IoIosNotifications className="me-2 fs-6"/> View Course Notifications</Button>

        </div>
    );
}