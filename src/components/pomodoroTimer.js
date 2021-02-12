import { useEffect, useState } from "react";
import { 
    Button,
    ButtonGroup
 } from "react-bootstrap";

const render = {
    WORK: 0,
    SHORT: 1,
    LONG: 2,
    CYCLES: 3
};

const state = {
    WORK: 0,
    SHORT: 1,
    LONG: 2
}

function PomodoroTimer() {
    const [workTime, setWorkTime] = useState(0);
    const [shortBreak, setShortBreak] = useState(0);
    const [longBreak, setLongBreak] = useState(0);
    const [numCycles, setNumCycles] = useState(0);
    const [whichState, setState] = useState();
    const [whichRender, setRender] = useState();
    const [intervalId, setIntervalId] = useState(undefined);

    useEffect(() => {
        setWorkTime(10);
        setShortBreak(3);
        setLongBreak(5);
        setNumCycles(2);
        setState(state.WORK);
        setRender(render.WORK);
    }, []);

    useEffect(() => {
        if (workTime == 0 || shortBreak == 0 || longBreak == 0) {
            changeState();
        }
    }, [workTime, shortBreak, longBreak]);

    useEffect(() => {
        if (whichState != undefined) startTimer();
    }, [whichState]);

    const fnRenderWork = () => setRender(render.WORK);
    const fnRenderShort = () => setRender(render.SHORT);
    const fnRenderLong = () => setRender(render.LONG);
    const fnRenderCycles = () => setRender(render.CYCLES);

    const add = function() {
        switch(whichRender) {
            case (render.WORK):
                setWorkTime((oldTime) => oldTime + 60);
                break
            case (render.SHORT):
                setShortBreak((oldTime) => oldTime + 60);
                break;
            case (render.LONG):
                setLongBreak((oldTime) => oldTime + 60);
                break;
            case (render.CYCLES):
                setNumCycles((oldNumCycles) => oldNumCycles + 1);
                break;
        }
    }

    const minus = function() {
        switch(whichRender) {
            case (render.WORK):
                setWorkTime((oldTime) => oldTime - 60);
                break
            case (render.SHORT):
                setShortBreak((oldTime) => oldTime - 60);
                break;
            case (render.LONG):
                setLongBreak((oldTime) => oldTime - 60);
                break;
            case (render.CYCLES):
                setNumCycles((oldNumCycles) => oldNumCycles - 1);
                break;
        }
    }

    const startTimer = function() {
        if (intervalId !== undefined) {
            return;
        }
        const decrementTimer = function() {
            switch(whichState) {
                case(state.WORK):
                    setWorkTime((oldTime) => oldTime - 1);
                    break;
                case(state.SHORT):
                    setShortBreak((oldTime) => oldTime - 1);
                    break;
                case(state.LONG):
                    setLongBreak((oldTime) => oldTime - 1);
                    break;
            } 
        }

        setIntervalId(setInterval(decrementTimer, 1000));
    }

    const stopTimer = function() {
        clearInterval(intervalId);
        setIntervalId(undefined);
    }

    const changeState = async function() {
        await stopTimer();
        switch(whichState) {
            case(state.WORK):
                setWorkTime(10);
                if (numCycles == 1) {
                    setNumCycles(2);
                    setState(state.LONG);
                } else {
                    setNumCycles((oldNum) => oldNum - 1);
                    setState(state.SHORT);
                }
                break;
            case(state.SHORT):
                setShortBreak(3);
                setState(state.WORK);
                break;
            case(state.LONG):
                setLongBreak(5);
                setState(state.WORK);
                break;
        }
    }

    let Display;
    switch(whichRender) {
        case (render.WORK):
            Display = workTime;
            break;
        case (render.SHORT):
            Display = shortBreak;
            break;
        case (render.LONG):
            Display = longBreak;
            break;
        case (render.CYCLES):
            Display = numCycles;
            break;
    }

    return(
        <div>
            <div>
                <ButtonGroup>
                    <Button variant="dark" onClick={fnRenderWork}>Work Time</Button>
                    <Button variant="dark" onClick={fnRenderShort}>Short Break</Button>
                    <Button variant="dark" onClick={fnRenderLong}>Long Break</Button>
                    <Button variant="dark" onClick={fnRenderCycles}>Cycles</Button> 
                </ButtonGroup>
            </div>
                {Display}
            <div>
                <Button variant="dark" onClick={startTimer}>Start</Button>
                <Button variant="dark" onClick={stopTimer}>Stop</Button>
                <Button variant="dark">Reset</Button>
                <Button variant="dark" onClick={add}>+</Button>
                <Button variant="dark" onClick={minus}>-</Button>            
            </div>
        </div>
    );
}

export default PomodoroTimer;