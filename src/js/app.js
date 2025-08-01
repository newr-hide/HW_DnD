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

const tasksElements = tasks.querySelectorAll('.task');
let actualElement;

const onMouseOver = (e) => {
    
    
    actualElement.style.top = e.clientY +'px';
    actualElement.style.left = e.clientX + 'px';
};

const onMouseUp = (e) => {
    const mouseUpItem = e.target;
    console.log(mouseUpItem)
    console.log(actualElement)
    tasks.insertBefore(actualElement, mouseUpItem.firstElementChild)
    actualElement.classList.remove('dragged');
    actualElement = undefined;

    document.documentElement.removeEventListener('mouseup', onMouseUp);
    document.documentElement.removeEventListener('mouseover', onMouseOver);
};



tasks.addEventListener('mousedown', (e) => {
    e.preventDefault();
    actualElement = e.target;
    actualElement.style.cursor = 'grabbing';
    actualElement.classList.add('dragged');
    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseover', onMouseOver);


});



});






// import { mdConvert } from 'md-converter';

// const fileContainer = document.querySelector('.file-container');
// const fileInput = fileContainer.querySelector('.overlapped');
// const fileTitle = document.querySelector('.prewiew-title');
// const fileText = document.querySelector('.prewiew-text');
// const fileHtml = document.querySelector('.prewiew-html');
// const fileImage = document.querySelector('.prewiew-image');

// fileContainer.addEventListener('click', (e)=>{
   
//     fileInput.dispatchEvent(new MouseEvent('click'))
// });

// fileContainer.addEventListener('dragover', (e) => {
//     e.preventDefault();
// });

// fileContainer.addEventListener('drop', (e) => {
//     e.preventDefault();
//     console.log(e)
//     fileImage.src = 
// });

// const displayTextContent = (e) => {
//      console.log(e)
//      fileText.textContent = e.target.result;
// }

// const displayMdContent = (e) => {
//      console.log(e)
//      fileHtml.innerHTML = mdConvert(e.target.result);
// }

// const displayImage = (e) => {
//      console.log(e)
//      fileImage.src = e.target.result;
// }

// fileInput.addEventListener('change', (e) => {
//     console.log(e);
//     console.dir(fileInput)

//     const file = fileInput.files && fileInput.files[0];
//     if (!file) return;
//     fileTitle.textContent = file.name;

//     const url = URL.createObjectURL(file);
//     console.log(url)

//     const link = document.createElement('a');
//     link.href = url;
//     link.rel = 'noopener';
//     link.download = file.name;
//     link.click();

// });

// const items = document.querySelector('.items');
// const itemsElement = items.querySelector('.items-item');
// let actualElement;

// const onMouseOver = (event) => {
    
//     actualElement.style.top = event.clientY +'px';
//     actualElement.style.left = event.clientX +'px';
// };

// const onMouseUp = (e) => {
//     const mouseUpTem = e.target;
//     items.insertBefore(actualElement, mouseUpTem)


// actualElement.classList.remove('dragged');
// actualElement = undefined;

// document.documentElement.removeEventListener('mouseup', onMouseUp);
// document.documentElement.removeEventListener('mouseover', onMouseOver)
// }



// items.addEventListener('mousedown', (e) => {
//     e.preventDefault();
//      actualElement = e.target;
//     actualElement.classList.add('dragged');

//     document.documentElement.addEventListener('mouseup', onMouseUp);
//     document.documentElement.addEventListener('mouseover', onMouseOver)
// });