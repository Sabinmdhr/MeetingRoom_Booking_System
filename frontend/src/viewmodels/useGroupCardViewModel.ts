import type { groupCard } from "../models/groupCard.model";
import { demoGroupCards } from "../services/groupCard.services";
import { useState } from "react";

export const useGroupCardViewModel= () =>  {
const [group, setGroup] = useState<groupCard[]>(demoGroupCards());

return{
  group, setGroup
}

}