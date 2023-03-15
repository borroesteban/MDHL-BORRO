import data from './data.js'
let detailContainer = document.querySelector("#eventDetail")

const queryString = location.search

const params = new URLSearchParams(queryString)

const cardId = params.get("id")

const cardDetail = data.events.find( cardDetail => cardDetail._id == cardId )

console.log(cardDetail)

function createDetail (cardDetail, container){
    let div = document.createElement('div')
    div.classList = 'card-big d-flex bg-Light gap-2 rounded p-3'
    div.style = 'width: 90%; height 90%;'
    div.innerHTML = 
    `
    <div class="container">
    <div class="row">

            <div class="col-12">
                <img class = 'bg-light object-fit-contain p-3' src="${cardDetail.image}" alt="event image"
            </div>
            <div class="col">
                <h1>${cardDetail.name}</h1>
            </div>
            
            <div class="col">
                <h4>Date: ${cardDetail.date}</h4>
            </div>
            
            <div class="col">
                <h5>${cardDetail.description}</h5>
            </div>
        </div>
    </div>
    `
    container.appendChild(div)
}

createDetail(cardDetail, detailContainer)
