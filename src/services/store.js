import { ref, readonly, onMounted } from 'vue'

let TODOArray = ref([])

export const useLocalStorage = () => {
  const updateLocalStorage = () => {
    localStorage.setItem('TODOArray', JSON.stringify(TODOArray.value))
  }
  const setTODOArray = () => {
    TODOArray.value = JSON.parse(localStorage.getItem('TODOArray')) || []
  }

  const addNewTODO = (newTODO) => {
    TODOArray.value.push(newTODO)
    updateLocalStorage()
  }
  const deleteTODO = (deleteIndex) => {
    TODOArray.value.splice(deleteIndex, 1)
    updateLocalStorage()
  }
  const editTextInTask = (TODOIndex, taskIndex, newText) => {
    TODOArray.value[TODOIndex].tasks[taskIndex].text = newText
    updateLocalStorage()
  }
  const editDoneStatusInTask = (TODOIndex, taskIndex, newDoneStatus) => {
    const payload = TODOArray.value

    payload[TODOIndex].tasks[taskIndex].doneStatus = newDoneStatus

    TODOArray.value = payload
    updateLocalStorage()
  }
  const addNewTask = (TODOIndex, newTask) => {
    TODOArray.value[TODOIndex].tasks.push(newTask)
    updateLocalStorage()
  }
  const deleteTask = (TODOIndex, taskIndex) => {
    TODOArray.value[TODOIndex].tasks = TODOArray.value[TODOIndex].tasks.filter(
      (_, ind) => ind != taskIndex
    )
    updateLocalStorage()
  }

  onMounted(() => {
    setTODOArray()
  })
  return {
    todoList: TODOArray,
    addNewTODO,
    deleteTODO,
    editTextInTask,
    editDoneStatusInTask,
    addNewTask,
    deleteTask
  }
}
