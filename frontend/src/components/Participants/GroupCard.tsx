import { Card, CardContent, CardHeader, Chip, Typography } from "@mui/material";
import { useGroupCardViewModel } from "../../viewmodels/useGroupCardViewModel"
import { Building2, Pen, Trash2 } from "lucide-react";
import "../../assets/scss/components/GroupCard.scss"

export const GroupCard= ({editMode}: {editMode: boolean} ) => {
const {group} = useGroupCardViewModel();

return(
<div className="groupCard-Container">
{group.map((group)=>{
  const numOfMembers = group.groupMemmbers.length;
 return (
   <Card className="groupCard">
     <CardHeader
       className="groupCard-title"
       title={
         <div className="title-wrapper">
           <Building2 size={22} color="#155DFC" />
           <span className="title-text">{group.groupName}</span>
         </div>
       }
       action={editMode &&

         <div className="title-icons">
           <Pen size={17} />
           <Trash2 size={17} color="red" />
         </div>
       }
       subheader={<span className="subtitle">{group.description}</span>}
     ></CardHeader>
     <CardContent>
       <Typography className="group-info">
         <span>Members: {numOfMembers}</span>
         <span>Created: {group.createdAt}</span>
       </Typography>
       <Typography className="group-members">
         <div className="text">Group Members:</div>
         <div className="members">
           {group.groupMemmbers.map((groupMember) => {
             return <Chip label={groupMember} className="member-chip"></Chip>;
           })}
         </div>
       </Typography>
     </CardContent>
   </Card>
 );
})}

</div>
)

}