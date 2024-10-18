import { useEffect, useState } from "react";
import sound from "./sounds/alarm.mp3";

const Timer = () => {
    const [defaultTime] = useState(300);
    
    const [prevTime, setPrevTime] = useState(Date.now());
    const [time, setTime] = useState(defaultTime);
    const [seconds, setSeconds] = useState("00");
    const [minutes, setMinutes] = useState("05");
    const [hours, setHours] = useState("00");

    const [state, setState] = useState(-1);
    const [toggleText, setToggleText] = useState("Start");

    const [alarmSound] = useState(new Audio(sound));
    const [mute, setMute] = useState(false);

    const alarm = () => {
        setState(2);
        setToggleText("Stop");
        alarmSound.play();
    };

    const reset = () => {
        setState(-1);
        setTime(defaultTime);
        normalizeUtility(defaultTime);
        toggle(1);
    };

    const toggle = (currentState) => {
        if (currentState > 0) {
            setState(-1);
            setToggleText("Start");
            alarmSound.pause();
        } else {
            setState(1);
            setToggleText("Pause");
        }
    };

    const normalizeUtility = (t) => {
        setHours(("0" + Math.floor((t / 3600)).toString()).slice(-2));
        setMinutes(("0" + Math.floor((t / 60) % 60).toString()).slice(-2));
        setSeconds(("0" + Math.floor(t % 60).toString()).slice(-2));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const dt = (Date.now() - prevTime) / 1000;
            
            if (state === 1) {
                normalizeUtility(time);
                setTime(time - dt);

                if (time < 1) {
                    alarm();
                }
            }
            
            setPrevTime(Date.now());
        }, 50);

        return () => clearInterval(interval);
    });

    const normalize = () => {
        const newTime = parseInt(seconds) + parseInt(minutes)*60 + parseInt(hours)*3600;
        setTime(newTime);
        normalizeUtility(newTime);
    };

    const setValue = (input, current) => {
        let result = (current + input).slice(-2);

        return result;
    };

    const ignore = (event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    };

    return (
        <>
            <div>
                <div className="font-bold text-6xl">
                    <input onKeyDown={ignore} disabled={state > 0 ? "disabled" : ""} onBlur={normalize} onInput={(event) => setHours(setValue(event.target.value, hours))}     value={hours}   className={"transition duration-100 bg-neutral-900 border-b-2 outline-none inline-block w-20 ml-4 mr-4 " + (state < 0 ? "border-neutral-700 text-neutral-400" : "border-neutral-900")} />
                    <input onKeyDown={ignore} disabled={state > 0 ? "disabled" : ""} onBlur={normalize} onInput={(event) => setMinutes(setValue(event.target.value, minutes))} value={minutes} className={"transition duration-100 bg-neutral-900 border-b-2 outline-none inline-block w-20 ml-4 mr-4 " + (state < 0 ? "border-neutral-700 text-neutral-400" : "border-neutral-900")} />
                    <input onKeyDown={ignore} disabled={state > 0 ? "disabled" : ""} onBlur={normalize} onInput={(event) => setSeconds(setValue(event.target.value, seconds))} value={seconds} className={"transition duration-100 bg-neutral-900 border-b-2 outline-none inline-block w-20 ml-4 mr-4 " + (state < 0 ? "border-neutral-700 text-neutral-400" : "border-neutral-900")} />
                </div>
            </div>

            <div className="mt-24 flex gap-4 justify-center">
                <button onClick={reset} className="transition duration-200 py-2 px-12 rounded-3xl border-2 hover:bg-indigo-200 hover:border-indigo-200 hover:text-neutral-700 border-indigo-300">Reset</button>
                <button onClick={() => toggle(state)} className="transition duration-200 py-2 px-12 rounded-3xl border-2 hover:bg-indigo-200 hover:border-indigo-200 border-indigo-300 bg-indigo-300 text-neutral-700">{toggleText}</button>
            </div>
        </>
    );
};

export default Timer;
