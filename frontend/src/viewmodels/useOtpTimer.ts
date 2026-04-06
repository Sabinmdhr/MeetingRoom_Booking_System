import { useEffect, useState } from "react"

export const useOtpTimer = () => {
    const[timer, setTimer] = useState(0);
    const[attempt, setAttempt] = useState(0);

    useEffect(() =>{
        if(timer <= 0) return;

        const interval = setInterval(() =>{
            setTimer(timer - 1);
        },1000)

        return() => clearInterval(interval);       
    }, [timer])

    const startTimer=() =>{
        const newAttempt= attempt + 1;
        setAttempt(newAttempt);

        const newTime= newAttempt * 20;
        setTimer(newTime);
    }

    return{
        timer,
        startTimer,
        isActive: timer > 0
    }
}
