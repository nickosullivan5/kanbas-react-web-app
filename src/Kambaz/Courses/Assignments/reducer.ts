import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";

const initialState = {
    assignments: [],
};
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
            console.log("state assigment: ", state.assignments)

        },

        addAssignment: (state, {payload: assignment}) => {
            console.log("attempting to add assignment: ", assignment)

            const newAssignment: any = {
                _id: uuidv4(),
                title: assignment.title,
                course: assignment.course,
                release_date: assignment.release_date,
                due_date: assignment.due_date,
                due_time: assignment.due_time,
                total_points: assignment.total_points,
                num_modules: assignment.num_modules,
                description: assignment.description,
                assignment_group: assignment.assignment_group,
                submission_type: assignment.submission_type,
                online_entry_option: assignment.online_entry_option,
                assign_to: assignment.assign_to
            };
            state.assignments = [...state.assignments, newAssignment] as any;
        },
        deleteAssignment: (state, {payload: assignmentId}) => {
            console.log("attempting to delete assignment w/ id:", assignmentId)

            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId);
        },
        updateAssignment: (state, {payload: assignment}) => {
            console.log("attempting to update assignment:", assignment)
            state.assignments = state.assignments.map((m: any) =>
                m._id === assignment._id ? assignment : m
            ) as any;
        },
        // editAssignment: (state, { payload: assignmentId }) => {
        //   state.assignments = state.assignments.map((a: any) =>
        //     a._id === assignmentId ? { ...a, editing: true } : a
        //   ) as any;
        // },
    },
});
export const {setAssignments, addAssignment, deleteAssignment, updateAssignment} =
    assignmentsSlice.actions;
export default assignmentsSlice.reducer;