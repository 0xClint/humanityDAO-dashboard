export const totalSubTaskCount = (taskList) => {
  let count = [0, 0, 0];

  taskList.map((item) => {
    if (item) {
      // console.log(item.subtasks);
      item.subtasks.map((subItem) => {
        if (subItem.isComplete) {
          count[0]++;
          count[1]++; ///completed
        } else {
          count[0]++;
          count[2]++; ///Incompleted
        }
      });
    }
  });
  return count;
};
