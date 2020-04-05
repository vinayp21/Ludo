import React from 'react';
import styled, { keyframes, css } from "styled-components";
import './pawn.scss'

const Pawn = React.memo(({
    color,
    id,
    getClickedPawn,
    pawnDetails,
    pawnDetails: { left, top },
    currentPawn,
    movement
}) => {


    const pawnClicked = () => {
        getClickedPawn(id, color, pawnDetails);
    }
    let move = '';


    if (id === currentPawn && movement) {
        move = keyframes`${movement}`
    }
    // if (id === currentPawn && !movement) {
    //     move = keyframes`
    //     0%   { left:${prevLeft}px; top:${prevTop}px;}
    //     100% { left: ${ left} px; top: ${top} px;
    // } `
    // }

    const Movement = styled.div`
        animation: ${move} 2s ease ;
        `;

    return (
        // <div className="pawn" style={{ left: `${left}px`, top: `${top}px` }}>
        //     <button onClick={pawnClicked} className={color}>
        //     </button>
        // </div>
        <Movement className="pawn" style={{ left: `${left}px`, top: `${top}px` }}>
            <button onClick={pawnClicked} className={color}>
            </button>
        </Movement>

    );
})

export default Pawn
