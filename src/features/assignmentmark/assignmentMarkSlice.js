import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignmentInfo: {},
};

const assignmentMarkSlice = createSlice({
  name: "assignmentMarkSlice",
  initialState,
  reducers: {
    loadAssignmentInfo: (state, action) => {
      state.assignmentInfo = action.payload;
    },
  },
});

export default assignmentMarkSlice.reducer;
export const { loadAssignmentInfo } = assignmentMarkSlice.actions;
