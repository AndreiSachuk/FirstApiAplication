const navigation = document.querySelector("#navigation")
const main = document.querySelector("#main")
const modal = document.querySelector("#exampleModal")
const search = document.querySelector('#search')
const inputSearch = document.querySelector('#inputSearch')

let requestURL = 'https://swapi.dev/api/people/?page=1'

let count = 0;
let peoples = [];
let pages = 0;
let pageSelected = 1;
let flag;

updatePage()

main.addEventListener('click', function (event) {
  if (event.target.innerText === "More information") {
    for (let i = 0; i < peoples.length; i++) {
      if (event.path[0].id === `btn-${i}`)
        sendRequest(`${peoples[i].url}`)
          .then(peopleDescription => {
            modal.innerHTML =
              `
          <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">${peopleDescription.name}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    Gender: ${peopleDescription.gender} <br>
                    Mass: ${peopleDescription.mass} <br>
                    Birth year: ${peopleDescription.birth_year} <br>
                    Scin color: ${peopleDescription.skin_color} <br>
                    Created: ${peopleDescription.created} <br>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
        `
          })
    }
  }
});

navigation.onclick = function (event) {
  currentSelected = event.path[1].innerText;
  if (currentSelected === "Previous") {
    pageSelected--
    if (pageSelected < 1)
      pageSelected = 1
  }
  else if (currentSelected === "Next") {
    pageSelected++
    if (pageSelected > pages)
      pageSelected = pages;
  }
  else pageSelected = currentSelected;
  if (flag === 'search')
    requestURL = `https://swapi.dev/api/people/?search=${inputSearch.value}&page=${pageSelected}`
  else requestURL = `https://swapi.dev/api/people/?page=${pageSelected}`
  updatePage()
}

search.addEventListener('click', function (event) {
  pageSelected = 1
  requestURL = `https://swapi.dev/api/people/?search=${inputSearch.value}&page=1`
  flag = 'search'
  event.preventDefault()
  updatePage()
}
)

function sendRequest(url) {
  return fetch(url).then(response => response.json())
}

function updatePage() {
  main.classList = "text-center"
  main.innerHTML =
    `<div class="text-center">
        <div class="spinner-border" role="status">
           <span class="sr-only"></span>
        </div>
      </div>`
  sendRequest(requestURL)
    .then(data => {
      main.classList = "row row-cols-1 row-cols-md-2 row-cols-xl-5 text-center g-3 m-3"
      peoples = data.results
      count = data.count
      cards()
      pagination()
    })
    .catch(err => console.err(err))
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
  if (liSet.innerText === '1') {
    navigation.firstChild.classList.add('d-none')
  }
  if (liSet.innerText === `${pages}`) {
    navigation.lastChild.classList.add('d-none')
  }
}

function cards() {
  let imgLink = "";
  main.innerHTML = ""
  for (let i = 0; i < peoples.length; i++) {
    switch (peoples[i].gender) {
      case "male":
        imgLink = `<img src="https://for-male.ru/wp-content/uploads/2020/11/stilnyj-muzhchina.jpg" class="card-img-top" style="height: 400px" alt="male"></img>`
        break;
      case "female":
        imgLink = `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG4vSyA2zSAm16XDEF3i8SDAZw6tHQUY2ixA&usqp=CAU" style="height: 400px" class="card-img-top" alt="female">`
        break;
      default:
        imgLink = `<img src="https://im.kommersant.ru/Issues.photo/CORP/2019/07/23/KMO_111307_25942_1_t222_135708.jpg" style="height: 400px" class="card-img-top" alt="robot"></img>`
        break;
    }
      main.innerHTML +=
        `<li class="col page-item">
            <div class="card h-100 ">
            ${imgLink}
              <div class="card-body ">
                <h5 class="card-title ">${peoples[i].name}</h5>
                <p class="card-text">mass: ${peoples[i].mass}</p>
                <a href="#" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn-${i}">More information</a>
              </div>
            </div>
          </li>`
  }
}



