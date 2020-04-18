import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import socketIOClient from "socket.io-client";
import DiceHome from './DiceHome/dice-home';
import Pawn from './Pawn/pawn';
import Path from './Path/path';
import Goal from './Goal/goal';
import Dice from './Dice/dice';
import { red, blue, green, yellow, getPosition } from '../utils/defaultPosition';
import './home.scss';

const Home = React.memo(() => {
    const [bluePosition, setBluePosition] = useState(blue)
    const [greenPosition, setGreenPosition] = useState(green)
    const [redPosition, setRedPosition] = useState(red)
    const [yellowPosition, setYellowPosition] = useState(yellow)
    const [diceNumber, setDiceNumber] = useState(0)
    const [diceRotationValue, setDiceRotation] = useState({
        degx: 180,
        degy: 270,
        degz: 270
    })
    const [currentPlayer, setcurrentPlayer] = useState({
        player: 'blue',
        greenHome: true,
        redHome: true,
        blueHome: true,
        yellowHome: true,
        moved: true
    })
    const [currentPawn, setCurrentPawn] = useState('')
    const [currentMovement, setCurrentMovement] = useState('')
    const socket = socketIOClient("http://localhost:3001");
    const [name, setName] = useState('')
    useEffect(() => {
        const name = prompt('Enter Your Name');
        setName(name)
        socket.on("rolled", (data, num) => {

            if (name !== data) {
                runDice(data, num);
                console.log('rolled')
            }
        });
    }, [])
    const runDice = (data, serverNumber) => {
        const { player, greenHome, redHome, blueHome, yellowHome, moved } = currentPlayer;
        if (moved) {

            let currentPlayerData = {
                ...currentPlayer,
                moved: false
            };
            const number = serverNumber ? serverNumber : Math.floor(Math.random() * 6) + 1;
            // const number = 5;

            setDiceNumber(number);
            setCurrentPawn('')
            let diceRotation = {
                degx: 0,
                degy: 630,
                degz: 0
            }
            if (number !== diceNumber) {
                switch (number) {
                    case 1:
                        diceRotation = {
                            degx: 180 + 360,
                            degy: 270,
                            degz: 270
                        }
                        break;
                    case 2:
                        diceRotation = {
                            degx: 0 + 360,
                            degy: 450,
                            degz: 0
                        }
                        break;
                    case 3:
                        diceRotation = {
                            degx: 0,
                            degy: 720,
                            degz: 0 + 360
                        }
                        break;
                    case 4:
                        diceRotation = {
                            degx: 0,
                            degy: 630,
                            degz: 0
                        }
                        break;
                    case 5:
                        diceRotation = {
                            degx: 0,
                            degy: 540,
                            degz: 0
                        }
                        break;
                    case 6:
                        diceRotation = {
                            degx: 0,
                            degy: 270,
                            degz: 270
                        }
                        break;
                    default:
                        diceRotation = {
                            degx: diceRotationValue.degx + 180,
                            degy: diceRotationValue.degy,
                            degz: diceRotationValue.degz
                        }
                        break;
                }
            } else {
                if (number === 6) {
                    diceRotation = {
                        degx: diceRotationValue.degx + 180,
                        degy: diceRotationValue.degy,
                        degz: diceRotationValue.degz
                    }
                } else {
                    diceRotation = {
                        degx: diceRotationValue.degx + 360,
                        degy: diceRotationValue.degy,
                        degz: diceRotationValue.degz
                    }
                }

            }


            if (number !== 6) {
                setTimeout(() => {
                    console.log(player)
                    if (player === 'blue' && blueHome) {
                        currentPlayerData = {
                            ...currentPlayer,
                            player: 'green',
                            moved: true
                        }
                    } else if (player === 'green' && greenHome) {
                        currentPlayerData = {
                            ...currentPlayer,
                            player: 'red',
                            moved: true
                        }
                    } else if (player === 'red' && redHome) {
                        currentPlayerData = {
                            ...currentPlayer,
                            player: 'yellow',
                            moved: true
                        }
                    } else if (player === 'yellow' && yellowHome) {
                        currentPlayerData = {
                            ...currentPlayer,
                            player: 'blue',
                            moved: true
                        }
                    }
                    setcurrentPlayer(currentPlayerData)
                }, 700)

            } else {
                if (player === 'blue' && blueHome) {
                    currentPlayerData = {
                        ...currentPlayer,
                        blueHome: false,
                        moved: false

                    }
                } else if (player === 'green' && greenHome) {
                    currentPlayerData = {
                        ...currentPlayer,
                        greenHome: false,
                        moved: false
                    }
                } else if (player === 'red' && redHome) {
                    currentPlayerData = {
                        ...currentPlayer,
                        redHome: false,
                        moved: false
                    }
                } else if (player === 'yellow' && yellowHome) {
                    currentPlayerData = {
                        ...currentPlayer,
                        yellowHome: false,
                        moved: false
                    }
                }
                setcurrentPlayer(currentPlayerData)
            }
            if (!data || name === data) {
                socket.emit("roleDice", name, number);
            }
            console.log(currentPlayer)
            setDiceRotation(diceRotation)
            setcurrentPlayer(currentPlayerData)
        }
    }

    const getOverlappingData = (position1, position2, position3, currentPosition, currentArea) => {
        const keys1 = Object.keys(position1);
        const keys2 = Object.keys(position2);
        const keys3 = Object.keys(position3);

        let pawnData = {}
        keys1.forEach((key) => {
            if (position1[key].area === currentArea && position1[key].position === currentPosition) {
                pawnData = position1[key];
            }
        })
        if (Object.keys(pawnData).length === 0) {
            keys2.forEach((key) => {
                if (position2[key].area === currentArea && position2[key].position === currentPosition) {
                    pawnData = position2[key];
                }

            })
        }

        if (Object.keys(pawnData).length === 0) {
            keys3.forEach((key) => {
                if (position3[key].area === currentArea && position3[key].position === currentPosition) {
                    pawnData = position3[key];
                }
            })
        }
        return pawnData;
    }

    const movePawn = (id, color, pawnDetails) => {
        const { moved, player } = currentPlayer
        if (player === color && !moved && pawnDetails.position + diceNumber <= 20) {
            setCurrentPawn(id)
            switch (color) {
                case 'red':
                    if (pawnDetails.area === 'home' && diceNumber === 6) {
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
                        const isSafe = currentPosition === 9 || currentPosition === 4;
                        const pawnData = isSafe ? {} : getOverlappingData(yellowPosition, greenPosition, bluePosition, currentPosition, currentArea);
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
                                } else if (pawnData.color === 'blue') {
                                    setBluePosition({
                                        ...bluePosition,
                                        [pawnData.id]: {
                                            ...[pawnData.id],
                                            ...newData
                                        }
                                    })
                                } else {
                                    setBluePosition({
                                        ...bluePosition,
                                        [pawnData.id]: {
                                            ...[pawnData.id],
                                            ...newData
                                        }
                                    })
                                }

                            }, 2101)
                        }
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
                    if (pawnDetails.area === 'home' && diceNumber === 6) {
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
                        // if (pawnDetails.position + diceNumber <= 20) {
                        const { keyframe, newLeft, newTop, currentPosition, currentArea } = getPosition(color, pawnDetails, diceNumber);
                        console.log('key', currentPosition)
                        setCurrentMovement(keyframe)

                        const isSafe = currentPosition === 9 || currentPosition === 4;
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
                        // }
                    }
                    break;
                case 'yellow':
                    if (pawnDetails.area === 'home' && diceNumber === 6) {
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
                        console.log('key', keyframe)
                        const isSafe = currentPosition === 9 || currentPosition === 4;
                        const pawnData = isSafe ? {} : getOverlappingData(bluePosition, greenPosition, redPosition, currentPosition, currentArea);
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
                                    setBluePosition({
                                        ...bluePosition,
                                        [pawnData.id]: {
                                            ...[pawnData.id],
                                            ...newData
                                        }
                                    })
                                }

                            }, 2101)
                        }
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
                    if (pawnDetails.area === 'home' && diceNumber === 6) {
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
                        const { keyframe, newLeft, newTop, currentPosition, currentArea } = getPosition(color, pawnDetails, diceNumber);
                        setCurrentMovement(keyframe)
                        const isSafe = currentPosition === 9 || currentPosition === 4;
                        const pawnData = isSafe ? {} : getOverlappingData(yellowPosition, bluePosition, redPosition, currentPosition, currentArea);
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
                                if (pawnData.color === 'blue') {
                                    setBluePosition({
                                        ...bluePosition,
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
            setDiceRotation({
                degx: 180,
                degy: 270,
                degz: 270
            });
            if (diceNumber !== 6) {
                if (currentPlayer.player === 'blue') {
                    setcurrentPlayer({
                        ...currentPlayer,
                        player: 'green',
                        blueHome: false,
                        moved: true
                    })
                } else if (currentPlayer.player === 'green') {
                    setcurrentPlayer({
                        ...currentPlayer,
                        player: 'red',
                        greenHome: false,
                        moved: true
                    })
                } else if (currentPlayer.player === 'red') {
                    setcurrentPlayer({
                        ...currentPlayer,
                        player: 'yellow',
                        redHome: false,
                        moved: true
                    })
                } else {
                    setcurrentPlayer({
                        ...currentPlayer,
                        player: 'blue',
                        yellowHome: false,
                        moved: true
                    })
                }
            } else {
                setcurrentPlayer({
                    ...currentPlayer,
                    moved: true
                })
            }
        }
    }
    return (
        < div className='home' >
            <div className='row-top'>
                <DiceHome color="green" currentPlayer={currentPlayer.player} />
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
                <DiceHome color="red" currentPlayer={currentPlayer.player} />
            </div>
            <div className='row-center'>
                <Path color="green" align="left" />
                <Goal />
                <Path color="yellow" align="right" />
            </div>
            <div className='row-bottom'>
                <DiceHome color="blue" currentPlayer={currentPlayer.player} />
                <Pawn color="blue" pawnDetails={bluePosition.b1} id="b1" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="blue" pawnDetails={bluePosition.b2} id="b2" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="blue" pawnDetails={bluePosition.b3} id="b3" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="blue" pawnDetails={bluePosition.b4} id="b4" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Path color="blue" align="bottom" />
                <DiceHome color="yellow" currentPlayer={currentPlayer.player} />
                <Pawn color="yellow" pawnDetails={yellowPosition.y1} id="y1" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="yellow" pawnDetails={yellowPosition.y2} id="y2" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="yellow" pawnDetails={yellowPosition.y3} id="y3" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
                <Pawn color="yellow" pawnDetails={yellowPosition.y4} id="y4" getClickedPawn={movePawn} currentPawn={currentPawn} movement={currentMovement} />
            </div>
            <Dice diceRotation={diceRotationValue} roll={() => runDice(false)} />
            {diceNumber}
        </div >
    );
});

// const mapStateToProps = (state) => {
//     return {
//         test: state.currentMovement
//     }
// }

export default (Home);