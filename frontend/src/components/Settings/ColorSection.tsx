import { Typography, IconButton, Paper, Box, TextField } from "@mui/material";
import "../../assets/scss/pages/Settings.scss";
import { SketchPicker, type ColorResult } from "react-color";
import { useSettingsViewModel } from "../../viewmodels/useSettingsViewModel";
import { Palette, Pen, Plus, X } from "lucide-react";
import MyButton from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";

export default function MeetingTypeColors() {
  const {
    meetingTypes,
    setMeetingTypes,
    activePickerId,
    setActivePickerId,
    handleColorChange,
    togglePicker,
    addMeetingType,
    pickerRef,
    openDialog,
    setOpenDialog,
    deleteMeetingType,
    selectedId,
    setSelectedId,
    editingId,
    setEditingId,
    handleUpdateMeetingType,
    addForm,
    setAddForm,
    openPicker,
    setOpenPicker,
    meetingTypeFormData,
    setMeetingTypeFormData,
  } = useSettingsViewModel();

  return (
    <Paper className="meeting-type-colors">
      <Typography className="meeting-type-colors__title">
        <Palette size={22} />
        Meeting Type Colors
      </Typography>
      <Typography variant="body2" className="meeting-type-colors__subheader">
        Customize the color scheme for different meeting types across the
        dashboard
      </Typography>

      {meetingTypes.map((item) => (
        <div className="meeting-type-colors__row" key={item.id}>
          <div className="meeting-type-colors__left">
            <div
              className="meeting-type-colors__color-preview"
              style={{
                backgroundColor: `rgb${item.colorCode}`,
              }}
            />
          </div>

          {editingId != item.id ? (
            <div className="meeting-type-colors__text">
              <Typography className="title">{item.name}</Typography>{" "}
              <div className="meeting-type-colors__right">
                <Box className="meeting-type-colors__outer-color-box">
                  <Box
                    className="meeting-type-colors__color-box"
                    onClick={() => togglePicker(item.id!)}
                    style={{
                      backgroundColor: `rgb${item.colorCode}`,
                    }}
                  />
                </Box>

                <IconButton
                  className="meeting-type-colors__outer-icon-box"
                  onClick={() => {
                    setEditingId(item.id);
                  }}
                >
                  <Pen size={18} />
                </IconButton>

                <IconButton
                  className="meeting-type-colors__outer-icon-box"
                  onClick={() => {
                    setSelectedId(item.id);
                    setOpenDialog(true);
                  }}
                >
                  <X size={18} color="red" />
                </IconButton>
              </div>
            </div>
          ) : (
            <>
              <div className="editable-meeting-type">
                <TextField
                  placeholder="Meeting type name"
                  value={item.name}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setMeetingTypes((prev) =>
                      prev.map((m) =>
                        m.id === item.id ? { ...m, name: newValue } : m,
                      ),
                    );
                  }}
                  size="small"
                  variant="outlined"
                  className="editable-meeting-type__input"
                />
                <Box className="editable-meeting-type__outer-color-box">
                  <Box
                    className="editable-meeting-type__color-box"
                    onClick={() => togglePicker(item.id!)}
                    style={{
                      backgroundColor: `rgb${item.colorCode}`,
                    }}
                  />
                </Box>
                <div className="meeting-type-color-btn">
                  <MyButton
                    className="meeting-type-colors-btn"
                    variant="contained"
                    customVariant="dark"
                    onClick={() => handleUpdateMeetingType(item)}
                    text="Save"
                  />
                  <MyButton
                    className="meeting-type-colors-btn"
                    variant="contained"
                    onClick={() => {
                      setEditingId(null);
                    }}
                    text="Cancel"
                    customVariant="ghost"
                  />
                </div>
              </div>
            </>
          )}

          <ConfirmDialog
            open={openDialog}
            title="Delete Meeting Type"
            content="Are you sure you want to delete this meeting type?"
            text="Delete"
            onConfirm={async () => {
              if (selectedId !== null) {
                await deleteMeetingType(selectedId);
                console.log("deleted");
              }
              setOpenDialog(false);
            }}
            onClose={() => {
              setOpenDialog(false);
            }}
          />

          {activePickerId === item.id && (
            <div className="meeting-type-colors__picker" ref={pickerRef}>
              <SketchPicker
                color={`${item?.colorCode}`}
                onChangeComplete={(color: ColorResult) => {
                  handleColorChange(item.id, color);
                }}
              />
            </div>
          )}
        </div>
      ))}

      {addForm && (
        <>
          <div className="meeting-type-colors__row">
            <div className="meeting-type-colors__left">
              <div
                className="meeting-type-colors__color-preview"
                style={{
                  backgroundColor: `rgb${meetingTypeFormData.colorCode}`,
                }}
              />
            </div>
            <div className="editable-meeting-type">
              <TextField
                placeholder="Meeting type name"
                value={meetingTypeFormData.name}
                onChange={(e) => {
                  setMeetingTypeFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
                size="small"
                variant="outlined"
                className="editable-meeting-type__input"
              />
              <Box className="editable-meeting-type__outer-color-box">
                <Box
                  className="editable-meeting-type__color-box"
                  onClick={() => setOpenPicker(!openPicker)}
                  style={{
                    backgroundColor: `rgb${meetingTypeFormData.colorCode}`,
                  }}
                />
              </Box>
              {addForm && openPicker && (
                <div className="meeting-type-colors__picker" ref={pickerRef}>
                  <SketchPicker
                    color={meetingTypeFormData.colorCode}
                    onChangeComplete={(color: ColorResult) => {
                      const { r, g, b } = color.rgb;
                      setMeetingTypeFormData((prev) => ({
                        ...prev,
                        colorCode: `(${r},${g},${b})`,
                      }));
                    }}
                  />
                </div>
              )}
              <div className="meeting-type-color-btn">
                <MyButton
                  className="meeting-type-colors-btn"
                  variant="contained"
                  customVariant="dark"
                  onClick={() => addMeetingType(meetingTypeFormData)}
                  text="Save"
                />
                <MyButton
                  className="meeting-type-colors-btn"
                  variant="contained"
                  onClick={() => {
                    setAddForm(false);
                  }}
                  text="Cancel"
                  customVariant="ghost"
                />
              </div>
            </div>
          </div>
        </>
      )}

      <div className="color-btn">
        <MyButton
          className="colors-btn"
          variant="contained"
          customVariant="ghost"
          onClick={() => {}}
          text="Reset to Defaults"
        />
        <MyButton
          className="colors-btn"
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => {
            setAddForm(!addForm);
            setOpenPicker(false);
          }}
          text="Add Meeting Type"
          customVariant="dark"
        />
      </div>
    </Paper>
  );
}
