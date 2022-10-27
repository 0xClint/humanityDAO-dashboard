export const totalSubTaskCount = (taskList) => {
  let count = 0;
  //   const data = taskList;

  taskList.map((item) => {
    if (item.subtasks) {
      count += item.subtasks.length;
    }
  });
  return count;
};
