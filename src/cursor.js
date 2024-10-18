import { useEffect, useState } from "react";

const Cursor = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    
    const reposition = (event) => {
        setX(event.clientX);
        setY(event.clientY);
    };

    useEffect (() => {
        window.addEventListener("mousemove", reposition);

        return () => window.removeEventListener("mousemove", reposition);
    });

    return (
        <div className="size-0 top-0 left-0 absolute overflow-hidden -translate-x-1/2 -translate-y-1/2 rounded-full glow" style={{top:y, left:x}}></div>
    );
};

export default Cursor;
