import { Card, CardContent, CardHeader, Chip, Typography } from "@mui/material";
import { useGroupCardViewModel } from "../../viewmodels/useGroupCardViewModel";
import { Building2, Pen, Trash2 } from "lucide-react";
import "../../assets/scss/components/GroupCard.scss";
import { deleteGroupCard } from "../../services/groupCard.services";
import MyButton from "../ui/Button";
import { useState } from "react";
import ConfirmDialog from "../ui/ConfirmDialog";
import { mappingGroupResponseToRequest, type groupCardRequest, type groupCardResponse } from "../../models/groupCard.model";

type props = {
  groupFormState: {
    open: boolean;
    mode: "add" | "edit";
    group: groupCardResponse | null;
  };
  handleGroupFormOpen: (
    mode: "add" | "edit",
    group?: groupCardResponse,
  ) => void;
  handleGroupFormClose: () => void;
};
export const GroupCard = ({
  handleGroupFormOpen,
  handleGroupFormClose,
  groupFormState,
}: props) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  const { group } = useGroupCardViewModel();

  const handleDeleteClick = (id: number) => {
    setSelectedGroupId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedGroupId !== null) {
      await deleteGroupCard(selectedGroupId);
      setOpenConfirm(false);
      setSelectedGroupId(null);
    }
  };
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
                  <MyButton
                    text=""
                    startIcon={<Pen size={17} style={{ marginLeft: "10px" }} />}
                    variant="outlined"
                    customVariant="ghost"
                    onClick={() => {
                      if (group) handleGroupFormOpen("edit", group);
                    }}
                  />
                  <MyButton
                    text=""
                    startIcon={
                      <Trash2
                        size={17}
                        color="red"
                        style={{ marginLeft: "10px" }}
                      />
                    }
                    variant="outlined"
                    customVariant="ghost"
                    onClick={() => handleDeleteClick(group.id)}
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
                        label={groupMember.memberName}
                        className="member-chip"
                        key={groupMember.memberId}
                      ></Chip>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      <ConfirmDialog
        open={openConfirm}
        title="Delete Group"
        content={`Are you sure you want to delete "${
          group.find((g) => g.id === selectedGroupId)?.groupName || ""
        }"?`}
        text="Delete"
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setOpenConfirm(false);
          setSelectedGroupId(null);
        }}
      />
    </div>
  );
};
