// let taskListEl = document.querySelector('.task-list')
const addButton = document.querySelector('.add-button')
const insertTODOInputEl = document.querySelector('input.insert-todo')
let id = 0
function idGenerator() {
    id = id + 1
    return id
}

function onEditTaskBuilder(someTextElement, someEditButton) {
    return function editTask () {
        const textElInnerHtml = someTextElement.innerHTML
        someTextElement.innerHTML = ''

        const editInputEl = document.createElement('input')
        editInputEl.setAttribute('value', textElInnerHtml)
        someTextElement.appendChild(editInputEl)
        someEditButton.disabled = true

        editInputEl.addEventListener('keypress', (event) => {
            if (editInputEl.value !== ""){
                if (event.key === 'Enter') {
                    someTextElement.innerHTML = editInputEl.value.trim()
                    someEditButton.disabled = false
                    someTextElement.style.textDecoration = ''
                }
            }
        })
    }
}

function addTask() {
    const inputElText = insertTODOInputEl.value.trim()
    if (inputElText !== "") {
        const ul = document.getElementById('task-list')
        const li = document.createElement('li')
        const generatedId = idGenerator()
        li.setAttribute('id', generatedId)
        li.setAttribute('class', 'container')

        const textEl = document.createElement('div')
        textEl.innerHTML = inputElText
        textEl.setAttribute('class', 'task-caption')
        li.appendChild(textEl)

        const tickButton = document.createElement('button')
        tickButton.innerHTML = '✓'
        li.appendChild(tickButton)
        tickButton.setAttribute('class', 'tick-button')

        function crossOutTask() {
            if (textEl.style.textDecoration == 'line-through') {
                textEl.style.textDecoration = ''
            } else if (textEl.style.textDecoration == '') {
                textEl.style.textDecoration = 'line-through'
            } 
        }

        tickButton.addEventListener('click', crossOutTask)

        const editButton = document.createElement('button')
        editButton.innerHTML = '✎'
        li.appendChild(editButton)
        editButton.setAttribute('class', 'edit-button')

        const onEditTask = onEditTaskBuilder(textEl, editButton)
        
        editButton.addEventListener('click', onEditTask)

        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = '🗑️'
        li.appendChild(deleteButton)
        deleteButton.setAttribute('class', 'delete-button')

        function deleteTask () {
            li.remove()
        }
        
        deleteButton.addEventListener('click', deleteTask)

        ul.appendChild(li)
    }
    insertTODOInputEl.value = ''
}

addButton.addEventListener('click', addTask)
insertTODOInputEl.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask()
    }
})


