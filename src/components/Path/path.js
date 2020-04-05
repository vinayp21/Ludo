import React, { Fragment } from 'react';
import './path.scss';

const Path = ({ color, align }) => {
    return (
        <div className={`path ${align}`}>
            {(align == 'top' || align === 'bottom') && (<div className="vertical"><div className="row">
                <div className="box">

                </div>
                <div className="box">

                </div>
                <div className="box">

                </div>
            </div>
                <div className="row">
                    <div className="box">

                    </div>
                    <div className={`box ${color}`}>

                    </div>
                    <div className={`box ${color}`}>

                    </div>
                </div>
                <div className="row">
                    <div className="box">

                    </div>
                    <div className={`box ${color}`}>

                    </div>
                    <div className="box">

                    </div>
                </div>
                <div className="row">
                    <div className="box">

                    </div>
                    <div className={`box ${color}`}>

                    </div>
                    <div className="box">

                    </div>
                </div>
                <div className="row">
                    <div className="box">

                    </div>
                    <div className={`box ${color}`}>

                    </div>
                    <div className="box">

                    </div>
                </div>
                <div className="row">
                    <div className="box">

                    </div>
                    <div className={`box ${color}`}>

                    </div>
                    <div className="box">

                    </div>
                </div></div>
            )}
            {(align === 'left' || align === 'right') && (
                <div className="horizontal">
                    <div className="row">
                        <div className="box">

                        </div>
                        <div className={`box ${color}`}>

                        </div>
                        <div className="box">

                        </div>
                        <div className="box">

                        </div>
                        <div className="box">

                        </div>
                        <div className="box">

                        </div>
                    </div>
                    <div className="row">
                        <div className="box">

                        </div>
                        <div className={`box ${color}`}>

                        </div>
                        <div className={`box ${color}`}>

                        </div>
                        <div className={`box ${color}`}>

                        </div>
                        <div className={`box ${color}`}>

                        </div>
                        <div className={`box ${color}`}>

                        </div>
                    </div>
                    <div className="row">
                        <div className="box">

                        </div>
                        <div className="box">

                        </div>
                        <div className="box">

                        </div>
                        <div className="box">

                        </div>
                        <div className="box">

                        </div>
                        <div className="box">

                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default Path;