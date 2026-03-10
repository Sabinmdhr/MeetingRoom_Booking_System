import "../assets/scss/pages/Participants.scss";
import "../assets/scss/global.scss";
import { FolderPlus, SquarePen, Users } from "lucide-react";
import { ParticipantsTable } from "../components/Participants/Participants-Table";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
const Participants = () => {
  return (
    <div>
      <div className="titleDesc">
        <span className="title">Participants Management</span>
        <span className="desc">
          Manage participants and create custom groups for meetings
        </span>
      </div>
      <div className="tabs">
        <div className="participants-tab">
          <Users size={16} /> <span>All Participants</span>
        </div>
        <div className="group-tab">
          <FolderPlus size={16} /> <span>Custom Groups</span>
        </div>
      </div>
      <Button className="edit-btn" variant="outlined">
<SquarePen size={14}/>        Edit Mode
      </Button>
      <div className="participants-container">
        <Card>
          <CardHeader title="Participants Direntory" />
          <CardContent>
            {/* <div className="searchBar">Search</div> */}
            <div className="participants-table">
              <ParticipantsTable />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Participants;
