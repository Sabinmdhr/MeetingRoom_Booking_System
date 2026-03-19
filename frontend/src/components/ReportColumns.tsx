import { Button, Drawer, Typography, Divider, IconButton } from "@mui/material";
import "../assets/scss/pages/ReportColumns.scss";
import { Eye, EyeOff, X } from "lucide-react";

type ColumnKey =
  | "status"
  | "room"
  | "title"
  | "start"
  | "end"
  | "duration"
  | "user"
  | "department"
  | "createdVia"
  | "createdAt";

const ReportColumns = ({ columns, setColumns, open, onClose }: any) => {
  const columnList: { key: ColumnKey; label: string }[] = [
    { key: "status", label: "Status" },
    { key: "room", label: "Room" },
    { key: "title", label: "Title" },
    { key: "start", label: "Start" },
    { key: "end", label: "End" },
    { key: "duration", label: "Duration" },
    { key: "user", label: "User" },
    { key: "department", label: "Department" },
    { key: "createdVia", label: "Created Via" },
    { key: "createdAt", label: "Created At" },
  ];

  const handleButton = (key: ColumnKey) => {
    setColumns((prev: { [x: string]: any }) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <div className="report-columns">
        <div className="report-columns__header">
          <Typography
            variant="body1"
            className="report-columns__title"
          >
            Customize Columns
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
          >
            <X size={18} />
          </IconButton>
        </div>

        <Divider />

        <section className="report-columns__buttons">
          {columnList.map((col) => (
            <Button
              key={col.key}
              className={columns[col.key] ? "active" : "inactive"}
              onClick={() => handleButton(col.key)}
              startIcon={
                columns[col.key] ? <Eye size={18} /> : <EyeOff size={18} />
              }
            >
              {col.label}
            </Button>
          ))}
        </section>
      </div>
    </Drawer>
  );
};

export default ReportColumns;
