export const shortedTasks = (tasks) => {
  if (tasks) {
    const active = tasks.filter((item) => item?.status === "active");
    const completed = tasks.filter((item) => item?.status === "completed");
    const others = tasks.filter(
      (item) => item?.status !== "completed" && item?.status !== "active"
    );
    const shorteAlldTasks = active.concat(completed, others);
    return shorteAlldTasks;
  }
};
