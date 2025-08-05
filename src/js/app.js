const columns = document.querySelectorAll(('.column_container')).forEach(column => {
    const buttonCreateElement = column.querySelector('.button_create_element');
    const myForm = column.querySelector('.task_form');
    
    const tasks = column.querySelector('.tasks_container');
 
    let taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.placeholder = 'Введите новую задачу';
    taskInput.classList.add('input_task');
   

    let btnAddTask = document.createElement('button');
    btnAddTask.classList.add('btn_add_task');
    btnAddTask.innerText = '+ Добавить задачу';

    // Кнопка на форме
    let btnDeleteTask = document.createElement('button');
    btnDeleteTask.classList.add('button_delete_element');

    // Изначально спрятаны
    taskInput.style.display = 'none';
    btnAddTask.style.display = 'none';
    btnDeleteTask.style.display = 'none';

    column.insertBefore(taskInput, column.lastElementChild);
    myForm.insertBefore(btnAddTask, myForm.lastElementChild);
    myForm.insertBefore(btnDeleteTask, myForm.lastElementChild);


    function handleAddTaskClick() {
        const value = taskInput.value.trim();

        if (value === '') return;

        let newTaskItem = document.createElement('div');
        newTaskItem.classList.add('task');

        newTaskItem.textContent = value;
        // newTaskItem.draggable = true;

        // Кнопка на задаче
        let btnRemoveTask = document.createElement('button');
        btnRemoveTask.classList.add('button_delete_element');
        btnRemoveTask.classList.add('hidden');
        


        btnRemoveTask.addEventListener('click', () => removeTask(newTaskItem));

        newTaskItem.appendChild(btnRemoveTask);
        tasks.prepend(newTaskItem);
        const task = column.querySelector('.task');
        task.addEventListener('mouseover', () => {btnRemoveTask.classList.remove('hidden')});
        task.addEventListener('mouseout', () => {btnRemoveTask.classList.add('hidden')});
        taskInput.value = ''; 

        taskInput.style.display = 'none';
        btnAddTask.style.display = 'none';
        btnDeleteTask.style.display = 'none';

        buttonCreateElement.classList.remove('hidden'); 
}

btnAddTask.addEventListener('click', handleAddTaskClick);

buttonCreateElement.addEventListener('click', function(e) {
    e.preventDefault();

    
    taskInput.style.display = 'block';
    btnAddTask.style.display = 'inline-block';
    btnDeleteTask.style.display = 'inline-block';

    
    this.classList.add('hidden');
});
    btnDeleteTask.addEventListener('click', removeContentInput)

function removeTask(taskItem) {
    taskItem.remove();
}

function removeContentInput() {
    taskInput.value = '';

     taskInput.style.display = 'none';
    btnAddTask.style.display = 'none';
    btnDeleteTask.style.display = 'none';

    buttonCreateElement.classList.remove('hidden');

}

myForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
});



// DnD


// const taskElement = tasks.querySelector('.task');
// let draggedElement;
// let initialOffsetX, initialOffsetY; 


// const onMouseMove = (e) => {
//     if (!draggedElement) return;
   
//     const newTop = e.clientY - initialOffsetY;
//     const newLeft = e.clientX - initialOffsetX;
//     draggedElement.style.top = `${newTop}px`;
//     draggedElement.style.left = `${newLeft}px`;
// };


// const onMouseUp = (e) => {
//     mouseUrItem = e.target;
//     console.log(draggedElement)
//     tasks.insertBefore(draggedElement, mouseUrItem);
//     draggedElement.classList.remove('dragged');
//     draggedElement = undefined;


//     document.documentElement.removeEventListener('mousemove', onMouseMove);
//     document.documentElement.removeEventListener('mouseup', onMouseUp);
// };


// tasks.addEventListener('mousedown', (event) => {
//     event.preventDefault();
//     draggedElement = event.target.closest('.task');
    
//     if (!draggedElement) return;


//     const rect = draggedElement.getBoundingClientRect();
//     initialOffsetX = event.clientX - rect.left;
//     initialOffsetY = event.clientY - rect.top;

//     draggedElement.classList.add('dragged');


//     document.documentElement.addEventListener('mousemove', onMouseMove);
//     document.documentElement.addEventListener('mouseup', onMouseUp);
// });

// })




        



// document.querySelectorAll('.column_container').forEach((col) => {
    column.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData("text/plain", event.target.outerHTML);
        // console.log(event.target);
        event.dataTransfer.effectAllowed = 'move';
        originalElement = event.target;
        
    });

    let placeholder = document.createElement('div');
    placeholder.classList.add('placeholder');

    tasks.addEventListener('dragenter', () => {
        tasks.insertBefore(placeholder, null);
    });

    tasks.addEventListener('dragleave', () => {
        
        placeholder.parentNode?.removeChild(placeholder);
    });



    tasks.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        

    });

    tasks.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedElHTML = e.dataTransfer.getData('text');
        const draggedEl = document.createElement('div');
        draggedEl.innerHTML = draggedElHTML;
        if (originalElement && originalElement.parentNode.contains(originalElement)) {
            originalElement.parentNode.removeChild(originalElement);
        }

    tasks.insertAdjacentElement('beforeend', draggedEl);

    originalElement = null;
    })})