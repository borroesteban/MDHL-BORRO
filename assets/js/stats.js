/*some dark magic*/
let categories = [];

let arrayOfEvents = [];

let currentDate;

let table = document.getElementById("firstTable");
let data = ""

/*retrieve data and various functions*/
async function getData() {
    try {
        let apiUrl = '/assets/js/amazing.json'
        let response = await fetch(apiUrl);
        data = await response.json();
        arrayOfEvents = data.events;
        currentDate = data.currentDate;
        categories = createCategories(arrayOfEvents);
        let maxAttendanceEvent = arrayOfEvents.sort((a, b) => ((b.assistance) / (b.capacity)) - ((a.assistance) / (a.capacity)))[0];
        let minAttendanceEvent = arrayOfEvents.sort((a, b) => ((a.assistance) / (a.capacity)) - ((b.assistance) / (b.capacity)))[0];
        let capacityEvent = maxCapacityEvent(arrayOfEvents);
        addRow(maxAttendanceEvent.name, minAttendanceEvent.name, capacityEvent.name, table);
        buildTable2(arrayOfEvents, categories, currentDate)
        buildTable3(arrayOfEvents, categories, currentDate)

    }
    catch (error) {
        console.log(error);
    }
}
getData()


/* this function creates the categories */
const createCategories = (data) => {
    let categories = data.map(category => category.category)
    let uniqueCategories = [...(new Set(categories))]
    return uniqueCategories
}

/* this function sorts the events an return the first in the list */

function maxCapacityEvent(events) {
    let capacityEvent = events.sort((a, b) => b.capacity - a.capacity);
    return capacityEvent[0];
}

/* this function adds new rows */

function addRow(feedData1, feedData2, feedData3, container) {
    let newRow = document.createElement("tr");
    let cellOne = document.createElement("td");
    let cellTwo = document.createElement("td");
    let cellThree = document.createElement("td");

    cellOne.textContent = `${feedData1}`; //textContent: ancient magic to set text content for the HTML element
    cellTwo.textContent = `${feedData2}`;
    cellThree.textContent = `${feedData3}`;

    newRow.appendChild(cellOne);
    newRow.appendChild(cellTwo);
    newRow.appendChild(cellThree);
    container.appendChild(newRow);
}


/* this function builds second table */

function buildTable2(arrayOfEvents, categories, currentDate) {
    let secondTable = document.getElementById("secondTable");
    categories.forEach(category => {
        let filteredEvents = arrayOfEvents.filter((event) => event.category === category).filter((event) => event.date < currentDate)
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
        addRow(newObject.name, newObject.revenue, newObject.attendance, secondTable);
    })

}

/* this function builds third table */

function buildTable3(arrayOfEvents, categories, currentDate) {
    let thirdTable = document.getElementById("thirdTable");
    categories.forEach(category => {
        let filteredEvents = arrayOfEvents.filter((event) => event.category === category).filter((event) => event.date > currentDate)
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
        addRow(newObject.name, newObject.revenue, newObject.attendance, thirdTable);
    })
}

