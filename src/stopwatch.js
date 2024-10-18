import { useEffect, useState } from "react";

const Stopwatch = () => {
    const [prevTime, setPrevTime] = useState(Date.now());
    const [time, setTime] = useState(0);
    const [centiSeconds, setCentiSeconds] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const [minutes, setMinutes] = useState("00");

    const [state, setState] = useState(-1);
    const [toggleText, setToggleText] = useState("Start");

    const reset = () => {
        setTime(0);
        setCentiSeconds("00");
        setSeconds("00");
        setMinutes("00");
        setState(-1);
        setToggleText("Start");
    }

    const toggle = () => {
        setState(state * -1);
        
        if (state === 1) {
            setToggleText("Start");
        } else {
            setToggleText("Pause");
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const dt = (Date.now() - prevTime) / 10;

            if (state === 1) {
                setTime(time + dt);
            }
            
            setMinutes(("0" + Math.floor(time / 6000).toString()).slice(-2));
            setSeconds(("0" + Math.floor((time / 100) % 60).toString()).slice(-2));
            setCentiSeconds(("0" + Math.floor(time % 100).toString()).slice(-2));

            setPrevTime(Date.now());
        }, 10);

        return () => clearInterval(interval);
    });

    return (
        <>
            <div>
                <div className="font-bold text-6xl">
                    <div className="pointer-events-none inline-block w-20 ml-4 mr-4">{minutes}</div>
                    <div className="pointer-events-none inline-block w-20 ml-4 mr-4">{seconds}</div>
                    <div className="pointer-events-none inline-block w-20 ml-4 mr-4">{centiSeconds}</div>
                </div>
            </div>

            <div className="mt-24 flex gap-4 justify-center">
                <button onClick={reset} className="transition duration-200 py-2 px-12 rounded-3xl border-2 hover:bg-indigo-200 hover:border-indigo-200 hover:text-neutral-700 border-indigo-300">Reset</button>
                <button onClick={toggle} className="transition duration-200 py-2 px-12 rounded-3xl border-2 hover:bg-indigo-200 hover:border-indigo-200 border-indigo-300 bg-indigo-300 text-neutral-700">{toggleText}</button>
            </div>
        </>
    );
};

export default Stopwatch;
