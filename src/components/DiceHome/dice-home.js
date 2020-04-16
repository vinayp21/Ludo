import React from 'react';
import './dice-home.scss';

const DiceHome = ({ color, currentPlayer }) => {
    return (
        <div className={`dice-home ${color} ${currentPlayer === color ? 'blinking' : ''}`}>
            <div className="inner-section">
                <div className="circle-row">
                    <div className={`circle ${color}`}></div>
                    <div className={`circle ${color}`}></div>
                </div>
                <div className="circle-row">
                    <div className={`circle ${color}`}></div>
                    <div className={`circle ${color}`}></div>
                </div>
            </div>
        </div>
    );
}

export default DiceHome;