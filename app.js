let tempTasks;

window.addEventListener('load', init);

function init(e){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const ulTasks = document.createElement('ul');
    ulTasks.className = 'collection';

    if(tasks){
        const oldUl = document.querySelector('.collection');
        for(task of tasks){
            const li = document.createElement('li');
            const link = document.createElement('a');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(task));
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove"></i>';
            li.appendChild(link);
            ulTasks.appendChild(li);
        }
        oldUl.parentElement.replaceChild(ulTasks,oldUl);
    }
}

const form = document.querySelector('.task-form');
form.addEventListener('submit', addTask);

function addTask(e){
    const taskInputFld = document.querySelector('#task');
    if(taskInputFld.value !== ""){
        const ulTasks = document.querySelector('ul.collection');
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInputFld.value));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        ulTasks.appendChild(li);
        console.log(li);
        // update items in local storage

        if(localStorage.getItem('tasks') === null)
            tempTasks = [];
        else tempTasks = JSON.parse(localStorage.getItem('tasks'));
        tempTasks.push(taskInputFld.value);
        localStorage.setItem('tasks', JSON.stringify(tempTasks));

        //end of update
        taskInputFld.value = "";
    }
    else alert('Въведи нещо в кутийката де :P');
    e.preventDefault();
}

let filterInputFld = document.querySelector('#filter');
filterInputFld.addEventListener('keyup', filterTasks);

function filterTasks(e){
    const ulEl = document.querySelector('ul.collection');//filter(task => !task.innerText.includes(filterInputFld.value));
    const ulParentEl = ulEl.parentNode;
    const nextSiblEl = ulEl.nextElementSibling;
    ulEl.remove();
    // populate ul with tasks from locale storage according to the filter

    if(localStorage.getItem('tasks') === null)
        tempTasks = [];
    else {
        tempTasks = JSON.parse(localStorage.getItem('tasks')).filter(task => (task).toLowerCase().includes((filterInputFld.value).toLowerCase()));
        filteredTasks = tempTasks;
    }

    // end of populate
    const ulTasks = document.createElement('ul');
    ulTasks.className = 'collection'
    while(tempTasks.length > 0){
        const li = document.createElement('li');
        li.className = 'collection-item';
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(document.createTextNode(tempTasks.shift()));
        li.appendChild(link);
        ulTasks.appendChild(li);
    }
    ulParentEl.insertBefore(ulTasks, nextSiblEl);
}

document.querySelector('ul.collection').addEventListener('click', deleteTask);

function deleteTask(e){
    if(e.target.className === 'fa fa-remove')
        if(confirm('Are you sure you want to delete this task?')){
            if(localStorage.getItem('tasks') !== null){
                let allTasks = JSON.parse(localStorage.getItem('tasks'));//e.target.parentNode.parentNode.textContent);
                allTasks.splice(allTasks.findIndex(task => task === e.target.parentNode.parentNode.textContent),1);
                localStorage.setItem('tasks', JSON.stringify(allTasks));
            }
            e.target.parentNode.parentNode.remove();
        }
}

let clearBtn = document.querySelector('.clear-tasks');
clearBtn.addEventListener('click', clearTasks);

function clearTasks(e){
    const ulEl = document.querySelector('ul.collection');
    const ulParentEl = ulEl.parentNode;
    const nextSiblEl = ulEl.nextElementSibling;
    ulEl.remove();
    const ulTasks = document.createElement('ul');
    ulTasks.className = 'collection'
    ulParentEl.insertBefore(ulTasks, nextSiblEl);
    
    localStorage.clear();
}
//console.log(clearBtn);
