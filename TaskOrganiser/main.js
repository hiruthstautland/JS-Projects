//Task Class: Each task creates a task-object
class Task {
    constructor(tittel, ansvarlig, klassifisering){
        this.tittel = tittel;
        this.ansvarlig = ansvarlig;
        this.klassifisering = klassifisering;
    }
}
//UI Class: Handle UI Tasks, User Interface 
class UI{
    static displayTasks(){              
        const storedTasks = [               //Local storage
            {tittel: "Lage Middag",
            detaljer: "Handle og forered",
            ansvarlig: "Mina",
            klassifisering: "Høy!"
        },
            {tittel: "Vaske Opp",
            ansvarlig: "Hiruth",
            detaljer: "Vaske/oppvaskmaskin",
            klassifisering: "Høy!"
        },
            {tittel: "Drikke Te",
            ansvarlig: "Mina",
            detaljer: "Stue og soverom",
            klassifisering: "Lav!"
        },
            {tittel: "Rydde",
            ansvarlig: "Hiruth",
            detaljer: "Stue og soverom",
            klassifisering: "Medium!"
        }
        ];

    // Prøv -> const tasks = storedTasks.map(task =>
        //      <div key="task.id">
        //          <div> $ {task.tittel} </div>
        //          <div> $ {task.ansvarlig} </div>
        //          <div> $ {task.klassifisering} </div>
        //     </div>
        //      );
 
        const tasks = storedTasks;
        tasks.forEach(task =>
            UI.addTaskToList(task));
    }

    static addTaskToList(task){
        const list = document.querySelector('#task-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td> ${task.tittel} </td>
        <td> ${task.detaljer} </td>
        <td> ${task.ansvarlig} {</td>
        <td> ${task.klassifisering} </td>
        <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
        `;
        list.appendChild(row);
    }
    static clearFields(){
        document.querySelector('#tittel').value = "";
        document.querySelector('#detaljer').value = "";
        document.querySelector('#ansvarlig').value = "";
        document.querySelector('#klassifisering').value = "";
    }
}
//Store Class: Handles Local Storage

//Event: Display added tasks
document.addEventListener('DOMContentLoaded', UI.displayTasks);
//Event: Add a task
document.querySelector('#task-form').addEventListener('submit', (e) =>
{
    //Prevent form submit
    e.preventDefault();
    //Getting form values
    const tittel = document.querySelector('#tittel').value;
    const detaljer = document.querySelector('#detaljer').value;
    const ansvarlig = document.querySelector('#ansvarlig').value;
    const klassifisering = document.querySelector('#klassifisering').value;

    //instatiate book
    const task = new Task(tittel, detaljer, ansvarlig, klassifisering)

    console.log(task);
    // Add task to UI
    UI.addTaskToList(task)

    //Clear fields after submitting task
    UI.clearFields();
} )
//Event Remove Task