export const selectTasks = state => state.tasks.items;
export const selectIsLoading = state => state.tasks.isLoading;
export const selectError = state => state.tasks.error;
export const selectStatusFilter = state => state.filters.status;
export const selectVisibleTasks = state => {
  const tasks = selectTasks(state);
  const statusFilter = selectStatusFilter(state);
  switch (statusFilter) {
    case statusFilter.active:
      return tasks.filter(task => !task.completed);
    case statusFilter.completed:
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
};