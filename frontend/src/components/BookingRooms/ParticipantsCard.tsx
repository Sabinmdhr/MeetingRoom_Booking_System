import {
  Card,
  Typography,
  Tab,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import "../../assets/scss/components/ParticipantsCard.scss";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { UserPlus, Search } from "lucide-react";
import type { Participants } from "../../models/participants.model";
import { DemoParticipants } from "../../services/participants.service";
import { useparticipantsViewModel } from "../../viewmodels/useParticipantsViewModel";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";

interface ParticipantsCardProps {
  type: "internal" | "external"| "";
  displayOn: "participant" | "book-room" | "calendar";
}

const ParticipantsCard = ({ type, displayOn }: ParticipantsCardProps) => {
  const [tabValue, setTabValue] = useState("people");
  const [participants, setParticipants] = useState<Participants[]>([]);


  const [search, setSearch] = useState("");
  const [externalName, setExternalName] = useState("");
  const [externalEmail, setExternalEmail] = useState("");
  // const { selectedParticipants, setSelectedParticipants } =
  //   useparticipantsViewModel();
// const {selectedParticipants, setSelectedParticipants} = useparticipantsViewModel();
  useEffect(() => {
    const data = DemoParticipants();
    setParticipants(data);
  }, []);

const {handleToggle} = useparticipantsViewModel();
const {selectedParticipants} = useAppSelector((state)=> state.participants)
  const filteredParticipants = participants.filter(
    (p) =>
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()),
  );

  // const handleSelectParticipant = (id: string) => {
  //   setSelectedParticipants((prev) =>
  //     prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
  //   )
  // };

  const handleAddExternal = () => {
    if (!externalName || !externalEmail) return;

    console.log({
      name: externalName,
      email: externalEmail,
    });

    setExternalName("");
    setExternalEmail("");
  };

  return (
    <>
      {displayOn == "book-room" && (
        <Card className="participants-card">
          {type === "internal" && (
            <div className="internal-participants">
              <Typography className="group-title">Group by</Typography>
              <TabContext value={tabValue}>
                <TabList
                  onChange={(e, value) => setTabValue(value)}
                  className="participants-tabs"
                >
                  <Tab label="People" value="people" />
                  <Tab label="Teams" value="teams" />
                  <Tab label="All" value="all" />
                </TabList>

                <TabPanel value="people" className="tab-panel">
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search size={18} color="gray" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <div className="participants-list">
                    {filteredParticipants.map((p) => (
                      <div
                        key={p.id}
                        className={`participant-item ${
                          selectedParticipants.includes(p.id) ? "selected" : ""
                        }`}
                        onClick={() => handleToggle(p.id)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedParticipants.includes(p.id)}
                          onChange={() => handleToggle(p.id)}
                        />

                        <div className="participant-info">
                          <Typography className="name">{p.fullName}</Typography>
                          <Typography className="email">{p.email}</Typography>
                          <Typography className="department">
                            {p.department}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>

                <TabPanel value="teams">Teams view</TabPanel>

                <TabPanel value="all">All participants</TabPanel>
              </TabContext>
            </div>
          )}

          {type === "external" && (
            <div className="external-members">
              <div className="external-header">
                <UserPlus size={18} />
                <Typography>Add External Member</Typography>
              </div>

              <TextField
                label="Name *"
                fullWidth
                size="small"
                placeholder="Enter external member name"
                value={externalName}
                onChange={(e) => setExternalName(e.target.value)}
              />
              <TextField
                label="Email *"
                fullWidth
                size="small"
                placeholder="Enter external member email"
                value={externalEmail}
                onChange={(e) => setExternalEmail(e.target.value)}
              />

              <div className="external-note">
                <Typography>
                  <b>Note:</b> External members will be tracked separately in
                  reports and won't affect internal dashboard statistics.
                </Typography>
              </div>

              <div className="external-buttons">
                <Button
                  className="participants-btn"
                  fullWidth
                  onClick={handleAddExternal}
                  startIcon={<UserPlus size={18} />}
                >
                  Add External Member
                </Button>
                <Button
                  className="participants-btn"
                  onClick={() => {
                    setExternalName("");
                    setExternalEmail("");
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* -----------------------------------------------------Participant_list to show in AddNewGroup-From ------------------------------ */}

      {displayOn == "participant" && (
        <div>
          {" "}
          <label htmlFor="searchField">Select Members ({selectedParticipants.length} selected) </label>
          <TextField
            fullWidth
            id="searchField"
            className="customTextField search-field"
            size="small"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={14} color="gray" />
                </InputAdornment>
              ),
            }}
          />
          <div className={`participants-list `}>
            {filteredParticipants.map((p) => (
              <div
                key={p.id}
                className={`participant-item ${
                  selectedParticipants.includes(p.id) ? "selected" : ""
                }   `}
                onClick={() => handleToggle(p.id)}
              >
                <input
                  // color="red"
                  className="check"
                  type="checkbox"
                  checked={selectedParticipants.includes(p.id)}
                  onChange={() => handleToggle(p.id)}
                />

                <div className="participant-info">
                  <Typography variant="subtitle2" className="name">
                    {p.fullName}
                  </Typography>
                  <div className="participant-Subinfo">
                    <Typography className="department">
                      {p.department}
                    </Typography>
                    &bull;
                    <Typography className="role">{p.role}</Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {displayOn == "calendar" && (
          <div>
            <Typography>{filteredParticipants.length} Participants</Typography>
            <div className={`participants-list `}>
              {filteredParticipants.map((p) => (
                <div
                  key={p.id}
                  className={`participant-item ${
                    selectedParticipants.includes(p.id) ? "selected" : ""
                  }   `}
                >


                  <div className="participant-info">
                    <Typography variant="subtitle2" className="name">
                      {p.fullName}
                    </Typography>
                    <div className="participant-Subinfo">
                      <Typography className="department">
                        {p.email}
                      </Typography>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      )}
    </>
  );
}

export default ParticipantsCard;
