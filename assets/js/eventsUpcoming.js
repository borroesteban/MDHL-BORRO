/*some dark magic*/
let data=""
let uniqueCategories=""

/*jason connection and function calls*/
async function getData() {
    try {
        let apiUrl = '/assets/js/amazing.json'
        let response = await fetch(apiUrl);
        data = await response.json();
        createCategories(data)
        buildCard(data.events, eventCard);
        buildCheckBox(uniqueCategories, checkBox);
    }
    catch (error) {
        console.log(error);
    }
}
getData()

/*map and reduce array of categories*/
function createCategories(data){
    const categories = data.events.map((product) => product.category);
    uniqueCategories = categories.reduce((acc, category) => {
    if (!acc.includes(category)) {
        acc.push(category);
    }
    return acc;
    }, []);
    return uniqueCategories;
}



/*print checkboxes based on reduced category array*/
let checkBox = document.getElementById("generatedCheckBox");
const checkBoxfragment = document.createDocumentFragment();
function buildCheckBox(checkBoxArray, container) {
    for (let category of checkBoxArray) {
        let div = document.createElement("div")
        div.className = "generatedCheckBox"
        div.innerHTML += `<input class="form-check-input" type="checkbox" value="${category}" id="${category}" name="categories">
        <label class="form-check-label" for="${category}">${category}</label><br>`
    checkBoxfragment.appendChild(div);
    }
    container.appendChild(checkBoxfragment);
}




/*print event cards from data.js*/
let eventCard = document.getElementById("cardContainer");
const fragment = document.createDocumentFragment();
function buildCard(eventsArray, container) {
    for (let newCard of eventsArray) {
        if (data.currentDate < newCard.date) {
            let div = document.createElement("div")
            div.className = "card"
            div.innerHTML += `<img src="${newCard.image}" class="card-img-top"
        alt="...">
    <div class="card-body">
        <h5 class="card-title">${newCard.name}</h5>
        <p class="card-text">${newCard.category}</p>
        <p>${"price: $" + newCard.price}</p>
        <a href="./details.html?id=${newCard._id}" class="btn btn-primary" class="btn btn-primary">Event Details</a>
    </div>`
            fragment.appendChild(div);
        }
    }
    container.appendChild(fragment);
}


/*search by checkbox*/
const filterCheck = (array) => {
    let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    let reChecked = checked.map(e => e.id.toLowerCase())
    console.log(array)
    let filterChecks = array.filter(data => reChecked.includes(data.category.toLowerCase()))
    console.log(filterChecks);
    if (filterChecks.length > 0) {
        return filterChecks
    } else {
        return array
    }
}
/*search by text filter*/
const $search = document.getElementById("searchBox");
const filterSearch = (array, value) => {
    let filteredArray = array.filter(e => e.name.toLowerCase().includes(value.toLowerCase()))
    return filteredArray
}

/*mixed filters*/

const filterAndPrint = (array) => {
    let newArray = filterCheck(array)
    newArray = filterSearch(newArray, $search.value)
    return newArray
}

/*added events*/
checkBox.addEventListener('change', () => {
    let filterData = filterAndPrint(data.events)
    if (filterData.length === 0) {
        eventCard.innerHTML =
            `
        <h4>No se encontraron resultados</h4>
        `
    } else {
        eventCard.innerHTML = "";
        buildCard(filterData, eventCard);
    }
})

$search.addEventListener('keyup', (e) => {
    let filterData = filterAndPrint(data.events)
    if (filterData.length === 0) {
        eventCard.innerHTML =
            `
        <h4>No se encontraron resultados</h4>
        `
    } else {
        eventCard.innerHTML = "";
        buildCard(filterData, eventCard);
    }
})