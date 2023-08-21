import { reactive } from 'vue'

export const store = reactive({
  TODOArray: JSON.parse(localStorage.getItem('TODOArray')) || [],
  addNewTODO(newTODO) {
    this.TODOArray.push(newTODO)
  },
  deleteTODO(deleteIndex){
    this.TODOArray = this.TODOArray.filter((_, index) => index != deleteIndex)
  },
  editTextInTask(TODOIndex, taskIndex, newText){
    this.TODOArray[TODOIndex].tasks[taskIndex].text = newText
  },
  editDoneStatusInTask(TODOIndex, taskIndex, newDoneStatus){
    this.TODOArray[TODOIndex].tasks[taskIndex].doneStatus = newDoneStatus
  }
})