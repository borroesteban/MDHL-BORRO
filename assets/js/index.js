import data from './data.js'

let checkBox = document.getElementById("generatedCheckBox");
const checkBoxfragment = document.createDocumentFragment();
function buildCheckBox(checkBoxArray, container) {
    for (let newCheckBox of checkBoxArray) {
        let div = document.createElement("div")
        div.className = "generatedCheckBox"
        div.innerHTML += `<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                          <label for="category">${newCheckBox.category}</label><br>`
    checkBoxfragment.appendChild(div);
    }
    container.appendChild(checkBoxfragment);
}

buildCheckBox(data.events, checkBox)


let eventCard = document.getElementById("cardContainer");
const fragment = document.createDocumentFragment();
function buildCard(eventsArray, container) {
    for (let newCard of eventsArray) {
        let div = document.createElement("div")
        div.className = "card"
        div.innerHTML += `<img src="${newCard.image}" class="card-img-top"
        alt="...">
    <div class="card-body">
        <h5 class="card-title">${newCard.name}</h5>
        <p class="card-text">${newCard.category}</p>
        <p>${"price: $" + newCard.price}</p>
        <a href="#" class="btn btn-primary">Show Details</a>
    </div>`
    fragment.appendChild(div);
    }
    container.appendChild(fragment);
}

buildCard(data.events, eventCard)