export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className={"container ps-5 pe-5" }>
                <div className="">
                    <label htmlFor="wd-name">Assignment Name</label>
                    <div><input id="wd-name" className="w-100 pt-2" value="A1 - ENV + HTML"/>
                    </div>
                </div>

                <div className="pt-3">
                    <div>
                    <textarea id="wd-description" className="w-100" style={{ height: "250px" }}>
                        The assignment is available online. Submit a link to the landing page of Netlify
                    </textarea>
                    </div>
                </div>

            <div className="d-flex justify-content-end mb-3 pt-3">
                <label htmlFor="wd-points"className="pe-2">Points</label>
                <input id="wd-points" value={100} className="w-75"/>
            </div>

            <div className="d-flex justify-content-end mb-3">
                <label htmlFor="wd-group" className="pe-2">Assignment Group</label>
                <select id="wd-group" className="w-75">
                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                    <option value="PROJECTS">PROJECTS</option>
                    <option value="QUIZZES">QUIZZES</option>
                </select>
            </div>

            <div className="d-flex justify-content-end mb-3">
                <label htmlFor="wd-display-grade-as" className="pe-2">Display Grade as</label>
                <select id="wd-display-grade-as" className="w-75">
                    <option value="Percentage">Percentage</option>
                    <option value="Letter">Letter</option>
                    <option value="GPA">GPA</option>
                </select>
            </div>

            <div className="d-flex justify-content-end mb-3">
                <label htmlFor="wd-submission-type" className="pe-2">Submission Type</label>

                <div className="w-75">
                    <select id="wd-submission-type" className="w-100">
                        <option value="Online">Online</option>
                        <option value="Physical">Physical</option>
                    </select>

                        <label>Online Entry Options:</label><br/>

                        <input type="checkbox" name="online-entry-options" id="wd-text-entry"/>
                        <label htmlFor="wd-text-entry">Text Entry</label><br/>

                        <input type="checkbox" name="online-entry-options" id="wd-website-url"/>
                        <label htmlFor="wd-website-url">Website URL</label><br/>

                        <input type="checkbox" name="conline-entry-options" id="wd-media-recordings"/>
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

                        <input type="checkbox" name="online-entry-options" id="wd-student-annotation"/>
                        <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

                        <input type="checkbox" name="online-entry-options" id="wd-file-upload"/>
                        <label htmlFor="wd-file-upload">File Uploads</label>
                </div>
            </div>
            <div className="d-flex justify-content-end mb-3">
                <text className="pe-2">Assign</text>
                <div className="w-75">
                    <div>
                        <label htmlFor="wd-assign-to" className="pe-2">Assign To</label>
                    </div>
                    <div>
                        <input id="wd-assign-to" className="w-75" value={"Everyone"}/>
                    </div>
                    <div>
                        <label htmlFor="wd-due-date" className="pe-2">Due Date</label>
                    </div>
                    <div>
                        <input type="date" value="2024-05-21" id="wd-due-date" className="w-75"/>
                    </div>
                    <div className="d-inline-flex justify-content-between">
                        <div >
                            <div>
                                <label htmlFor="wd-available-from" className="pe-2">Available From</label>

                            </div>
                            <input type="date" value="2024-05-14" id="wd-available-from" className="w-75"/>
                        </div>

                        <div>
                            <div>
                                <label htmlFor="wd-available-until" className="pe-2">Until</label>

                            </div>
                            <input type="date" value="2024-05-21" id="wd-available-until" className="w-75"/>
                        </div>
                    </div>

                </div>
            </div>

            <div className="d-flex justify-content-end mb-3">

            </div>

            <div className="d-flex justify-content-end mb-3">

            </div>

            <div className="d-flex justify-content-end mb-3">

            </div>

            <div className="d-flex justify-content-end mb-3">

            </div>

            <div className="d-flex justify-content-end mt-3">
                <button className="rounded-0 me-2" style={{border: '1px solid #d3d3d3'}}>Cancel</button>
                <button className="rounded-0 border-0 bg-danger text-white">Save</button>
            </div>
        </div>
    );
}
