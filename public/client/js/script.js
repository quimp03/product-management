// toggle find header
const buttonSearchHeader = document.querySelector(".box-search")
const searchInputToggle = document.querySelector(".search-input-toggle")
const searchButtonToggle = document.querySelector(".search-button-toggle")
if(buttonSearchHeader){
    buttonSearchHeader.addEventListener("click", (e) => {
        searchInputToggle.classList.toggle("hide")
        searchButtonToggle.classList.toggle("hide")
    })
}
//end toggle find header
//show-alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
  let time = showAlert.getAttribute("data-time")
  time = parseInt(time)
  // sau time thi an no di
  setTimeout(() => {
    showAlert.classList.add("alert-hidden")
  }, time)
  //khi click vao se an luon
  const closeAlert = document.querySelector("[close-alert]")
  if(closeAlert){
    closeAlert.addEventListener("click", ()=> {
      showAlert.classList.add("alert-hidden")
    })
  }
}
//end show-alert