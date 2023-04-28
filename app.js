const formAddTodo = document.querySelector('[data-form-add-todo]')
const todosContainer = document.querySelector('[data-todos-container]')
const inputSearch = document.querySelector('[data-form-search] input')

const addTodoToList = e => {
  e.preventDefault()

  const inputValue = e.target.add.value.trim()

  if (!inputValue.length) return

  todosContainer.innerHTML += `
    <li class="list-group-item" data-todo="${inputValue}">
      <span>${inputValue}</span>
      <i class="far fa-trash-alt delete" data-trash="${inputValue}"></i>
    </li>
  `

  e.target.reset()
}

const removeTodos = e => {
  const clickedElement = e.target

  if (clickedElement.dataset.trash) {
    document.querySelector(`[data-todo="${clickedElement.dataset.trash}"]`).remove()
  }
}

const filterTodos = (todos, inputValue, match) => {
  return todos
    .filter(todo => {
      const matched = todo.textContent.toLocaleLowerCase().trim().includes(inputValue)
      return match ? matched : !matched
    })
}

const manipulateDisplay = (todos, display) => {
  todos.forEach(todo => {
    todo.style.display = display
  })
}

const hideTodos = (todos, inputValue) => {
  const todoToHide = filterTodos(todos, inputValue, false)
  manipulateDisplay(todoToHide, 'none')
}

const showTodos = (todos, inputValue) => {
  const todosToShow = filterTodos(todos, inputValue, true)
  manipulateDisplay(todosToShow, 'flex')
}

const handleVisibilityTodos = e => {
  const inputValue = e.target.value.toLowerCase().trim()
  const todos = Array.from(todosContainer.children)

  hideTodos(todos, inputValue)
  showTodos(todos, inputValue)
}

formAddTodo.addEventListener('submit', addTodoToList)
todosContainer.addEventListener('click', removeTodos)
inputSearch.addEventListener('input', handleVisibilityTodos)
