import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark.tsx";
import { Button, Dropdown } from "react-bootstrap";
export default function ModulesControls() {
 return (
   <div id="wd-modules-controls" className="text-nowrap fs-6">

     <Button variant="danger" size="lg" className="me-1 float-end fs-6" id="wd-add-module-btn">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Module
     </Button>
     <Dropdown className="float-end me-2 fs-6">
       <Dropdown.Toggle variant="secondary" size="lg" className="fs-6" id="wd-publish-all-btn">
         <GreenCheckmark /> Publish All
       </Dropdown.Toggle>
       <Dropdown.Menu>
         <Dropdown.Item id="wd-publish-all">
           <GreenCheckmark /> Publish All
         </Dropdown.Item>
         <Dropdown.Item id="wd-publish-all-modules-and-items">
           <GreenCheckmark /> Publish all modules and items
         </Dropdown.Item>
         <Dropdown.Item id="wd-publish-modules-only">
                <GreenCheckmark /> Publish modules only
         </Dropdown.Item>
           <Dropdown.Item id="wd-unpublish-all-modules-and-items">
                <GreenCheckmark /> Unpublish all modules
         </Dropdown.Item>
           <Dropdown.Item id="wd-unpublish-modules-only">
                <GreenCheckmark /> Unpublish modules only
         </Dropdown.Item>
       </Dropdown.Menu>
     </Dropdown>
        <Button variant="secondary" size="lg" className="me-1 float-end fs-6" id="wd-collapse-all">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Collapse All
     </Button>
       <Button variant = "secondary" size="lg" className="me-2 float-end fs-6" id="wd-view-progress">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       View Progress
     </Button>
   </div>
);}
