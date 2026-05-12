import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import { Plus } from "lucide-react";
import "../../assets/scss/components/AddMeetingRoom-Form.scss";
import { useEffect, useState } from "react";
import type { meeting_rooms } from "../../models/meeting_room.model";
import MyButton from "../ui/Button";
import { useMeetingCardViewModel } from "../../viewmodels/useMeeting_roomCardViewModel";
import {
  addMeetingResources,
  EditMeetingRoom,
  getMeetingRoomResources,
} from "../../services/Meetinf_room.service";

type props = {
  roomFormState: {
    open: boolean;
    mode: "add" | "edit";
    room: meeting_rooms | null;
  };
  handleRoomFormOpen: (mode: "add" | "edit", room?: meeting_rooms) => void;
  handleRoomFormClose: () => void;
};
export const AddMeetingRoomForm = ({
  roomFormState,
  handleRoomFormOpen,
  handleRoomFormClose,
}: props) => {
  // const { handleClose } = useAddRoomViewModel();
  // const { isEditOpen } = useAppSelector((state) => state.meetingRoom);

  const {
    addRoomFormData,
    setAddRoomFormData,
    handleChange,
    handleCheckboxChange,
    submitAddRomForm,
    setRoomFormState,
    refresh,
    fetchMeeting,
    fetchMeetingRoomResources,
    roomResources,
    setAddResourceMode,
    addResourceMode,
  } = useMeetingCardViewModel();
  // const {
  //   addMeetingFormData,
  //   setAddMeetingFormData,
  //   selectedRoom,
  //   setSelectedRoom,
  //   setRoomFormState,
  //   handleRoomFormOpen,
  // } = useMeetingCardViewModel();
  // useEffect(() => {
  //   fetchMeeting();
  // }, [refresh]);

  const [meetingTypeName, setMeetingTypeName] = useState("");
  useEffect(() => {
    fetchMeetingRoomResources();
  }, [meetingTypeName]);
  useEffect(() => {
    if (roomFormState.mode === "edit" && roomFormState.room) {
      setAddRoomFormData({
        // id: roomFormState.room.id,
        roomName: roomFormState.room.roomName,
        capacity: roomFormState.room.capacity,
        resourcesIds: roomFormState.room.resources.map((r) => r.id),
      });
    } else {
      setAddRoomFormData({
        // id: "",
        roomName: "",
        capacity: 0,
        resourcesIds: [],
      });
    }
  }, [roomFormState.room]);

  return (
    <div className="add-Form">
      <MyButton
        startIcon={<Plus size={17} />}
        text="Add Meeting Room"
        // className="add-btn"
        customVariant="dark"
        variant="outlined"
        onClick={() => handleRoomFormOpen("add")}
        className=""
      />

      <Dialog
        open={roomFormState.open}
        maxWidth="sm"
        fullWidth
        onClose={() => handleRoomFormClose()}
        // onClose={() => setOpen((prev) => (prev = !prev))}
        slotProps={{ paper: { className: "Form__Container" } }}
      >
        <DialogTitle className="title">
          {roomFormState.mode === "add" ? "Add a New Room" : "Edit Room"}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            {/* TextFields */}

            <label htmlFor="roomName">Room Name</label>
            <TextField
              fullWidth
              id="roomName"
              name="roomName"
              placeholder="Room Name"
              className="customTextField"
              value={addRoomFormData.roomName}
              onChange={handleChange}
            />

            <label htmlFor="capacity">Capacity</label>
            <TextField
              fullWidth
              id="capacity"
              name="capacity"
              // type="number"
              placeholder="Number of People"
              className="customTextField"
              value={addRoomFormData.capacity}
              onChange={handleChange}
            />

            {/* Checkboxes in 2 columns */}
            <FormGroup>
              <Grid container>
                {roomResources.map((resource) => (
                  <Grid
                    size={6}
                    key={resource.id}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={resource.id}
                          onChange={handleCheckboxChange}
                          checked={addRoomFormData.resourcesIds.includes(
                            resource.id,
                          )}
                        />
                      }
                      label={resource.name}
                    />
                  </Grid>
                ))}
              </Grid>
              <hr />
              {!addResourceMode && (
                <MyButton
                  text="Add Resources"
                  customVariant="ghost"
                  onClick={() => setAddResourceMode(true)}
                />
              )}
              {addResourceMode && (
                <div className="add-resource-section">
                  <label htmlFor="resourceName">Write Name for Resource</label>
                  <div className="add-resource-form">
                    <TextField
                      id="resourceName"
                      fullWidth
                      placeholder="Resource Name"
                      className="customTextField"
                      value={meetingTypeName}
                      onChange={(e) => setMeetingTypeName(e.target.value)}
                    />
                    <MyButton
                      text="Cancel"
                      customVariant="ghost"
                      onClick={() => {
                        setAddResourceMode(false);
                      }}
                    />{" "}
                    <MyButton
                      text="Submit"
                      customVariant="dark"
                      onClick={() => {
                        addMeetingResources(meetingTypeName);
                        setMeetingTypeName("");
                        getMeetingRoomResources();
                      }}
                    />
                  </div>
                </div>
              )}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <MyButton
            customVariant="dark"
            text={roomFormState.mode == "edit" ? "Edit" : "Add"}
            onClick={async () => {
              const success = await (roomFormState.mode == "edit" &&
              roomFormState.room?.id
                ? EditMeetingRoom(roomFormState.room?.id, addRoomFormData)
                : submitAddRomForm());
              if (success) handleRoomFormClose();
            }}
          ></MyButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
