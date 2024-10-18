import { useState } from "react";

const Timer = () => {
    // const [seconds, setSeconds] = useState("00");
    // const [minutes, setMinutes] = useState("00");
    // const [hours, setHours] = useState("00");

    const input = (event) => {
        console.log(event.target.value)
    };

    return (
        <>
            <div>
                <div className="font-bold text-6xl">
                    <input pattern="[0-9]" onInput={input} placeholder="00" className="placeholder-neutral-700 bg-neutral-800 border-none outline-none inline-block w-20 ml-4 mr-4" />
                    <input pattern="[0-9]" onInput={input} placeholder="00" className="placeholder-neutral-700 bg-neutral-800 border-none outline-none inline-block w-20 ml-4 mr-4" />
                    <input pattern="[0-9]" onInput={input} placeholder="00" className="placeholder-neutral-700 bg-neutral-800 border-none outline-none inline-block w-20 ml-4 mr-4" />
                </div>
            </div>

            <div className="mt-24 flex gap-4 justify-center">
                <button className="transition duration-200 py-2 px-12 rounded-3xl border-2 hover:bg-indigo-200 hover:border-indigo-200 hover:text-neutral-700 border-indigo-300">Reset</button>
                <button className="transition duration-200 py-2 px-12 rounded-3xl border-2 hover:bg-indigo-200 hover:border-indigo-200 border-indigo-300 bg-indigo-300 text-neutral-700">Start</button>
            </div>
        </>
    );
};

export default Timer;
