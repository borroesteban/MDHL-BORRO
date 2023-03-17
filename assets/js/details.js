import data from './data.js'
let detailContainer = document.querySelector("#eventDetail")

const queryString = location.search

const params = new URLSearchParams(queryString)

const cardId = params.get("id")

const cardDetail = data.events.find( cardDetail => cardDetail._id == cardId )

console.log(cardDetail)

function createDetail (cardDetail, container){
    let div = document.createElement('div')
    div.classList = 'card-big d-flex'
    div.innerHTML = 
    `
    <div class="container detailRow">
        <div class="row">
            <div class="col-lg-8 detailCol">
                <div>
                    <img class ="detailIMG" src="${cardDetail.image}" alt="event image">
                </div>
            </div>
            <div class="col-lg-4 detailCol">
                <div>
                    <h4>${cardDetail.name}</h4>
                </div>
                <div>
                    <h5>Date: ${cardDetail.date}</h5>
                </div>
                <div>
                    <h6>${cardDetail.description}</h6>
                </div>
            </div>
        </div>
    </div>
    `                
    container.appendChild(div)
}

createDetail(cardDetail, detailContainer)
