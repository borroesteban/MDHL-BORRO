let categories = [];

let eventsarray = [];

let currentDate;

let table = document.getElementById("tbody1");
let data = ""

async function getData() {
    try {
        let apiUrl = '/assets/js/amazing.json'
        let response = await fetch(apiUrl);
        data = await response.json();
        eventsarray = data.events;
        currentDate = data.currentDate;
        categories = createCategories(eventsarray);
        let maxAttendanceEvent = eventsarray.sort((a, b) => ((b.assistance) / (b.capacity)) - ((a.assistance) / (a.capacity)))[0];
        let minAttendanceEvent = eventsarray.sort((a, b) => ((a.assistance) / (a.capacity)) - ((b.assistance) / (b.capacity)))[0];
        let capacityEvent = maxCapacityEvent(eventsarray);
        addFile(maxAttendanceEvent.name, minAttendanceEvent.name, capacityEvent.name, table);
        createCategoryTable(eventsarray, categories, currentDate)
        createCategoryTable2(eventsarray, categories, currentDate)

    }
    catch (error) {
        console.log(error);
    }
}
getData()
/* Necesario para que funcione Get Data */
const createCategories = (data) => {
    let categories = data.map(category => category.category)
    let categoriesUnrepeat = [...(new Set(categories))]
    return categoriesUnrepeat
}

/* FUNCION DE ORDENAMIENTO */

function maxCapacityEvent(events) {
    let capacityEvent = events.sort((a, b) => b.capacity - a.capacity);
    return capacityEvent[0];
}

/*AGREGAR FILA */

function addFile(para1, para2, para3, container) {
    let newRow = document.createElement("tr");
    let celdaColA = document.createElement("td");
    let celdaColB = document.createElement("td");
    let celdaColC = document.createElement("td");

    celdaColA.textContent = `${para1}`;
    celdaColB.textContent = `${para2}`;
    celdaColC.textContent = `${para3}`;

    newRow.appendChild(celdaColA);
    newRow.appendChild(celdaColB);
    newRow.appendChild(celdaColC);
    container.appendChild(newRow);
}


/* TABLA NUMERO 2 */

function createCategoryTable(eventsarray, categories, currentDate) {
    let secondTable = document.getElementById("tbody2");
    categories.forEach(category => {
        let filteredEvents = eventsarray.filter((event) => event.category === category).filter((event) => event.date < currentDate)
        let eventsRevenueEstimate = 0;
        let eventPerCategory = 0;
        for (let i = 0; i < filteredEvents.length; i++) {
            eventsRevenueEstimate += filteredEvents[i].price * filteredEvents[i].assistance;
            eventPerCategory+= 1;
        }
        let eventsPercentageAtt = 0;
        filteredEvents.forEach(event => {
            let eventAtt = ((event.assistance*100)/event.capacity)/eventPerCategory;
            eventsPercentageAtt += eventAtt;
        }
        )
        let newObject = {
            name: category,
            quantity: eventPerCategory,
            revenue: `$${eventsRevenueEstimate}`,
            attendance: `${eventsPercentageAtt.toFixed(2)}%`,  
        }
        addFile(newObject.name, newObject.revenue, newObject.attendance, secondTable);
    })

}

/*TERCER TABLA */

function createCategoryTable2(eventsarray, categories, currentDate) {
    let thirdTable = document.getElementById("tbody3");
    categories.forEach(category => {
        let filteredEvents = eventsarray.filter((event) => event.category === category).filter((event) => event.date > currentDate)
        let eventsRevenueEstimate = 0;
        let eventPerCategory = 0;
        for (let i = 0; i < filteredEvents.length; i++) {
            eventsRevenueEstimate += filteredEvents[i].price * filteredEvents[i].estimate;
            eventPerCategory+= 1;
        }
        let eventsPercentageAtt = 0;
        filteredEvents.forEach(event => {
            let eventAtt = ((event.estimate*100)/event.capacity)/eventPerCategory;
            eventsPercentageAtt += eventAtt;
        }
        )
        let newObject = {
            name: category,
            quantity: eventPerCategory,
            revenue: `$${eventsRevenueEstimate}`,
            attendance: `${eventsPercentageAtt.toFixed(2)}%`,  
        }
        addFile(newObject.name, newObject.revenue, newObject.attendance, thirdTable);
    })
}

