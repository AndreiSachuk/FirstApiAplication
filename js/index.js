const navigation = document.querySelector("#navigation")
const main = document.querySelector("#main")
const modal = document.querySelector("#exampleModal")

let requestURL = 'https://swapi.dev/api/people/?page=1'

let count = 0;
let peoples = [];
let pages = 0;
let pageSelected = 1;

document.addEventListener('click', function(event) {

  console.log(peoples)
   for (let i=0; i<peoples.length; i++){
     if (event.path[0].id === `btn-${i}`)
      modal.innerHTML =
      `
      <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">${peoples[i].name}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                Gender: ${peoples[i].gender} <br>
                Mass: ${peoples[i].mass} <br>
                Birth year: ${peoples[i].birth_year} <br>
                Scin color: ${peoples[i].skin_color} <br>
                Created: ${peoples[i].created} <br>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
      `
   }

});

navigation.onclick = function (event) {
    currentSelected = event.path[1].innerText;
    if (currentSelected === "Previous")
        pageSelected--;
    else if (currentSelected === "Next")
        pageSelected++;
    else pageSelected = currentSelected;
    console.log(pageSelected)
    requestURL = `https://swapi.dev/api/people/?page=${pageSelected}`
    updatePage()
}

function sendRequest(method, url) {
    return fetch(url).then(response => response.json())
}

updatePage()

function updatePage() {
    sendRequest('GET', requestURL)
        .then(data => {
            peoples = data.results
            count = +data.count
            pagination()
            cards()
        })
        .catch(err => console.log(err))
}

function pagination() {
    navigation.innerHTML = ""
    pages = Math.ceil(count / 10)
    navigation.innerHTML += `<li class="page-item"><a class="page-link" href="#" tabindex="-1" aria-disabled="true" id="minus">Previous</a></li>`
    for (let i = 1; i < pages + 1; i++)
        navigation.innerHTML += `<li class="page-item" id="page-${(i)}"><a class="page-link" href="#">${(i)}</a></li>`
    navigation.innerHTML += `<li class="page-item"><a class="page-link" href="#" tabindex="+1" aria-disabled="true" id="plus">Next</a></li>`
    let liSet = document.querySelector(`#page-${pageSelected}`)
    liSet.classList.add('active')
    if (pageSelected === 1)
        navigation.firstChild.classList.add('disabled')
    else if (pageSelected === pages)
        navigation.lastChild.classList.add('disabled')
}

function cards() {
    main.innerHTML = ""
    for (let i = 0; i < peoples.length; i++) {
        if (peoples[i].gender === "male") {
            main.innerHTML +=
                `<li class="col page-item">
            <div class="card h-100">
              <img src="https://for-male.ru/wp-content/uploads/2020/11/stilnyj-muzhchina.jpg" class="card-img-top" alt="male">
              <div class="card-body">
                <h5 class="card-title">${peoples[i].name}</h5>
                <p class="card-text">mass: ${peoples[i].mass}</p>
                <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn-${i}">More information</a>
              </div>
            </div>
          </li>`
        } else
            if (peoples[i].gender === "female") {
                main.innerHTML +=
                    `<li class="col page-item">
            <div class="card h-100">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG4vSyA2zSAm16XDEF3i8SDAZw6tHQUY2ixA&usqp=CAU" class="card-img-top" alt="female">
              <div class="card-body">
                <h5 class="card-title">${peoples[i].name}</h5>
                <p class="card-text">mass: ${peoples[i].mass}</p>
                <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn-${i}">More information</a>
              </div>
            </div>
          </li>`
            } else {
                main.innerHTML +=
                    `<li class="col page-item">
            <div class="card h-100">
            <img src="https://im.kommersant.ru/Issues.photo/CORP/2019/07/23/KMO_111307_25942_1_t222_135708.jpg" class="card-img-top" alt="robot">
              <div class="card-body">
                <h5 class="card-title">${peoples[i].name}</h5>
                <p class="card-text">mass: ${peoples[i].mass}</p>
                <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn-${i}">More information</a>
              </div>
            </div>
          </li>`
            }
    }
}



