import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import sound from "./sounds/alarm.mp3";
import volumeUp from "./icons/volume_up.js";
import volumeOff from "./icons/volume_off.js";

const Layout = () => {
    const [clockTime, setClockTime] = useState(null);

    useEffect(() => {
        const fetchTime = async () => {
            try {
                let timeZone;

                try {
                    timeZone = (Intl.DateTimeFormat().resolvedOptions().timeZone).replace("/", "%2F");
                } catch (error) {
                    timeZone = "UTC";
                }

                const response = await fetch("https://timeapi.io/api/time/current/zone?timeZone=" + timeZone);
                const data = await response.json();
                const dateTime = new Date(data.dateTime);
                setClockTime(dateTime.getHours() * 3600 + dateTime.getMinutes() * 60 + dateTime.getSeconds());
            } catch (error) {
                console.error('Failed to fetch time;', error);
            }
        };

            fetchTime();
    }, []);

    const [timerState, setTimerState] = useState(-1);
    const [timerTime, setTimerTime] = useState(300);

    const [stopwatchState, setStopwatchState] = useState(-1);
    const [stopwatchTime, setStopwatchTime] = useState(0);

    const [prevTime, setPrevTime] = useState(Date.now());

    const [alarmSound] = useState(new Audio(sound));
    const [mute, setMute] = useState(false);

    alarmSound.loop = true;

    const toggleMute = () => {
        setMute(mute ? false : true);

        if (!mute) {
            alarmSound.volume = 0;
        } else {
            alarmSound.volume = 1;
        }
    };
    
    useEffect(() => {
        const interval = setInterval(() => {
            const dt = (Date.now() - prevTime);
            // console.log(timerState);
            
            setClockTime(clockTime + (dt / 1000));

            if (timerState === 1) {
                setTimerTime(timerTime - (dt / 1000));

                if (timerTime < 1) {
                    setTimerState(2);
                }
            }
            
            if (timerState !== 2) {
                alarmSound.pause();
            } else {
                alarmSound.play();
            }
            
            if (stopwatchState === 1) {
                setStopwatchTime(stopwatchTime + (dt / 10));
            }

            setPrevTime(Date.now());
        }, 10);

        return () => clearInterval(interval);
    });

    return (
        <div className="absolute 2xl left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 h-3/4">

            <nav className="bg-neutral-900 text-neutral-300 border-neutral-700 border-2 rounded-3xl p-1 flex gap-2 justify-center my-6">
                <Link className={"transition duration-200 border-2 border-neutral-900 py-2 px-16 rounded-3xl " + (useLocation().pathname === '/' ? "bg-indigo-200 text-neutral-700" : "hover:border-neutral-700")} to="/">Clock</Link>
                <Link className={"transition duration-200 border-2 border-neutral-900 py-2 px-16 rounded-3xl " + (useLocation().pathname === '/timer' ? "bg-indigo-200 text-neutral-700" : "hover:border-neutral-700")} to="/timer">Timer</Link>
                <Link className={"transition duration-200 border-2 border-neutral-900 py-2 px-16 rounded-3xl " + (useLocation().pathname === '/stopwatch' ? "bg-indigo-200 text-neutral-700" : "hover:border-neutral-700")} to="/stopwatch">Stopwatch</Link>
            </nav>
            
            <div className="bg-neutral-900 text-neutral-300 border-neutral-700 border-2 rounded-3xl px-8 py-24 text-center">
                <svg onClick={toggleMute} fill="#404040" height="40px" width="40px" viewBox="0 -960 960 960" className="transition duration-200 absolute right-8 top-32 cursor-pointer border-2 rounded-3xl border-neutral-900 hover:border-neutral-700">
                    <path d={mute ? volumeOff : volumeUp} />
                </svg>

                <Outlet context={[timerState, setTimerState, timerTime, setTimerTime, stopwatchState, setStopwatchState, stopwatchTime, setStopwatchTime, clockTime]} />
            </div>
        </div>
    );
};

export default Layout;
