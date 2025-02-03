import "./index.css";

import Borders from "./borders.tsx";
import Margins from "./margins.tsx";
import Corners from "./corners.tsx";
import Dimensions from "./dimensions.tsx";
import Positions from "./positions.tsx";
import Zindex from "./zindex.tsx";
import Float from "./float.tsx";
import Gridlayout from "./gridlayout.tsx";
import Flex from "./flex.tsx";
import ReactIconsSampler from "./ReactIcons.tsx";
import {Container} from "react-bootstrap";
import BootstrapGrids from "./BootstrapGrids.tsx";
export default function Lab2() {
    return (
        <Container>

            <h2>Lab 2 - Cascading Style Sheets</h2>
            <h3>Styling with the STYLE attribute</h3>

            {/*<div id="wd-lab2">*/}

            <BootstrapGrids/>

            <div id="wd-css-class-selectors">
                <h3>Class selectors</h3>

                <p className="wd-class-selector">
                    Instead of using IDs to refer to elements, you can use an element's CLASS attribute
                </p>

                <h4 className="wd-class-selector">
                    This heading has same style as paragraph above
                </h4>

            </div>
            <div id="wd-css-document-structure">
                <div className="wd-selector-1">
                    <h3>Document structure selectors</h3>
                    <div className="wd-selector-2">
                        Selectors can be combined to refer elements in particular
                        places in the document
                        <p className="wd-selector-3">
                            This paragraph's red background is referenced as
                            <br/>
                            .selector-2 .selector3<br/>
                            meaning the descendant of some ancestor.<br/>
                            <span className="wd-selector-4"> Whereas this span is a direct child of its parent
                            </span><br/>
                            You can combine these relationships to create specific
                            styles depending on the document structure
                        </p>
                    </div>
                </div>
            </div>
            <div id="wd-css-colors">
                <h2>Colors</h2>
                <h3 className="wd-fg-color-blue">Foreground color</h3>
                <p className="wd-fg-color-red">
                    The text in this paragraph is red but
                    <span className="wd-fg-color-green">this text is green</span>
                </p>
            </div>
            <div id="wd-css-background-colors">
                <h3 className="wd-bg-color-blue wd-fg-color-white">Background color</h3>
                <p className="wd-bg-color-red wd-fg-color-black">
                    This background of this paragraph is red but
                    <span className="wd-bg-color-green wd-fg-color-white">
      the background of this text is green and the foreground white
    </span>
                </p>
            </div>

            <Borders/>
            <Margins/>
            <Corners/>
            <Dimensions/>
            <Positions/>
            <Zindex/>
            <Float/>
            <Gridlayout/>
            <Flex/>
            <ReactIconsSampler/>


            {/*</div>*/}
        </Container>

    );
}