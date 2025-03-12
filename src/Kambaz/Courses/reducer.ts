import { createSlice } from "@reduxjs/toolkit";
import {courses} from "../Database";
const initialState = {
  courses: courses,
};
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: course }) => {
          console.log("attempting to add course: ", course)

      const newCourse: any =  {
        _id: course._id,
        name: course.name,
        number: course.number,
        startDate: course.startDate,
        endDate: course.endDate,
        department: course.department,
        credit: course.credit,
        description: course.description
      };
      state.courses = [...state.courses, newCourse] as any;
    },
    deleteCourse: (state, { payload: courseID }) => {
      console.log("attempting to delete course w/ id:", courseID)

      state.courses = state.courses.filter(
        (c: any) => c._id !== courseID);
    },
    updateCourse: (state, { payload: course }) => {
      console.log("attempting to update course:", course)
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      ) as any;
    },

  },
});
export const { addCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;