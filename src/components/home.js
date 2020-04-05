import React, { useState } from 'react';
import { connect } from 'react-redux'
import DiceHome from './DiceHome/dice-home';
import Pawn from './Pawn/pawn';
import Path from './Path/path';
import Goal from './Goal/goal';
import { red, blue, green, yellow, getPosition } from '../utils/defaultPosition';
import './home.scss';

const Home = ({ dispatch, test }) => {
    const [bluePosition, setBluePosition] = useState(blue)
    const [greenPosition, setGreenPosition] = useState(green)
    const [redPosition, setRedPosition] = useState(red)
    const [yellowPosition, setYellowPosition] = useState(yellow)
    const [diceNumber, setDiceNumber] = useState(0)
    const [currentPawn, setCurrentPawn] = useState('')
    const [currentMovement, setCurrentMovement] = useState('')
    const runDice = () => {
        setDiceNumber(Math.floor(Math.random() * 6) + 1);
        setCurrentPawn('')
    }

    const getOverlappingData = (position1, position2, position3, currentPosition, currentArea) => {
        const keys1 = Object.keys(position1);
        const keys2 = Object.keys(position2);
        const keys3 = Object.keys(position3);

        let pawnData = {}
        keys1.forEach((key) => {
            console.log(key)
            if (position1[key].area === currentArea && position1[key].position === currentPosition) {
                // overlapData.homeKeyframe = `
                // 0%   { left:${position1[key].left}px; top:${position1[key].top}px;}
                // 100% { left: ${position1[key].homeLeft}px; top: ${position1[key].homeTop}px;} `
                pawnData = position1[key];
            }
        })
        if (Object.keys(pawnData).length === 0) {
            keys2.forEach((key) => {
                if (position2[key].area === currentArea && position2[key].position === currentPosition) {
                    // overlapData.homeKeyframe = `
                    // 0%   { left:${position2[key].left}px; top:${position2[key].top}px;}
                    // 100% { left: ${position2[key].homeLeft}px; top: ${position2[key].homeTop}px;} `
                    pawnData = position2[key];
                }

            })
        }

        if (Object.keys(pawnData).length === 0) {
            keys3.forEach((key) => {
                if (position3[key].area === currentArea && position3[key].position === currentPosition) {
                    // overlapData.homeKeyframe = `
                    // 0%   { left:${position3[key].left}px; top:${position3[key].top}px;}
                    // 100% { left: ${position3[key].homeLeft}px; top: ${position3[key].homeTop}px;} `
                    pawnData = position3[key];
                }
            })
        }
        return pawnData;
    }

    const movePawn = (id, color, pawnDetails) => {
        setCurrentPawn(id)
        switch (color) {
            case 'red':
                if (pawnDetails.area === 'home') {
                    setRedPosition({
                        ...redPosition,
                        [id]: {
                            ...redPosition[id],
                            left: red.homePosition.left,
                            top: red.homePosition.top,
                            area: 'q3',
                            position: 9,
                            id
                        }
                    })
                    const key = `
                        0%   { left:${pawnDetails.left}px; top:${pawnDetails.top}px;}
                        100% { left: ${red.homePosition.left}px; top: ${red.homePosition.top}px;} `
                    setCurrentMovement(key)
                } else {
                    const { keyframe, newLeft, newTop, currentPosition, currentArea } = getPosition(color, pawnDetails, diceNumber);
                    setCurrentMovement(keyframe)
                    setRedPosition({
                        ...redPosition,
                        [id]: {
                            ...redPosition[id],
                            left: newLeft,
                            top: newTop,
                            area: currentArea,
                            position: currentPosition,
                            id
                        }
                    })
                }
                break;
            case 'blue':
                if (pawnDetails.area === 'home') {
                    setBluePosition({
                        ...bluePosition,
                        [id]: {
                            ...bluePosition[id],
                            left: blue.homePosition.left,
                            top: blue.homePosition.top,
                            area: 'q1',
                            position: 9,
                            id
                        }
                    })
                    const key = `
                        0%   { left:${pawnDetails.left}px; top:${pawnDetails.top}px;}
                        100% { left: ${ blue.homePosition.left}px; top: ${blue.homePosition.top}px;
                    } `
                    setCurrentMovement(key)
                } else {
                    const { keyframe, newLeft, newTop, currentPosition, currentArea } = getPosition(color, pawnDetails, 6);
                    setCurrentMovement(keyframe)
                    const isSafe = pawnDetails.position === 9 || pawnDetails.position === 4;
                    const pawnData = isSafe ? {} : getOverlappingData(yellowPosition, greenPosition, redPosition, currentPosition, currentArea);
                    if (Object.keys(pawnData).length > 0) {
                        const newData = {
                            left: pawnData.homeLeft,
                            top: pawnData.homeTop,
                            area: 'home',
                            position: 0,
                        }

                        setTimeout(() => {
                            setCurrentPawn(pawnData.id);
                            setCurrentMovement(`
                            0%   { left:${pawnData.left}px; top:${pawnData.top}px;}
                            100% { left: ${pawnData.homeLeft}px; top: ${pawnData.homeTop}px;} `)
                            if (pawnData.color === 'green') {
                                setGreenPosition({
                                    ...greenPosition,
                                    [pawnData.id]: {
                                        ...[pawnData.id],
                                        ...newData
                                    }
                                })
                            } else if (pawnData.color === 'red') {
                                setRedPosition({
                                    ...redPosition,
                                    [pawnData.id]: {
                                        ...[pawnData.id],
                                        ...newData
                                    }
                                })
                            } else {
                                setYellowPosition({
                                    ...yellowPosition,
                                    [pawnData.id]: {
                                        ...[pawnData.id],
                                        ...newData
                                    }
                                })
                            }

                        }, 2101)
                    }

                    setBluePosition({
                        ...bluePosition,
                        [id]: {
                            ...bluePosition[id],
                            left: newLeft,
                            top: newTop,
                            area: currentArea,
                            position: currentPosition,
                        }
                    })

                }
                break;
            case 'yellow':
                if (pawnDetails.area === 'home') {
                    setYellowPosition({
                        ...yellowPosition,
                        [id]: {
                            ...yellowPosition[id],
                            left: yellow.homePosition.left,
                            top: yellow.homePosition.top,
                            area: 'q4',
                            position: 9,
                            id
                        }
                    })
                    const key = `
                        0%   { left:${pawnDetails.left}px; top:${pawnDetails.top}px;}
                        100% { left: ${ yellow.homePosition.left}px; top: ${yellow.homePosition.top}px;
                    } `
                    setCurrentMovement(key)
                } else {
                    const { keyframe, newLeft, newTop, currentPosition, currentArea } = getPosition(color, pawnDetails, diceNumber);
                    setCurrentMovement(keyframe)
                    setYellowPosition({
                        ...yellowPosition,
                        [id]: {
                            ...yellowPosition[id],
                            left: newLeft,
                            top: newTop,
                            area: currentArea,
                            position: currentPosition,
                        }
                    })
                }
                break;
            case 'green':
                if (pawnDetails.area === 'home') {
                    setGreenPosition({
                        ...greenPosition,
                        [id]: {
                            ...greenPosition[id],
                            left: green.homePosition.left,
                            top: green.homePosition.top,
                            area: 'q2',
                            position: 9,
                            id
                        }
                    })
                    const key = `
                        0%   { left:${pawnDetails.left}px; top:${pawnDetails.top}px;}
                        100% { left: ${ green.homePosition.left} px; top: ${green.homePosition.top} px;
                    } `
                    setCurrentMovement(key)
                } else {
                    const { keyframe, newLeft, newTop, currentPosition, currentArea } = getPosition(color, pawnDetails, 1);
                    setCurrentMovement(keyframe)
                    setGreenPosition({
                        ...greenPosition,
                        [id]: {
                            ...greenPosition[id],
                            left: newLeft,
                            top: newTop,
                            area: currentArea,
                            position: currentPosition,
                        }
                    })
                }
                break;
            default:
                break;
        }

    }
    return (
        <div className='home'>
            <div className='row-top'>
                <DiceHome color="green" />
                <i class="far fa-star star-q1"></i>
                <i class="far fa-star star-q2"></i>
                <i class="far fa-star star-q3"></i>
                <i class="far fa-star star-q4"></i>
                <Pawn color="green" pawnDetails={greenPosition.g1} id="g1" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="green" pawnDetails={greenPosition.g2} id="g2" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="green" pawnDetails={greenPosition.g3} id="g3" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="green" pawnDetails={greenPosition.g4} id="g4" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Path color="red" align="top" />
                <Pawn color="red" pawnDetails={redPosition.r1} id="r1" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="red" pawnDetails={redPosition.r2} id="r2" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="red" pawnDetails={redPosition.r3} id="r3" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="red" pawnDetails={redPosition.r4} id="r4" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <DiceHome color="red" />
            </div>
            <div className='row-center'>
                <Path color="green" align="left" />
                <Goal />
                <Path color="yellow" align="right" />
            </div>
            <div className='row-bottom'>
                <DiceHome color="blue" />
                <Pawn color="blue" pawnDetails={bluePosition.b1} id="b1" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="blue" pawnDetails={bluePosition.b2} id="b2" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="blue" pawnDetails={bluePosition.b3} id="b3" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="blue" pawnDetails={bluePosition.b4} id="b4" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Path color="blue" align="bottom" />
                <DiceHome color="yellow" />
                <Pawn color="yellow" pawnDetails={yellowPosition.y1} id="y1" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="yellow" pawnDetails={yellowPosition.y2} id="y2" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="yellow" pawnDetails={yellowPosition.y3} id="y3" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="yellow" pawnDetails={yellowPosition.y4} id="y4" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />


            </div>
            <button onClick={runDice}>Click</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        test: state.currentMovement
    }
}

export default connect(mapStateToProps)(Home);