import React, { useState } from 'react';
import './dice.scss'
const Dice = ({ roll, diceRotation }) => {


    const { degx, degy, degz } = diceRotation;
    const segs = "rotateX(" + degx + "deg) rotateY(" + degy + "deg) rotateZ(" + degz + "deg) translateX(0) translateY(0) translateZ(0)";

    return (
        <div id="wrapD3Cube" onClick={roll}>
            <div id="D3Cube" style={{ "transform": segs }}>
                <div id="side1">
                    <div className="dot"></div>
                </div>
                <div id="side2">
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                <div id="side3">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                <div id="side4">
                    <div>
                        <div className="dot" style={{ 'margin-bottom': '30px' }}></div>
                        <div className="dot"></div>
                    </div>
                    <div>
                        <div className="dot" style={{ 'margin-bottom': '30px' }}></div>
                        <div className="dot"></div>
                    </div>

                </div>
                <div id="side5">
                    <div>
                        <div className="dot" style={{ 'margin-bottom': '15px' }}></div>
                        <div className="dot"></div>
                    </div>
                    <div>
                        <div className="dot"></div>
                    </div>
                    <div>
                        <div className="dot" style={{ 'margin-bottom': '15px' }}></div>
                        <div className="dot"></div>
                    </div>
                </div>
                <div id="side6">
                    <div>
                        <div className="dot" style={{ 'margin-bottom': '15px' }}></div>
                        <div className="dot" style={{ 'margin-bottom': '15px' }}></div>
                        <div className="dot"></div>
                    </div>
                    <div>
                        <div className="dot" style={{ 'margin-bottom': '15px' }}></div>
                        <div className="dot" style={{ 'margin-bottom': '15px' }}></div>
                        <div className="dot"></div>
                    </div>
                </div>
            </div>
            {/* <button onClick={roll}>test</button> */}
        </div >
    );
}

export default Dice;