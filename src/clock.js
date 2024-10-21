import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

const Clock = () => {
    const [,,,, ,,,, clockTime] = useOutletContext();

    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");

    const normalizeUtility = (t) => {
        setHours(("0" + Math.floor((t / 3600)).toString()).slice(-2));
        setMinutes(("0" + Math.floor((t / 60) % 60).toString()).slice(-2));
        setSeconds(("0" + Math.floor(t % 60).toString()).slice(-2));
    };

    useEffect(() => {
        normalizeUtility(clockTime);
    });

    return (
        <div className="font-bold text-6xl">
            <div className="pointer-events-none inline-block w-20 ml-4 mr-4">{hours}</div>
            <div className="pointer-events-none inline-block w-20 ml-4 mr-4">{minutes}</div>
            <div className="pointer-events-none inline-block w-20 ml-4 mr-4">{seconds}</div>
        </div>
    );
};

export default Clock;
