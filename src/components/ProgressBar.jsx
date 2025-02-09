import { useState, useEffect, useRef } from 'react';

export default function ProgressBar({ timer, onTimerEnd }) {
    // State to track the remaining time in milliseconds
    const [remainingTime, setRemainingTime] = useState(timer);
    
    // Ref to track if timer has ended - no need to trigger re-renders when this value changes
    const hasTimerEnded = useRef(false);

    // Reset the timer and flag when moving to a new question
    useEffect(() => {
        setRemainingTime(timer);
        hasTimerEnded.current = false;
    }, [timer]);

    // Effect to handle the countdown timer
    useEffect(() => {
        let intervalId;
        
        if (remainingTime > 0) {
            intervalId = setInterval(() => {
                // Decrement the remaining time by 10ms
                setRemainingTime(prevTime => prevTime - 10);
            }, 10);
        }

        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, [remainingTime]);

    // Effect to handle when timer reaches zero
    useEffect(() => {
        if (remainingTime <= 10 && !hasTimerEnded.current) {
            hasTimerEnded.current = true;
            onTimerEnd(); // Notify parent component that time is up
        }
    }, [remainingTime, onTimerEnd]);
    
    // Render progress bar showing remaining time
    return (
        <progress value={remainingTime} max={timer} />
    );
}