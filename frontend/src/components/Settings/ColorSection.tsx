import { Card, Typography } from "@mui/material";
import "../../assets/scss/pages/Settings.scss";
import { Palette } from "lucide-react";
import RoomSchedule from "../../pages/RoomSchedule/RoomSchedule";
import MyButton from "../ui/Button";

const ColorSection = () => {
  // const { openSchedule, handleOpen, handleClose } = useRoomScheduleViewModel();

  return (
    <>
      <Card className="third-card">
        <div className="third-header">
          <Palette size={22} />
          Meeting Type Colors
        </div>
        <Typography
          variant="body2"
          className="third-subheader"
        >
          Customize the color scheme for different meeting types across the
          dashboard
        </Typography>
        <div className="settings-color">
          <div className="color-item">
            <div className="color">
              <Typography className="title">Internal Meetings</Typography>
              <Typography className="subtitle">
                Team meetings, standups, reviews
              </Typography>
            </div>
          </div>
          <hr />

          <div className="color-item">
            <div className="color">
              <Typography className="title">Client Meetings</Typography>
              <Typography className="subtitle">
                External client presentations
              </Typography>
            </div>
          </div>
          <hr />

          <div className="color-item">
            <div className="color">
              <Typography className="title">Executive Meetings</Typography>
              <Typography className="subtitle">
                Board meetings, leadership sessions
              </Typography>
            </div>
          </div>

          <div className="color-btn">
            <MyButton
              // className="reset-btn"
              variant="contained"
              // size="small"
              customVariant="dark"
              onClick={() => {}}
              text="Reset to Defaults"
            ></MyButton>
            <MyButton
              className="colors-btn"
              variant="contained"
              // size="small"
              onClick={()=>{}}
              text="Save Colors"
              customVariant="dark"
            ></MyButton>
           
          </div>
        </div>
      </Card>
      {/* {openSchedule && <RoomSchedule onClose={handleClose} />} */}
    </>
  );
};

export default ColorSection;
