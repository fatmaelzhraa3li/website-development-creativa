document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const allTasksBtn = document.getElementById('allTasksBtn');
    const activeTasksBtn = document.getElementById('activeTasksBtn');
    const completedTasksBtn = document.getElementById('completedTasksBtn');
    const totalTasksSpan = document.getElementById('totalTasks');
    const activeTasksSpan = document.getElementById('activeTasks');
    const completedTasksSpan = document.getElementById('completedTasks');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // تحميل المهام من Local Storage

    // دالة لعرض المهام
    function renderTasks(filter = 'all') {
        taskList.innerHTML = ''; // مسح القائمة الحالية

        const filteredTasks = tasks.filter(task => {
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true; // 'all'
        });

        filteredTasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.className = task.completed ? 'completed' : '';
            listItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="complete-btn" data-id="${task.id}">${task.completed ? 'تراجع' : 'إكمال'}</button>
                    <button class="edit-btn" data-id="${task.id}">تعديل</button>
                    <button class="delete-btn" data-id="${task.id}">حذف</button>
                </div>
            `;
            taskList.appendChild(listItem);
        });
        updateTaskSummary();
    }

    // دالة لتحديث ملخص المهام
    function updateTaskSummary() {
        totalTasksSpan.textContent = tasks.length;
        activeTasksSpan.textContent = tasks.filter(task => !task.completed).length;
        completedTasksSpan.textContent = tasks.filter(task => task.completed).length;
    }

    // دالة لإضافة مهمة جديدة
    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            const newTask = {
                id: Date.now(), // معرف فريد للمهمة
                text: taskText,
                completed: false
            };
            tasks.push(newTask);
            newTaskInput.value = ''; // مسح حقل الإدخال
            saveTasks();
            renderTasks();
        }
    });

    // دالة للتعامل مع النقر على أزرار المهام (إكمال/تعديل/حذف)
    taskList.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        if (e.target.classList.contains('complete-btn')) {
            const taskIndex = tasks.findIndex(task => task.id === id);
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = !tasks[taskIndex].completed; // تبديل حالة الإكمال
                saveTasks();
                renderTasks();
            }
        } else if (e.target.classList.contains('edit-btn')) {
            const taskIndex = tasks.findIndex(task => task.id === id);
            if (taskIndex !== -1) {
                const newText = prompt('تعديل المهمة:', tasks[taskIndex].text);
                if (newText !== null && newText.trim() !== '') {
                    tasks[taskIndex].text = newText.trim();
                    saveTasks();
                    renderTasks();
                }
            }
        } else if (e.target.classList.contains('delete-btn')) {
            tasks = tasks.filter(task => task.id !== id); // حذف المهمة
            saveTasks();
            renderTasks();
        }
    });

    // وظائف أزرار التصفية
    allTasksBtn.addEventListener('click', () => renderTasks('all'));
    activeTasksBtn.addEventListener('click', () => renderTasks('active'));
    completedTasksBtn.addEventListener('click', () => renderTasks('completed'));

    // دالة لحفظ المهام في Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // العرض الأولي للمهام عند تحميل الصفحة
    renderTasks();
});
