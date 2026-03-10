import { Card, Typography, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

interface ParticipantsCardProps {
  type: "internal" | "external";
}
const ParticipantsCard = ({ type }: ParticipantsCardProps) => {
    const [tabValue, setTabValue] = useState("");

  return (
    <Card
      sx={{
        mt: 2,
        p: 1,
        borderRadius: 2,
        boxShadow: "none",
        border: "3px solid",
        borderColor: "divider",
        bgcolor: "#F3F3F5",
      }}
    >
        {type === "internal" &&(
          <div>
            <Typography>Group by</Typography>
                    <TabContext value={tabValue}>
                      <TabList
                        onChange={(e, value) => {
                          debugger;
                          setTabValue(value);
                        }}
                        aria-label="disabled tabs example"
                      >
                        <Tab label="All" value="all" />
                        <Tab label="Teams" value="teams" />
                        <Tab label="People" value="people" />
                      </TabList>
                      <TabPanel value="all">Selected all</TabPanel>
                      <TabPanel value="teams">Selected teams</TabPanel>
                      <TabPanel value="people">Selected people</TabPanel>
                    </TabContext>
                  </div>            
        )}

        {type=== "external" &&(
            <div>
                <Box sx={{display: 'flex', gap:1}}>
                <PersonAddAltOutlinedIcon /><Typography>Add External Member</Typography>
                </Box>
            </div>
        )}
    </Card>
  );
};

export default ParticipantsCard;
