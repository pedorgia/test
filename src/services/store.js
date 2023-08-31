import { ref } from 'vue';

export const TODOArray = ref(
  JSON.parse(localStorage.getItem('TODOArray')) || []
);

export const actions = {
  addNewTODO(newTODO) {
    TODOArray.value.push(newTODO);
    updateLocalStorage();
  },
  deleteTODO(deleteIndex) {
    TODOArray.value.splice(deleteIndex, 1);
    updateLocalStorage();
  },
  editTextInTask(TODOIndex, taskIndex, newText) {
    TODOArray.value[TODOIndex].tasks[taskIndex].text = newText;
    updateLocalStorage();
  },
  editDoneStatusInTask(TODOIndex, taskIndex, newDoneStatus) {
    TODOArray.value[TODOIndex].tasks[taskIndex].doneStatus = newDoneStatus;
    updateLocalStorage();
  },
  addNewTask(TODOIndex, newTask) {
    TODOArray.value[TODOIndex].tasks.push(newTask);
    updateLocalStorage();
  },
  deleteTask(TODOIndex, taskIndex) {
    TODOArray.value[TODOIndex].tasks = TODOArray[TODOIndex].tasks.filter(
      (_, ind) => ind != taskIndex
    );
    updateLocalStorage();
  },
};
const updateLocalStorage = () => {
  localStorage.setItem('TODOArray', JSON.stringify(TODOArray.value));
};
// export const store = reactive({
//   TODOArray: JSON.parse(localStorage.getItem('TODOArray')) || [],
//   addNewTODO(newTODO) {
//     this.TODOArray.push(newTODO)
//     localStorage.setItem('TODOArray', JSON.stringify(this.TODOArray))
//   },
//   deleteTODO(deleteIndex) {
//     this.TODOArray = this.TODOArray.filter((_, index) => index != deleteIndex)
//     localStorage.setItem('TODOArray', JSON.stringify(this.TODOArray))
//   },
//   editTextInTask(TODOIndex, taskIndex, newText) {
//     this.TODOArray[TODOIndex].tasks[taskIndex].text = newText
//     localStorage.setItem('TODOArray', JSON.stringify(this.TODOArray))
//   },
//   editDoneStatusInTask(TODOIndex, taskIndex, newDoneStatus) {
//     this.TODOArray[TODOIndex].tasks[taskIndex].doneStatus = newDoneStatus
//     localStorage.setItem('TODOArray', JSON.stringify(this.TODOArray))
//   },
//   addNewTask(TODOIndex, newTask) {
//     this.TODOArray[TODOIndex].tasks.push(newTask)
//     localStorage.setItem('TODOArray', JSON.stringify(this.TODOArray))
//   },
//   deleteTask(TODOIndex, taskIndex) {
//     this.TODOArray[TODOIndex].tasks = this.TODOArray[TODOIndex].tasks.filter(
//       (_, ind) => ind != taskIndex
//     )
//     localStorage.setItem('TODOArray', JSON.stringify(this.TODOArray))
//   }
// })
