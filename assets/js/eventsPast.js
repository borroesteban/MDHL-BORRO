/*selectors and variables for function building and import data*/
import data from './data.js'
let eventCard = document.getElementById("cardContainer");
const fragment = document.createDocumentFragment();
const currentDate = data.currentDate


/*map and reduce array of categories to build checkboxes*/
const categories = data.events.map((product) => product.category);
const uniqueCategories = categories.reduce((acc, category) => {
  if (!acc.includes(category)) {
    acc.push(category);
  }
  return acc;
}, []);

/*build checkboxes based on reduced category array*/
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

buildCheckBox(uniqueCategories, checkBox)

/*buildCard function*/
function buildCard(eventsArray, container) {
    for (let newCard of eventsArray) {
        if (currentDate > newCard.date) {
            let div = document.createElement("div")
            div.className = "card"
            div.innerHTML += `<img src="${newCard.image}" class="card-img-top"
        alt="...">
    <div class="card-body">
        <h5 class="card-title">${newCard.name}</h5>
        <p class="card-text">${newCard.category}</p>
        <p>${"price: $" + newCard.price}</p>
        <a href="#" class="btn btn-primary">Event Details</a>
    </div>`
            fragment.appendChild(div);
        }
    }
    container.appendChild(fragment);
}

buildCard(data.events, eventCard);


/*search by checkbox*/
const filterCheck = (array) => {
    let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    let reChecked = checked.map(e => e.id.toLowerCase())
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