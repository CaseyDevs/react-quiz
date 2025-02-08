import { useState, useEffect } from 'react';

export default function ProgressBar({ timer }) {
    const [remainingTime, setRemainingTime] = useState(timer);

    // on mount, set an interval to update the remaining time every 10ms
    useEffect(() => {
        // Update the remaining time every 10ms
        const interval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 10);
        }, 10);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);
    
    return (
        <progress value={remainingTime} max={timer} />
    );
}