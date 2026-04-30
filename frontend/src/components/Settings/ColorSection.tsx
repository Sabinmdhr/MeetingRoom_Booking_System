// import { Card, Typography, Box, Paper } from "@mui/material";
// import "../../assets/scss/pages/Settings.scss";
// import { Palette } from "lucide-react";
// import MyButton from "../ui/Button";

// import { useState } from "react";
// import { SketchPicker } from "react-color";

// const ColorSection = () => {

//   return (
//     <>
//       <Paper className="third-card">
//         <Typography className="third-header">
//           <Palette size={22} />
//           Meeting Type Colors
//         </Typography>
//         <Typography variant="body2"
//           className="third-subheader">
//           Customize the color scheme for different meeting types across the
//           dashboard
//         </Typography>

//         <div className="settings-color">
//           <div className="color-item">
//             <div className="color-heading">
//               <Typography className="title">Internal Meetings</Typography>
//               <Typography className="subtitle">
//                 Team meetings, standups, reviews
//               </Typography>
//             </div>
//             <div className="color-container">
//               <Box className="color-picker"
//               sx={{backgroundColor: color}}
//               onClick={()=> setShowPicker(true)}>
//                 {showPicker && (
//                   <Box>
//                     <SketchPicker
//                     color={color}/>
//                   </Box>
//                 )}
//               </Box>
//             </div>
//           </div>
//           <hr />

//           <div className="color-item">
//             <div className="color">
//               <Typography className="title">Client Meetings</Typography>
//               <Typography className="subtitle">
//                 External client presentations
//               </Typography>
//             </div>
//           </div>
//           <hr />

//           <div className="color-item">
//             <div className="color">
//               <Typography className="title">Executive Meetings</Typography>
//               <Typography className="subtitle">
//                 Board meetings, leadership sessions
//               </Typography>
//             </div>
//           </div>

// <div className="color-btn">
//   <MyButton
//     variant="contained"
//     customVariant="ghost"
//     onClick={() => {}}
//     text="Reset to Defaults"
//   ></MyButton>
//   <MyButton
//     className="colors-btn"
//     variant="contained"
//     onClick={()=>{}}
//     text="Save Colors"
//     customVariant="dark"
//   ></MyButton>

// </div>
//         </div>
//       </Paper>
//     </>
//   );
// };

// export default ColorSection;

import { Typography, IconButton, Paper, Box } from "@mui/material";
import "../../assets/scss/pages/Settings.scss";
import { SketchPicker } from "react-color";
import { useSettingsViewModel } from "../../viewmodels/useSettingsViewModel";
import { Palette, Pen, Plus, X } from "lucide-react";
import MyButton from "../ui/Button";

export default function MeetingTypeColors() {
  const {
    meetingTypes,
    activePickerId,
    handleColorChange,
    togglePicker,
    saveMeetingType,
  } = useSettingsViewModel();

  return (
    <Paper className="meeting-type-colors">
      <Typography className="meeting-type-colors__title"><Palette size={22} />
        Meeting Type Colors
      </Typography>
      <Typography variant="body2"
          className="meeting-type-colors__subheader">
          Customize the color scheme for different meeting types across the
          dashboard
        </Typography>

      {meetingTypes.map((item) => (
        <div className="meeting-type-colors__row" key={item.id}>
          <div className="meeting-type-colors__left">
            <div
              className="meeting-type-colors__color-preview"
              style={{
                backgroundColor: `rgba(${item.color.r}, ${item.color.g}, ${item.color.b}, ${item.color.a})`,
              }}
            />

            <div className="meeting-type-colors__text">
              <Typography className="title">{item.name}</Typography>
              <Typography className="subtitle">{item.desc}</Typography>
            </div>
          </div>

          <div className="meeting-type-colors__right">
            <Box className="meeting-type-colors__outer-color-box">
              <Box
                className="meeting-type-colors__color-box"
                onClick={() => togglePicker(item.id!)}
                style={{
                  backgroundColor: `rgba(${item.color.r}, ${item.color.g}, ${item.color.b}, ${item.color.a})`,
                }}
              />
            </Box>

            <IconButton
              className="meeting-type-colors__outer-icon-box"
              onClick={() => saveMeetingType(item)}
            >
              <Pen size={18} />
            </IconButton>

            <IconButton className="meeting-type-colors__outer-icon-box">
              <X size={18} color="red" />
            </IconButton>

          </div>

          {activePickerId === item.id && (
            <div className="meeting-type-colors__picker">
              <SketchPicker
                color={item.color}
                onChange={(color) => handleColorChange(item.id!, color)}
              />
            </div>
          )}
        </div>
      ))}

      <div className="color-btn">
        <MyButton
          className="colors-btn"
          variant="contained"
          customVariant="ghost"
          onClick={() => {}}
          text="Reset to Defaults"
        ></MyButton>
        <MyButton
          className="colors-btn"
          variant="contained"
          startIcon={<Plus  size={18}/>}
          onClick={() => {}}
          text="Add Meeting Type"
          customVariant="dark"
        ></MyButton>
      </div>
    </Paper>
  );
}
