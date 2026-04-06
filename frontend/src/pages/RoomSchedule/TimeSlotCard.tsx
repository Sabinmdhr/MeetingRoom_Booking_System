interface TimeProps{
    start: string | null;
    end: string | null;
    duration: number;
}

const TimeSlotCard = ({start, end, duration}: TimeProps) =>{
    if(!start || !end) 
        return null;

    return(
        <div className="timeslotcard">
            {duration < 30 && (
                <div className="warning">
                    Short Duration Detected({duration} minutes)
                </div>  
            )}
            <div>
                <p>Start: {start}</p>
                <p>End: {end}</p>
            </div> 
        </div>
    )
}
export default TimeSlotCard;