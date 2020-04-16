import { brotliDecompress } from "zlib"

export const blue = {
    b1: {
        left: 118,
        top: 834,
        area: 'home',
        position: 0,
        homeLeft: 118,
        homeTop: 834,
        color: 'blue'
    },
    b2: {
        left: 234,
        top: 834,
        area: 'home',
        position: 0,
        homeLeft: 234,
        homeTop: 834,
        color: 'blue'
    },
    b3: {
        left: 233,
        top: 719,
        area: 'home',
        position: 0,
        homeLeft: 233,
        homeTop: 719,
        color: 'blue'
    },
    b4: {
        left: 118,
        top: 719,
        area: 'home',
        position: 0,
        homeLeft: 118,
        homeTop: 719,
        color: 'blue'
    },
    homePosition: {
        left: 410,
        top: 876,
        homeLeft: 410,
        homeTop: 876
    }
}

export const red = {
    r1: {
        left: 834,
        top: 233,
        area: 'home',
        position: 0,
        homeLeft: 834,
        homeTop: 233,
        color: 'red'

    },
    r2: {
        left: 718,
        top: 117,
        area: 'home',
        position: 0,
        homeLeft: 718,
        homeTop: 117,
        color: 'red'
    },
    r3: {
        left: 834,
        top: 117,
        area: 'home',
        position: 0,
        homeLeft: 834,
        homeTop: 117,
        color: 'red'
    },
    r4: {
        left: 718,
        top: 233,
        area: 'home',
        position: 0,
        homeLeft: 718,
        homeTop: 233,
        color: 'red'
    },
    homePosition: {
        left: 542,
        top: 74,
        homeLeft: 542,
        homeTop: 74
    }
}

export const green = {
    g1: {
        left: 118,
        top: 233,
        area: 'home',
        position: 0,
        homeLeft: 118,
        homeTop: 233,
        color: 'green'
    },
    g2: {
        left: 234,
        top: 117,
        area: 'home',
        position: 0,
        homeLeft: 234,
        homeTop: 117,
        color: 'green'
    },
    g3: {
        left: 118,
        top: 117,
        area: 'home',
        position: 0,
        homeLeft: 118,
        homeTop: 117,
        color: 'green'
    },
    g4: {
        left: 234,
        top: 233,
        area: 'home',
        position: 0,
        homeLeft: 234,
        homeTop: 233,
        color: 'green'
    },
    homePosition: {
        left: 75,
        top: 410,
        homeLeft: 75,
        homeTop: 410
    }
}

export const yellow = {
    y1: {
        left: 834,
        top: 834,
        area: 'home',
        position: 0,
        homeLeft: 834,
        homeTop: 834,
        color: 'yellow'
    },
    y2: {
        left: 718,
        top: 834,
        area: 'home',
        areaposition: 0,
        homeLeft: 718,
        homeTop: 834,
        color: 'yellow'
    },
    y3: {
        left: 834,
        top: 719,
        area: 'home',
        position: 0,
        homeLeft: 834,
        homeTop: 719,
        color: 'yellow'
    },
    y4: {
        left: 718,
        top: 719,
        area: 'home',
        position: 0,
        homeLeft: 718,
        homeTop: 719,
        color: 'yellow'
    },
    homePosition: {
        left: 872,
        top: 543,
        homeLeft: 872,
        homeTop: 543

    }
}




const getStepMovement = (pawnDetails, diceNumber, color) => {
    const turns = {
        q1: {
            left: 342,
            top: 540
        },
        q2: {
            left: 409,
            top: 341
        },
        q3: {
            left: 607,
            top: 409
        },
        q4: {
            left: 541,
            top: 609
        }
    }
    const verticleBar = 68;
    const horizontalBar = 65;
    const { position, area, left, top } = pawnDetails
    const movement = {};
    let currentArea = area;
    let currentPosition = position;
    let currentTop = top;
    let currentLeft = left
    let incrementposition = true
    for (var i = 1; i <= diceNumber; i++) {
        incrementposition = true;
        switch (currentArea) {
            case 'q1':
                if (currentPosition === 13) {
                    currentTop = turns[currentArea].top
                    currentLeft = turns[currentArea].left
                    movement[`step${i}`] = turns[currentArea]
                    currentArea = 'q2';
                    currentPosition = 1;
                    incrementposition = false
                } else if ((currentPosition === 7 || currentPosition >= 15) && color === 'blue') {
                    currentTop = currentTop - verticleBar
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                    currentPosition = currentPosition === 7 ? 15 : currentPosition
                } else if (currentPosition < 6) {
                    currentTop = currentTop + verticleBar
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                } else if (currentPosition > 5 && currentPosition < 8) {
                    currentLeft = currentLeft - horizontalBar;
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                } else {
                    currentTop = currentTop - verticleBar
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                }
                break;
            case 'q2':
                if (currentPosition === 13) {
                    currentTop = turns[currentArea].top
                    currentLeft = turns[currentArea].left
                    movement[`step${i}`] = turns[currentArea]
                    currentArea = 'q3';
                    currentPosition = 1;
                    incrementposition = false
                } else if ((currentPosition === 7 || currentPosition >= 15) && color === 'green') {
                    currentLeft = currentLeft + verticleBar
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                    currentPosition = 15
                } else if (currentPosition < 6) {
                    currentLeft = currentLeft - verticleBar
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                } else if (currentPosition > 5 && currentPosition < 8) {
                    currentTop = currentTop - horizontalBar
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                } else {
                    currentLeft = currentLeft + verticleBar
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                }
                break;
            case 'q3':
                if (currentPosition === 13) {
                    currentTop = turns[currentArea].top
                    currentLeft = turns[currentArea].left
                    movement[`step${i}`] = turns[currentArea]
                    currentArea = 'q4';
                    currentPosition = 1;
                    incrementposition = false
                } else if ((currentPosition === 7 || currentPosition >= 15) && color === 'red') {
                    currentTop = currentTop + verticleBar;
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                    currentPosition = 15
                } else if (currentPosition < 6) {
                    currentTop = currentTop - verticleBar;
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                } else if (currentPosition > 5 && currentPosition < 8) {
                    currentLeft = currentLeft + horizontalBar
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                } else {
                    currentTop = currentTop + verticleBar;
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                }
                break;
            case 'q4':
                if (currentPosition === 13) {
                    currentTop = turns[currentArea].top
                    currentLeft = turns[currentArea].left
                    movement[`step${i}`] = turns[currentArea]
                    currentArea = 'q1';
                    currentPosition = 1;
                    incrementposition = false
                } else if ((currentPosition === 7 || currentPosition >= 15) && color === 'yellow') {
                    currentLeft = currentLeft - verticleBar
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                    currentPosition = 15
                } else if (currentPosition < 6) {
                    currentLeft = currentLeft + verticleBar
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                } else if (currentPosition > 5 && currentPosition < 8) {
                    currentTop = currentTop + horizontalBar
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                } else {
                    currentLeft = currentLeft - verticleBar
                    movement[`step${i}`] = {
                        left: currentLeft,
                        top: currentTop
                    }
                }
                break;
        }
        if (incrementposition) {
            currentPosition++;
        }

    }
    return {
        movement,
        currentPosition,
        currentArea
    };

}

const getKeyFrames = (pawnDetails, diceNumber, color) => {
    const { left, top } = pawnDetails
    let keyframe = ''
    const { movement: { step1, step2, step3, step4, step5, step6 }, currentPosition, currentArea } = getStepMovement(pawnDetails, diceNumber, color);
    console.log(step1, step2, step3, step4, step5, step6);
    switch (diceNumber) {
        case 1:
            keyframe = `
            0%   { left:${left}px; top:${top}px;}
            100% { left:${step1.left}px; top:${step1.top}px;}`
            return {
                keyframe: keyframe,
                newLeft: step1.left,
                newTop: step1.top,
                currentPosition,
                currentArea
            }
        case 2:
            keyframe = `
                0%   { left:${left}px; top:${top}px;}
                50%   { left:${step1.left}px; top:${step1.top}px;}
                100% { left:${step2.left}px; top:${step2.top}px;}`
            return {
                keyframe: keyframe,
                newLeft: step2.left,
                newTop: step2.top,
                currentPosition,
                currentArea
            }
        case 3:
            keyframe =
                `0%   { left:${left}px; top:${top}px;}
                50%   { left:${step1.left}px; top:${step1.top}px;}
                75%   { left:${step2.left}px; top:${step2.top}px;}
                100% { left:${step3.left}px; top:${step3.top}px;}`
            return {
                keyframe: keyframe,
                newLeft: step3.left,
                newTop: step3.top,
                currentPosition,
                currentArea
            }
        case 4:
            keyframe = `
                0%   { left:${left}px; top:${top}px;}
                25%   { left:${step1.left}px; top:${step1.top}px;}
                50%   { left:${step2.left}px; top:${step2.top}px;}
                75%   { left:${step3.left}px; top:${step3.top}px;}
                100% { left:${step4.left}px; top:${step4.top}px;}`
            return {
                keyframe: keyframe,
                newLeft: step4.left,
                newTop: step4.top,
                currentPosition,
                currentArea
            }
        case 5:
            keyframe = `
                0%   { left:${left}px; top:${top}px;}
                20%   { left:${step1.left}px; top:${step1.top}px;}
                40%   { left:${step2.left}px; top:${step2.top}px;}
                60%   { left:${step3.left}px; top:${step3.top}px;}
                80%   { left:${step4.left}px; top:${step4.top}px;}
                100% { left:${step5.left}px; top:${step5.top}px;}`
            return {
                keyframe: keyframe,
                newLeft: step5.left,
                newTop: step5.top,
                currentPosition,
                currentArea
            }
        case 6:
            keyframe = `
                0%   { left:${left}px; top:${top}px;}
                16%   { left:${step1.left}px; top:${step1.top}px;}
                32%   { left:${step2.left}px; top:${step2.top}px;}
                48%   { left:${step3.left}px; top:${step3.top}px;}
                64%   { left:${step4.left}px; top:${step4.top}px;}
                82%   { left:${step5.left}px; top:${step5.top}px;}
                100% { left:${step6.left}px; top:${step6.top}px;}`
            return {
                keyframe: keyframe,
                newLeft: step6.left,
                newTop: step6.top,
                currentPosition,
                currentArea
            }
            return keyframe;
    }
}

export const getPosition = (color, pawnDetails, diceNumber) => {
    return getKeyFrames(pawnDetails, diceNumber, color)
}