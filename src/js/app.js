const columns = document.querySelectorAll(('.column_container')).forEach((column) => {
  const buttonCreateElement = column.querySelector('.button_create_element');
  const myForm = column.querySelector('.task_form');

  const tasks = column.querySelector('.tasks_container');
  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.placeholder = 'Введите новую задачу';
  taskInput.classList.add('input_task');
   
  const btnAddTask = document.createElement('button');
  btnAddTask.classList.add('btn_add_task');
  btnAddTask.innerText = '+ Добавить задачу';

    // Кнопка на форме
  const btnDeleteTask = document.createElement('button');
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

        const newTaskItem = document.createElement('div');
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
        task.addEventListener('mouseover', () => {btnRemoveTask.classList.remove('hidden');});
        task.addEventListener('mouseout', () => {btnRemoveTask.classList.add('hidden');});
        taskInput.value = ''; 

        taskInput.style.display = 'none';
        btnAddTask.style.display = 'none';
        btnDeleteTask.style.display = 'none';
        buttonCreateElement.classList.remove('hidden'); 

        saveColumns();
}

btnAddTask.addEventListener('click', handleAddTaskClick);

buttonCreateElement.addEventListener('click', function(e) {
    e.preventDefault();

    taskInput.style.display = 'block';
    btnAddTask.style.display = 'inline-block';
    btnDeleteTask.style.display = 'inline-block';

    this.classList.add('hidden');
});
    btnDeleteTask.addEventListener('click', removeContentInput);

function removeTask(taskItem) {
    taskItem.remove();
    saveColumns();
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
let shift;
let fantomElement;
let draggedElement;
let padding = 10;

const onMouseMove = (e) => {
    const targetTask = e.target.closest(".task");
    if (!draggedElement) return;

    if(!(e.target instanceof HTMLElement)) 
        return;

    draggedElement.style.left = e.pageX - shift.x + "px";
    draggedElement.style.top = e.pageY - shift.y + "px";

    if (!targetTask && !e.target.classList.contains("tasks_container")) {
        return;
      }

      if (e.target.classList.contains("tasks_container")) {
       
        const arrTasks = Array.from(e.target.children).filter(
          (task) =>
            !task.classList.contains("dragged") &&
            !task.classList.contains("fantom"));
        if (arrTasks.length === 0) {
            fantomElement.remove();
            e.target.append(fantomElement);
          }else{
            if (e.clientY - padding >
                arrTasks[arrTasks.length - 1].offsetTop +
                arrTasks[arrTasks.length - 1].offsetHeight) {
              
            if (
                !e.target.children[e.target.children.length - 1].classList.contains(
                  "fantom"))
               {
                fantomElement.remove();
                e.target.append(fantomElement);
              }
            }
           
          }
        }
    
          if (targetTask) {
          
          const locationUp = positionUp(
            targetTask.offsetTop,
            targetTask.offsetHeight,
            e.clientY - padding);
    
          if (locationUp &&
            e.target.previousElementSibling &&
            e.target.previousElementSibling.classList.contains("fantom")
          ) {
            return;
          }
    
          if (
            !locationUp &&
            e.target.nextElementSibling &&
            e.target.nextElementSibling.classList.contains("fantom")
          ) {
            return;
          }

          fantomElement.remove();
          locationUp
            ? targetTask.before(fantomElement)
            : targetTask.after(fantomElement);
        }
};

const onMouseUp = (e) => {
    // console.log(e.target)
    if (!fantomElement||!draggedElement) return;
    
    draggedElement.removeAttribute('style');
    
        fantomElement.before(draggedElement);
        fantomElement.remove();
        draggedElement.classList.remove('dragged');
        draggedElement = null;
        fantomElement = null;
  
    document.documentElement.removeEventListener('mousemove', onMouseMove);
    document.documentElement.removeEventListener('mouseup', onMouseUp);
    saveColumns();
};

tasks.addEventListener('mousedown', (event) => {
    event.preventDefault();
    // console.log(event.target)
    
    draggedElement = event.target.closest('.task');
    if (!draggedElement) return;
    draggedElement.style.width = draggedElement.clientWidth + 'px';
    draggedElement.style.height = draggedElement.clientHeight + 'px';
    
    if(event.target.classList.contains('button_delete_element')) 
        {draggedElement.remove();
             return;};

    const rect = draggedElement.getBoundingClientRect();
    initialOffsetX = event.clientX - rect.left;
    initialOffsetY = event.clientY - rect.top;

    fantomElement = document.createElement('div');
    fantomElement.classList.add('fantom');
    
    shift = {
        x: event.clientX - draggedElement.getBoundingClientRect().left,
        y: event.clientY - draggedElement.getBoundingClientRect().top + padding,
      };
    
    draggedElement.before(fantomElement);
    draggedElement.classList.add('dragged');

    document.documentElement.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseup', onMouseUp);
});

function positionUp(elemTop, elemheight, clientY) {
    if (clientY > elemTop && clientY < elemTop + elemheight / 2) {
      return true;
    }
    return false;
  }
});

// storage
function saveColumns() {
  const columns = document.querySelectorAll('.column_container');
  const data = {};

  columns.forEach(col => {
    const colTitle = col.querySelector('.title_container').textContent;
    const tasks = col.querySelectorAll('.task');
    const taskTexts = Array.from(tasks).map(t => t.textContent);
    data[colTitle] = taskTexts;
  });

  localStorage.setItem('trello-data', JSON.stringify(data));
}

window.onload = function() {
  const storedData = localStorage.getItem('trello-data');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    Object.keys(parsedData).forEach(title => {
      const h2Elements = document.querySelectorAll('.column_container h2');
      h2Elements.forEach(h2 => {
        if (h2.textContent.includes(title)) {
          const parentColumn = h2.parentNode;
          const tasksContainer = parentColumn.querySelector('.tasks_container');
          
          parsedData[title].forEach(text => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            taskDiv.textContent = text;
            
            const delBtn = document.createElement('button');
            delBtn.className = 'button_delete_element';
            delBtn.addEventListener('click', () => {
              taskDiv.remove();
              saveColumns();
            });
            
            taskDiv.appendChild(delBtn);
            tasksContainer.appendChild(taskDiv);
          });
        }
      });
    });
  }
};