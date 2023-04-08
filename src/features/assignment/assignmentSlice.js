import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignmentType: "",
  assginmentPage: 1,
  assignment: {},
  assignmentModal: false,
  submitAssignmentModal: false,
};

const assignmentSlice = createSlice({
  name: "assignmentSlice",
  initialState,
  reducers: {
    setAssignment: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
    controlSubmitAssignmentModal: (state, action) => {
      state.submitAssignmentModal = action.payload;
    },
  },
});

export default assignmentSlice.reducer;
export const { setAssignment, controlSubmitAssignmentModal } =
  assignmentSlice.actions;
