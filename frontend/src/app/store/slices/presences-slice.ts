import { createSlice } from "@reduxjs/toolkit";
import { Presence, UserPos } from "../../../types";

const presencesSlice = createSlice({
  name: "presences",
  initialState: {
    presenceArr: [] as Presence[],
  },
  reducers: {
    addPresence(state, action) {
      const { _id, userName, currPos } = action.payload;

      if (currPos?.start?.line === -1) {
        presencesSlice.caseReducers.removeUser(state, action);
        return;
      }

      let presenceObj = state.presenceArr.find(
        (presence: Presence) => presence._id === _id
      );

      if (presenceObj) {
        const user = presenceObj.users.find(
          (u: UserPos) => u.userName === userName
        );
        if (user) {
          user.currPos = currPos;
        } else {
          presenceObj.users.push({ userName, currPos });
        }
      } else {
        state.presenceArr.push({
          _id,
          users: [{ userName, currPos }],
        });
      }
    },
    removeUser(state, action) {
      const { _id, userName } = action.payload;

      const presenceObj = state.presenceArr.find(
        (presence: Presence) => presence._id === _id
      );

      if (presenceObj) {
        presenceObj.users = presenceObj.users.filter(
          (u: UserPos) => u.userName !== userName
        );
      }
    },
  },
});

export const presencesActions = presencesSlice.actions;

export default presencesSlice;
