import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchTasks, addTask, deleteTask, toggleCompleted } from "./operations";

const extraActions = [fetchTasks, addTask, deleteTask, toggleCompleted];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.items = action.payload;
    }).addCase(addTask.fulfilled, (state, action) => {
      state.items.push(action.payload);
    }).addCase(deleteTask.fulfilled, (state, action) => {
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      state.items.splice(index, 1);
    }).addCase(toggleCompleted.fulfilled, (state, action) => {
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      state.items.splice(index, 1, action.payload);
    }).addMatcher(
      isAnyOf(...extraActions.map(action => action.pending)), state => {
        state.isLoading = true;
      }).addMatcher(
        isAnyOf(...extraActions.map(action => action.rejected)), (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }).addMatcher(
          isAnyOf(...extraActions.map(action => action.fulfilled)), state => {
            state.isLoading = false;
            state.error = null;
          })
  }
});

export const tasksReducer = tasksSlice.reducer;
