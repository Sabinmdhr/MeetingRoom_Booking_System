// import type { TimeSlot } from "../../models/timeSlots.model"

// interface TimeGridProps{
//     slots: TimeSlot[];
//     onSelect: (start: string, end: string) => void;
// }

// const TimeSlotGrid = ({slots, onSelect}: TimeGridProps) => {
//   return (
//     <div className='TimeSlotGrid'>
//       {slots.map((slot, index) => (
//         <div
//           key={index}
//           className={`slot ${slot.available ? "available" : ""}`}
//           onClick={() =>
//             slot.available &&
//             onSelect(slot.start, slot.end)
//           }
//         >
//           {slot.start}
//         </div>
//       ))}
//     </div>
//   )
// }

// export default TimeSlotGrid
