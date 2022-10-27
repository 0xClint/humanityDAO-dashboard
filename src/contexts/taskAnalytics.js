export const TaskAnalytics = (data) => {
  let count = [0, 0, 0];

  if (data) {
    data.subtasks.map((item) => {
      if (item.isComplete) {
        count[0]++;
        count[1]++;
      } else {
        count[0]++;
        count[2]++;
      }
    });
  }
  return count;
};

// const PieChart = () => {
//   let count = [0, 0, 0];
//   // console.log(TaskDetails[0]);

//   if (TaskDetails[0]) {
//     TaskDetails[0].subtasks.map((item) => {
//       // console.log(item);
//       if (item.isComplete) {
//         count[0]++;
//         count[1]++;
//       } else {
//         count[0]++;
//         count[2]++;
//       }
//     });
//   }
//   // : "s-";
//   return count;
// };
