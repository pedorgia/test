import { reactive } from 'vue'

export const store = reactive({
  TODOArray: JSON.parse(localStorage.getItem('TODOArray')) || [],
  addNewTODO(newTODO) {
    this.TODOArray.push(newTODO)
    localStorage.setItem('TODOArray', JSON.stringify(this.TODOArray))
  },
  deleteTODO(deleteIndex) {
    this.TODOArray = this.TODOArray.filter((_, index) => index != deleteIndex)
    localStorage.setItem('TODOArray', JSON.stringify(this.TODOArray))
  },
  editTextInTask(TODOIndex, taskIndex, newText) {
    this.TODOArray[TODOIndex].tasks[taskIndex].text = newText
    localStorage.setItem('TODOArray', JSON.stringify(this.TODOArray))
  },
  editDoneStatusInTask(TODOIndex, taskIndex, newDoneStatus) {
    this.TODOArray[TODOIndex].tasks[taskIndex].doneStatus = newDoneStatus
    localStorage.setItem('TODOArray', JSON.stringify(this.TODOArray))
  },
  addNewTask(TODOIndex, newTask) {
    this.TODOArray[TODOIndex].tasks.push(newTask)
    localStorage.setItem('TODOArray', JSON.stringify(this.TODOArray))
  },
  deleteTask(TODOIndex, taskIndex) {
    this.TODOArray[TODOIndex].tasks = this.TODOArray[TODOIndex].tasks.filter(
      (_, ind) => ind != taskIndex
    )
    localStorage.setItem('TODOArray', JSON.stringify(this.TODOArray))
  }
})
