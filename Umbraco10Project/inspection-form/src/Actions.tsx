import { GlobalState } from "little-state-machine";

export const UpdateRequestNumber = (
  state: GlobalState,
  newRequestNumber: string,
) => {
  return {
    ...state,
    newRequestNumber,
  };
};
