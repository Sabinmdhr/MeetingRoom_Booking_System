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
import { useparticipantsViewModel } from "../../viewmodels/useParticipantsViewModel";

interface ParticipantsCardProps {
  type: "internal" | "external";
}

const ParticipantsCard = ({ type }: ParticipantsCardProps) => {
  // const [participants, setParticipants] = useState<Participants[]>([]);

  const {
    tabValue,
    setTabValue,
    selectedParticipants,
    handleSelectParticipant,
    search,
    setSearch,
    filteredParticipants,
    externalName,
    setExternalName,
    externalEmail,
    setExternalEmail,
    handleAddExternal,
  } = useparticipantsViewModel();

  return (
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
                    onClick={() => handleSelectParticipant(p.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedParticipants.includes(p.id)}
                      readOnly
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
            <UserPlus size={17} />
            <Typography className="header">Add External Member</Typography>
          </div>

          <div className="field">
          <label className="field-label" htmlFor="Name *">Name *</label>
          <TextField
            id="Name *"
            fullWidth
            size="small"
            placeholder="Enter external member name"
            value={externalName}
            onChange={(e) => setExternalName(e.target.value)}
          />

          <label className="field-label" htmlFor="Email *">Email *</label>
          <TextField
            id="Email *"
            fullWidth
            size="small"
            placeholder="Enter external member email"
            value={externalEmail}
            onChange={(e) => setExternalEmail(e.target.value)}
          />
          </div>

          <div className="external-note">
            <Typography className="note">
              <b><strong>Note:</strong></b> External members will be tracked separately in
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
  );
}

export default ParticipantsCard;
