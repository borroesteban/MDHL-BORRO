import data from './data.js'
let eventCard = document.getElementById("cardContainer");
const fragment = document.createDocumentFragment();

const currentDate = data.currentDate

function buildCard(eventsArray, container) {
    for (let newCard of eventsArray) {
        if (currentDate < newCard.date) {
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