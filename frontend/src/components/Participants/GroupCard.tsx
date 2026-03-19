import { Card, CardContent, CardHeader, Chip, Typography } from "@mui/material";
import { useGroupCardViewModel } from "../../viewmodels/useGroupCardViewModel";
import { Building2, Pen, Trash2 } from "lucide-react";
import "../../assets/scss/components/GroupCard.scss";
import { useAddGroupViewModel } from "../../viewmodels/useAddGroupViewModel";

export const GroupCard = ({ editMode }: { editMode: boolean }) => {
  const { group } = useGroupCardViewModel();
  const {handleEditGroup} = useAddGroupViewModel()
  // const { handleEditGroup } = useAddGroupViewModel();
  return (
    <div className="groupCard-Container">
      {group.map((group, index) => {
        const numOfMembers = group.groupMembers.length;
        return (
          <Card className="groupCard" key={index}>
            <CardHeader
              className="groupCard-title"
              title={
                <div className="title-wrapper">
                  <Building2 size={22} color="#155DFC" />
                  <span className="title-text">{group.groupName}</span>
                </div>
              }
              action={
                editMode && (
                  <div className="title-icons">
                    <Pen size={17} onClick={()=>handleEditGroup(group)} />
                    <Trash2 size={17} color="red" />
                  </div>
                )
              }
              subheader={<span className="subtitle">{group.description}</span>}
            ></CardHeader>
            <CardContent>
              <Typography className="group-info">
                <span>Members: {numOfMembers}</span>
                <span>Created: {group.createdAt}</span>
              </Typography>
              <div className="group-members">
                <div className="text">Group Members:</div>
                <div className="members">
                  {group.groupMembers.map((groupMember, index) => {
                    return (
                      <Chip
                        label={groupMember}
                        className="member-chip"
                        key={index}
                      ></Chip>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
