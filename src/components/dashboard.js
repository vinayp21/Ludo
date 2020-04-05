import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import DiceHome from './DiceHome/dice-home';
import Path from './Path/path';
import Goal from './Goal/goal';
import {
    useHistory
} from "react-router-dom";

const Dashboard = ({ dispatch, test }) => {
    let history = useHistory();


    const trigger = () => {
        dispatch({ type: 'Test' });
        history.push("/");
    }

    return (
        // <div>Welcome to
        //     Dashboard page{test}
        //     <button onClick={trigger}>test</button>
        // </div>
        <div>
            <DiceHome color="red" />
            <Path color="red" align="top" />
            <Path color="red" align="bottom" />
            <Path color="red" align="left" />
            <Path color="red" align="right" />
            <Goal />

        </div>

    );
}

const mapStateToProps = (state) => {

    return {
        test: state.data
    }
}

export default connect(mapStateToProps)(Dashboard);