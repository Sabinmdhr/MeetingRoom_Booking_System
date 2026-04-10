import { Card, CardContent, CardHeader, Chip, Typography } from "@mui/material";
import { useGroupCardViewModel } from "../../viewmodels/useGroupCardViewModel";
import { Building2, Pen, Trash2 } from "lucide-react";
import "../../assets/scss/components/GroupCard.scss";
import { useAddGroupViewModel } from "../../viewmodels/useAddGroupViewModel";
import { deleteGroupCard } from "../../services/groupCard.services";
export const GroupCard = () => {
  const { group } = useGroupCardViewModel();
  // const {handleEditGroup} = useAddGroupViewModel()
  // const { handleEditGroup } = useAddGroupViewModel();
  return (
    <div className="groupCard-Container">
      {group.map((group, index) => {
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
                <div className="title-icons">
                  <Pen size={17} />
                  <Trash2
                    size={17}
                    color="red"
                    onClick={() => {
                      deleteGroupCard(group.id);
                    }}
                  />
                </div>
              }
              subheader={<span className="subtitle">{group.description}</span>}
            ></CardHeader>
            <CardContent>
              <Typography className="group-info">
                <span>Members:</span>
                {/* <span>Created: {group.createdAt}</span> */}
              </Typography>
              <div className="group-members">
                <div className="text">Group Members:</div>
                <div className="members">
                  {group.members.map((groupMember, index) => {
                    return (
                      <Chip
                        label={groupMember.name}
                        className="member-chip"
                        key={groupMember.id}
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
