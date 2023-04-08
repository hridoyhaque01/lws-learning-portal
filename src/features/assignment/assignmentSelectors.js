export const selectAssignmentType = (state) => {
  return state.assignment?.assignmentType;
};
export const selectAssingmentPage = (state) => {
  return state.assignment?.assginmentPage;
};

export const selectAssignment = (state) => {
  return state.assignment?.assignment;
};

export const selectAssignmentModal = (state) => {
  return state.assignment?.assignmentModal;
};

export const selectSubmitAssignmentModal = (state) => {
  return state.assignment?.submitAssignmentModal;
};
