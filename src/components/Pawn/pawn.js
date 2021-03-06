import React, { useEffect } from 'react';
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
        console.log(color,
            id,
            getClickedPawn,
            pawnDetails,
            currentPawn,
            movement)
    }


    const Movement = styled.div`
        animation: ${move} 1s ease ;
        `;

    return (
        <Movement onClick={pawnClicked} className="pawn" style={{ left: `${left}px`, top: `${top}px` }}>
            <div className={color}>
            </div>
        </Movement>

    );
})

export default Pawn
