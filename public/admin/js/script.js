//filter status
const listButtonFilterStatus = document.querySelectorAll("[button-status]")
if(listButtonFilterStatus.length > 0){
    const url = new URL(window.location.href)
    listButtonFilterStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status")
           if(status){
            url.searchParams.set("status",status)
           }else{
            url.searchParams.delete("status")
           }
           window.location.href = url.href
        })
    })
}
// end filter status
// Form Search
const formSearch = document.querySelector("#form-search");
if(formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = event.target.elements.keyword.value;

    if(keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// End Form Search
//pagination
const listButtonsPagination = document.querySelectorAll("[button-pagination]")
if(listButtonsPagination.length > 0 ){
    const url = new URL(window.location.href)
    listButtonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")
            if(page){
                url.searchParams.set("page", page)
            }
            window.location.href = url.href
        })
    })
}
//end pagination
//change status
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]")
if(listButtonChangeStatus.length > 0 ){
  const formChangeStatus = document.querySelector("[form-change-status]")
  listButtonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("data-status")
      const id = button.getAttribute("data-id")
      const path = formChangeStatus.getAttribute("data-path")
      const action = `${path}/${status}/${id}?_method=PATCH`
      formChangeStatus.action = action
      formChangeStatus.submit()
    })
  })
}
//end change status
//check-box multi
const checkBoxMulti = document.querySelector("[checkbox-multi]")
if(checkBoxMulti){
  const checkBoxAll = checkBoxMulti.querySelector("input[name='checkall']")
  const listCheckBox = checkBoxMulti.querySelectorAll("input[name='id']")
  checkBoxAll.addEventListener("click", () => {
    if(checkBoxAll.checked){
      listCheckBox.forEach(input =>{
        input.checked = true
      })
    }else{
      listCheckBox.forEach(input => {
        input.checked = false
      })
    }
  })

  listCheckBox.forEach(input => {
    input.addEventListener("click", () => {
      const lengthListInputChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked").length
      const lengthListCheckBox = listCheckBox.length
      if(lengthListCheckBox == lengthListInputChecked){
        checkBoxAll.checked = true
      }else{
        checkBoxAll.checked = false
      }
    })
  })
}
//end check-box multi
//form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
    const ids = []
    formChangeMulti.addEventListener("submit", (event) => {
      event.preventDefault()
      const type = formChangeMulti.querySelector("select[name='type']").value
      const listCheckedMulti = document.querySelectorAll("input[name='id']:checked")
      if(listCheckedMulti.length > 0){
        listCheckedMulti.forEach(input => {
          const id = input.getAttribute("value")
          ids.push(id)
        })
          const stringIds = ids.join(", ")
          let input = document.querySelector("input[name='ids']")
          input.value = stringIds
          if(type == "deleteAll"){
            const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này?")
            if(!isConfirm){
              return
            }
          }
          formChangeMulti.submit()
      }else{
        alert("Vui lòng nhập ít nhất một bản ghi!");
      }
    })
}
//end-form-change-multi
//button-delete-item
const listButtonDelete = document.querySelectorAll("[button-delete-item]")
if(listButtonDelete.length > 0){
  const formDeleteItem = document.querySelector("[form-delete]")
  listButtonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const dataPath = formDeleteItem.getAttribute("data-path")
      const action = `${dataPath}/${id}?_method=DELETE`
      formDeleteItem.action = action
      formDeleteItem.submit()
    })
  })
}
//end-button-delete-item
//delete-item-vv
const listButtonItemDeleteVv = document.querySelectorAll("[button-delete-item-vv]")
if(listButtonItemDeleteVv.length > 0){
  const formDeleteItemVv = document.querySelector("[form-delete-vv]") 
  listButtonItemDeleteVv.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const dataPath = formDeleteItemVv.getAttribute("data-path")
      const action = `${dataPath}/${id}?_method=DELETE`
      formDeleteItemVv.action = action 
      formDeleteItemVv.submit()
    })
  })
}
//end-delete-item-vv
//restore-item
const listButtonRestoreItem = document.querySelectorAll("[button-restore-item]")
if(listButtonRestoreItem.length > 0){
  const formRestoreItem = document.querySelector("[form-restore-item]")
  listButtonRestoreItem.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const dataPath = formRestoreItem.getAttribute("data-path")
      const action = `${dataPath}/${id}?_method=PATCH`
      formRestoreItem.action = action
      formRestoreItem.submit()
    })
  })
}
//end restore-item
