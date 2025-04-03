import { createSlice } from "@reduxjs/toolkit";
// import {enrollments} from "../Database";
const initialState = {
  enrollments: [],
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    addEnrollment: (state, { payload: enrollment }) => {
          console.log("attempting to add enrollment: ", enrollment)

      const newEnrollment: any =  {
        _id: enrollment._id,
        user: enrollment.user,
        course: enrollment.course
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    deleteEnrollment: (state, { payload: enrollmentID }) => {
      console.log("attempting to delete enrollment w/ id:", enrollmentID)

      state.enrollments = state.enrollments.filter(
        (c: any) => c._id !== enrollmentID);
    },
    updateEnrollment: (state, { payload: enrollment }) => {
      console.log("attempting to update enrollment:", enrollment)
      state.enrollments = state.enrollments.map((c: any) =>
        c._id === enrollment._id ? enrollment : c
      ) as any;
    },

  },
});
export const { addEnrollment, deleteEnrollment, updateEnrollment } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;