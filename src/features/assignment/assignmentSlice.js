import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  page: 1,
  assignment: {},
};

const assignmentSlice = createSlice({
  name: "assignmentSlice",
  initialState,
  reducers: {
    setAssignment: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export default assignmentSlice.reducer;
export const { setAssignment } = assignmentSlice.actions;
