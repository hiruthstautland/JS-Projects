//TODO: fiks prettify slik at " " on text-strings ' ' on selectors

//Task Class: Each task creates a task-object
class Task {
	constructor(tittel, detaljer, ansvarlig, klassifisering) {
		this.tittel = tittel;
		this.detaljer = detaljer;
		this.ansvarlig = ansvarlig;
		this.klassifisering = klassifisering;
	}
}
//UI Class: Handle UI Tasks, User Interface
class UI {
	static displayTasks() {
		const tasks = Store.getTasks();

		// // Dev data for
		// const storedTasks = [
		// 	//Local storage
		// 	{
		// 		tittel: 'Lage Middag',
		// 		detaljer: 'Handle og forered',
		// 		ansvarlig: 'Mina',
		// 		klassifisering: 'Høy'
		// 	},
		// 	{
		// 		tittel: 'Lage ',
		// 		detaljer: 'Handle og forered',
		// 		ansvarlig: 'Mina',
		// 		klassifisering: 'Høy'
		// 	},
		// 	{
		// 		tittel: ' Middag',
		// 		detaljer: 'Handle og forered',
		// 		ansvarlig: 'Mina',
		// 		klassifisering: 'Høy'
		// 	},
		// 	{
		// 		tittel: 'Lage-Middag',
		// 		detaljer: 'Handle og forered',
		// 		ansvarlig: 'Mina',
		// 		klassifisering: 'Høy'
		// 	}
		// ];
		//         // const tasks = storedTasks;

		// Prøv -> const tasks = storedTasks.map(task =>
		//      <div key="task.id">
		//          <div> $ {task.tittel} </div>
		//          <div> $ {task.ansvarlig} </div>
		//          <div> $ {task.klassifisering} </div>
		//     </div>
		//      );

		tasks.forEach((task) => UI.addTaskToList(task));
	}

	static addTaskToList(task) {
		const list = document.querySelector('#task-list');

		const row = document.createElement('tr');

		row.innerHTML = `
        <td> ${task.tittel} </td>
        <td> ${task.detaljer} </td>
        <td> ${task.ansvarlig} </td>
        <td> ${task.klassifisering} </td>
        <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
        `;
		list.appendChild(row);
	}
	static showAlert(message, className) {
		const messageBox = document.createElement('div');
		messageBox.className = `alert alert-${className}`;
		messageBox.appendChild(document.createTextNode(message));
		const container = document.querySelector('.container');
		const form = document.querySelector('#task-form');
		container.insertBefore(messageBox, form);
		//Hide after 2 sec
		setTimeout(() => {
			document.querySelector('.alert').remove();
		}, 2000);
		//Hide after 2 sec
		// setTimeout(function() {
		// 	const alert = document.querySelector('.alert');
		// 	alert.style.display = 'none';
		// }, 2000);
	}
	static clearFields() {
		document.querySelector('#tittel').value = '';
		document.querySelector('#detaljer').value = '';
		document.querySelector('#ansvarlig').value = '';
		document.querySelector('#klassifisering').value = '';
	}
	static deleteTask(element) {
		if (element.classList.contains('delete')) {
			element.parentElement.parentElement.remove();
		}
	}
}
//Store Class: Handles Local Storage
class Store {
	static getTasks() {
		let tasks;
		if (localStorage.getItem('tasks') === null) {
			tasks = [];
		}
		else {
			tasks = JSON.parse(localStorage.getItem('tasks'));
		}
		return tasks;
	}
	static addTask(task) {
		//TODO: Finn en annen metode enn Push
		const tasks = Store.getTasks();
		tasks.push(task);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
	static removeTask(id) {
		//TODO: Finn et parameter () kanskje tittel
		const tasks = Store.getTasks();
		tasks.forEach((task, index) => {
			//TODO: .map eller sjekke mingl prosjekt for rmeove
			if (task.id === id) {
				tasks.splice(index, 1);
			}
		});

		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
}

//Event: Display added tasks
document.addEventListener('DOMContentLoaded', UI.displayTasks);
//Event: Add a task
document.querySelector('#task-form').addEventListener('submit', (e) => {
	//Prevent form submit
	e.preventDefault();
	//Getting form values
	const tittel = document.querySelector('#tittel').value;
	const detaljer = document.querySelector('#detaljer').value;
	const ansvarlig = document.querySelector('#ansvarlig').value;
	const klassifisering = document.querySelector('#klassifisering').value;

	//Validate all fields are filled in
	if (tittel === '' || detaljer === '' || ansvarlig === '' || klassifisering === '') {
		UI.showAlert('Fill in', 'danger');
	}
	else {
		//instatiate task
		const task = new Task(tittel, detaljer, ansvarlig, klassifisering);
		//console.log(task);

		// Add task to UI
		UI.addTaskToList(task);

		// Add Task to Local Store
		Store.addTask(task);

		//Task added with success
		UI.showAlert('Task added', 'success');

		//Clear fields after submitting task
		UI.clearFields();
	}
});
//Event Remove Task
document.querySelector('#task-list').addEventListener('click', (e) => {
	{
		//Remove task from UI
		UI.deleteTask(e.target);

		//Remove task from store
		Store.removeTask(e.target.parentElement.previousElementSibling.textContent); //49++

		UI.showAlert('Task removed', 'warning');
	}
});
