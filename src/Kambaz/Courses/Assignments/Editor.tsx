export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value="A1 - ENV + HTML"/><br/><br/>
            <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
            <br/>
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100}/>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="PROJECTS">PROJECTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option value="Percentage">Percentage</option>
                            <option value="Letter">Letter</option>
                            <option value="GPA">GPA</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option value="Online">Online</option>
                            <option value="Physical">Physical</option>
                        </select>
                        <br/>
                        <br/>

                        <div>

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
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-assign-to">Assign to</label>
                    </td>
                    <td>
                        <input id="wd-assign-to" value={"Everyone"}/>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">

                        <label htmlFor="wd-due-date"> Due</label>
                    </td>
                    <td>
                        <input type="date" value="2024-05-21" id="wd-due-date"/>
                        <br/>
                    </td>
                </tr>
                <tr>
                    <td align="left" valign="top"><label htmlFor="wd-available-from">Available From</label> <br/>
                        <input type="date" value="2024-05-14" id="wd-available-from"/></td>
                    <td align="left" valign="top"><label htmlFor="wd-available-until">Until</label> <br/> <input
                        type="date" value="2024-05-21" id="wd-available-until"/></td>
                </tr>
            </table>
            <hr/>
            <div>
                <a href="#/Kambaz/Dashboard">
                    <button>Cancel</button>
                </a>
                <a href="#/Kambaz/Dashboard">
                    <button>Save</button>
                </a>
            </div>

        </div>
    );
}
