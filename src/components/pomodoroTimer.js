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

function PomodoroTimer() {
    const [workTime, setWorkTime] = useState(0);
    const [shortBreak, setShortBreak] = useState(0);
    const [longBreak, setLongBreak] = useState(0);
    const [numCycles, setNumCycles] = useState(0);
    const [whichRender, setRender] = useState();

    useEffect(() => {
        setWorkTime(1500);
        setShortBreak(300);
        setLongBreak(600);
        setNumCycles(4);
        setRender(render.WORK);
    }, []);

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
                <Button variant="dark">Start</Button>
                <Button variant="dark">Stop</Button>
                <Button variant="dark">Reset</Button>
                <Button variant="dark" onClick={add}>+</Button>
                <Button variant="dark" onClick={minus}>-</Button>            
            </div>
        </div>
    );
}

export default PomodoroTimer;