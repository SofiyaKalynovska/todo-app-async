import { createSelector } from "@reduxjs/toolkit";

export const selectTasks = state => state.tasks.items;
export const selectIsLoading = state => state.tasks.isLoading;
export const selectError = state => state.tasks.error;
export const selectStatusFilter = state => state.filters.status;
export const selectVisibleTasks = createSelector(
  [selectTasks, selectStatusFilter],
  (tasks, statusFilter) => {
    switch (statusFilter) {
      case statusFilter.active:
        return tasks.filter(task => !task.completed);
      case statusFilter.completed:
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }
);
export const selectTaskCount = createSelector([selectTasks], tasks => {
  return tasks.reduce(
    (count, task) => {
      if (task.completed) {
        count.completed += 1;
      } else {
        count.active += 1;
      }
      return count;
    },
    { active: 0, completed: 0 }
  );
});