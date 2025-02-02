export default function Modules() {
  return (
    <div>
      <div>
        <button>Collapse All</button>
        <button>View Progress</button>

        <select>
          <option>Publish All</option>
          <option>Publish None</option>
          <option>Publish Discussions</option>
          <option>Publish Quizzes</option>
        </select>
        <button>+ Module</button>
      </div>
      <ul id="wd-modules">
        {/* Week 1 */}
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 2 */}
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">HTML & Basic Structure</span>
              <ul className="wd-content">
                <li className="wd-content-item">Understanding HTML tags and elements</li>
                <li className="wd-content-item">Creating a simple webpage</li>
                <li className="wd-content-item">HTML forms and input fields</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 3 */}
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">CSS & Styling Basics</span>
              <ul className="wd-content">
                <li className="wd-content-item">CSS selectors and properties</li>
                <li className="wd-content-item">Box model and layout techniques</li>
                <li className="wd-content-item">Responsive design principles</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 4 */}
        <li className="wd-module">
          <div className="wd-title">Week 4</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">JavaScript Fundamentals</span>
              <ul className="wd-content">
                <li className="wd-content-item">Variables and data types</li>
                <li className="wd-content-item">Functions and scope</li>
                <li className="wd-content-item">Event listeners and DOM manipulation</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 5 */}
        <li className="wd-module">
          <div className="wd-title">Week 5</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">Advanced JavaScript & APIs</span>
              <ul className="wd-content">
                <li className="wd-content-item">Asynchronous JavaScript (Promises, Async/Await)</li>
                <li className="wd-content-item">Fetching data from APIs</li>
                <li className="wd-content-item">Handling JSON data</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 6 */}
        <li className="wd-module">
          <div className="wd-title">Week 6</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">React Basics</span>
              <ul className="wd-content">
                <li className="wd-content-item">Understanding JSX</li>
                <li className="wd-content-item">Components and Props</li>
                <li className="wd-content-item">State and Lifecycle Methods</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 7 */}
        <li className="wd-module">
          <div className="wd-title">Week 7</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">React Advanced Topics</span>
              <ul className="wd-content">
                <li className="wd-content-item">React Router for navigation</li>
                <li className="wd-content-item">Managing state with Context API</li>
                <li className="wd-content-item">Introduction to Redux</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
