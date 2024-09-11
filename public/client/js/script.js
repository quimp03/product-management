const buttonSearchHeader = document.querySelector(".box-search")
const searchInputToggle = document.querySelector(".search-input-toggle")
const searchButtonToggle = document.querySelector(".search-button-toggle")
if(buttonSearchHeader){
    buttonSearchHeader.addEventListener("click", (e) => {
        searchInputToggle.classList.toggle("hide")
        searchButtonToggle.classList.toggle("hide")
    })
}