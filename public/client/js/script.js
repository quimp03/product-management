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
// update Cart
const tableCart = document.querySelector("[table-cart]")
if(tableCart){
  const listButtonQuantity =  tableCart.querySelectorAll("input[name='quantity']")
  listButtonQuantity.forEach(input => {
    input.addEventListener("change", () => {
      const quantity = input.value 
      const productId = input.getAttribute("item-id")
      window.location.href = `/cart/update/${productId}/${quantity}`
    })
  })
}
// end update cart
const currentValue = document.querySelector("[currentValuePassword]");
const newValue = document.querySelector("[newValuePassword]");
const confirmPassword = document.querySelector("[confirmPassword]");
const formConfirmPassword = document.querySelector("[formConfirmPassword]");

if (formConfirmPassword) {
  formConfirmPassword.addEventListener("submit", (e) => {
    e.preventDefault();
    if (currentValue.value !== newValue.value) {
      alert("Mật khẩu không khớp!");
      currentValue.value = '';
      newValue.value = '';
      return
    } else {
      formConfirmPassword.submit();
    }
  });
}
// slide show
const listImage = document.querySelector(".list-images")
const images = listImage.getElementsByTagName("img")
const btnLeft = document.querySelector('.btn-left')
const btnRight = document.querySelector('.btn-right')
let currentPosition = 0
// hàm xử lí action slide img right
const handleChangeSlide = () => {
  if(currentPosition == images.length - 1){
    currentPosition = 0
    listImage.style.transform = `translateX(${0}px)`
    document.querySelector(".active").classList.remove('active')
    document.querySelector(".index-item-" + currentPosition).classList.add("active")
  }else{
    currentPosition ++
    let width = images[0].offsetWidth
    listImage.style.transform = `translateX(${width * -1 * currentPosition}px)`
    document.querySelector(".active").classList.remove('active')
    document.querySelector(".index-item-" + currentPosition).classList.add("active")
  }
}
let handleEnventChageSlide = setInterval(handleChangeSlide, 5000)
// xử lí action slide img right
btnRight.addEventListener("click", () => {
  clearInterval(handleEnventChageSlide)
  handleChangeSlide()
  handleEnventChageSlide = setInterval(handleChangeSlide, 5000)
})
// xử lí action slide img left
btnLeft.addEventListener('click', () => {
  clearInterval(handleEnventChageSlide)
  if(currentPosition == 0){
    currentPosition = images.length - 1
    let width = images[0].offsetWidth
    listImage.style.transform = `translateX(${width * -1 * currentPosition}px)`
    document.querySelector(".active").classList.remove('active')
    document.querySelector(".index-item-" + currentPosition).classList.add("active")
  }else{
    currentPosition --
    let width = images[0].offsetWidth
    listImage.style.transform = `translateX(${width * -1 * currentPosition}px)`
    document.querySelector(".active").classList.remove('active')
    document.querySelector(".index-item-" + currentPosition).classList.add("active")
  }
  handleEnventChageSlide = setInterval(handleChangeSlide, 5000)
})
// end slide show