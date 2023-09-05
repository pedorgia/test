import { ref, readonly, onMounted, reactive } from 'vue'

const TODOArray = reactive(JSON.parse(localStorage.getItem('TODOArray')) || [])

export const useLocalStorage = () => {
  const updateLocalStorage = () => {
    localStorage.setItem('TODOArray', JSON.stringify(TODOArray))
  }
  // const setTODOArray = () => {
  //   let payload = TODOArray
  //   payload = JSON.parse(localStorage.getItem('TODOArray')) || []
  //   //TODOArray = JSON.parse(localStorage.getItem('TODOArray')) || []
  // }

  const addNewTODO = (newTODO) => {
    // const payload = TODOArray
    // payload.push(newTODO)
    TODOArray.push(newTODO)
    updateLocalStorage()
  }
  const deleteTODO = (deleteIndex) => {
    // let payload = TODOArray
    // payload.splice(deleteIndex, 1)
    TODOArray.splice(deleteIndex, 1)
    updateLocalStorage()
  }
  const editTextInTask = (TODOIndex, taskIndex, newText) => {
    const payload = TODOArray
    payload[TODOIndex].tasks[taskIndex].text = newText
    TODOArray[TODOIndex].tasks = [...payload[TODOIndex].tasks]
    //TODOArray[TODOIndex].tasks[taskIndex].text = newText
    updateLocalStorage()
  }
  const editDoneStatusInTask = (TODOIndex, taskIndex, newDoneStatus) => {
    const payload = TODOArray

    payload[TODOIndex].tasks[taskIndex].doneStatus = newDoneStatus

    TODOArray[TODOIndex].tasks = [...payload[TODOIndex].tasks]
    updateLocalStorage()
  }
  const addNewTask = (TODOIndex, newTask) => {
    const payload = TODOArray
    payload[TODOIndex].tasks.push(newTask)
    TODOArray[TODOIndex].tasks = [...payload[TODOIndex].tasks]
    //TODOArray[TODOIndex].tasks.push(newTask)
    updateLocalStorage()
  }
  const deleteTask = (TODOIndex, taskIndex) => {
    TODOArray[TODOIndex].tasks = TODOArray[TODOIndex].tasks.filter((_, ind) => ind != taskIndex)
    updateLocalStorage()
  }

  // onMounted(() => {
  //   setTODOArray()
  // })
  return {
    todoList: readonly(TODOArray),
    addNewTODO,
    deleteTODO,
    editTextInTask,
    editDoneStatusInTask,
    addNewTask,
    deleteTask
  }
}
