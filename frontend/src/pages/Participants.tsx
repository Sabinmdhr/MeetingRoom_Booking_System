import "../assets/scss/pages/Participants.scss";
import "../assets/scss/global.scss";
import { FolderPlus, SquarePen, Users } from "lucide-react";
import { ParticipantsTable } from "../components/Participants/Participants-Table";
import { Button, Card, CardContent, CardHeader, Chip } from "@mui/material";
import { useState } from "react";
import { AddParticipantsForm } from "../components/Participants/AddParticipants-Form";
import { useAddParticipantsViewModel } from "../viewmodels/useAddParticipantsViewModel";
import { GroupCard } from "../components/Participants/GroupCard";
import { AddGroupForm } from "../components/Participants/AddGroup-Form";
import { useGroupCardViewModel } from "../viewmodels/useGroupCardViewModel";
const Participants = () => {
  const [editMode, setEditMode] = useState(false);
  const { open } = useAddParticipantsViewModel();
  const { numOfGroup } = useGroupCardViewModel();
  const [activeTab, setActiveTab] = useState<"Tab1" | "Tab2">("Tab1");
  return (
    <div>
      <div className="titleDesc">
        <span className="title">Participants Management</span>
        <span className="desc">
          Manage participants and create custom groups for meetings
        </span>
      </div>
      <div className="tabs">
        <div
          className={`participants-tab ${activeTab == "Tab1" ? `active` : ``}`}
          onClick={() => setActiveTab("Tab1")}
        >
          <Users size={16} /> <span>All Participants</span>
        </div>
        <div
          className={`participants-tab ${activeTab == "Tab2" ? `active` : ``}`}
          onClick={() => setActiveTab("Tab2")}
        >
          <FolderPlus size={16} /> <span>Custom Groups  <Chip label={numOfGroup}></Chip></span>
        </div>
      </div>

      {/* ------------------------Edit Mode Button------------ */}
      <div>

        {activeTab == "Tab1" ? (
          <AddParticipantsForm />
        ) : (
        <AddGroupForm />
        )}
      </div>

      {activeTab == "Tab1" ? (
        <div className="participants-container">

              <div className="participants-table">
                <ParticipantsTable  />
              </div>
           
        </div>
      ) : (
        <div>
          <GroupCard editMode={editMode} />
        </div>
      )}
    </div>
  );
};

export default Participants;
