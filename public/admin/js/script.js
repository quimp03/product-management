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
          if(type == "change-position"){
            //nếu case là change-position thì cần có thêm vị trí muốn change
            const position = input.closest("tr").querySelector("input[name='position']").value
            ids.push(`${id}-${position}`)
            console.log(ids)
          }else{
            ids.push(id)
          }
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
      const isConfirm = confirm("Bạn có chắc muốn xóa!")
      if(isConfirm){
        formDeleteItem.submit()
      }
      else{
        return
      }
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

//upload-image
const upload = document.querySelector("[upload-image]")
if(upload){
  const uploadImageInputs = document.querySelectorAll("[upload-image-input]")
  const uploadImagePreviews = document.querySelectorAll("[upload-image-preview]")
  uploadImageInputs.forEach((img, index) => {
    img.addEventListener("change", () => {
      const file = img.files[0]
      if(file){
        uploadImagePreviews[index].src = URL.createObjectURL(file)
      }
    })
  })
  
}
// end upload-image


//sort-criteria
const sort = document.querySelector("[sort]")
if(sort){
  const url = new URL(window.location.href)
  const sortSelect = sort.querySelector("[sort-select]")
  sortSelect.addEventListener("change", () => {
    const [sortKey, sortValue] = sortSelect.value.split("-")
    url.searchParams.set("sortKey", sortKey)
    url.searchParams.set("sortValue", sortValue)
    window.location.href = url.href
  })
  const seletedKey = url.searchParams.get("sortKey")
  const seletedValue = url.searchParams.get("sortValue")
  console.log(seletedValue)
  if(seletedKey && seletedValue){
    const stringSort = `${seletedKey}-${seletedValue}`
    const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`)
    optionSelected.selected = true
  }
}
// end sort-criteria
//change-product-category
const listButonChangeStatusCategory = document.querySelectorAll("[button-change-status-product-category]")
if(listButonChangeStatusCategory.length > 0){
  const formChangeStatusCategory = document.querySelector("[form-change-status-product-category]")
  listButonChangeStatusCategory.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const status = button.getAttribute("data-status")
      const dataPath = formChangeStatusCategory.getAttribute("data-path")
      const action = `${dataPath}/${status}/${id}?_method=PATCH`
      formChangeStatusCategory.action = action
      formChangeStatusCategory.submit()
    })
  })
}
//end change-product-category
//delete-product-category
const listButtonDeleteCategory = document.querySelectorAll("[delete-button-product-category]")
if(listButtonDeleteCategory.length > 0){
  const formDeleteCategory = document.querySelector("[form-delete-product-category]")
  listButtonDeleteCategory.forEach(button => {
    button.addEventListener("click",() => {
      const id = button.getAttribute("data-id")
      const dataPath = formDeleteCategory.getAttribute("data-path")
      const action = `${dataPath}/${id}?_method=DELETE`
      formDeleteCategory.action = action
      const isconfirm = confirm("Bạn có chắc muốn xóa không!")
      if(isconfirm){
        formDeleteCategory.submit()
      }else{
        return
      }
    })
  })
}
//end delete-product-category
//delete role
const listBtnDeleteRole = document.querySelectorAll("[btn-delete-role]")
if(listBtnDeleteRole.length > 0){
  const formDeleteRole = document.querySelector("[form-delete-role")
  listBtnDeleteRole.forEach( button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const dataPath = formDeleteRole.getAttribute("data-path")
      const action = `/${dataPath}/${id}?_method=DELETE`
      formDeleteRole.action = action 
      const isConfirm = confirm("Bạn có chắc muốn xóa!")
      if(isConfirm){
        formDeleteRole.submit()
      }
      else{
        return
      }
    })
  })
}
//end delete role
//table permission
const buttonSubmitPermission = document.querySelector("[button-submit-permissions]")
if(buttonSubmitPermission){
  buttonSubmitPermission.addEventListener("click", () => {
    const roles = []
    const tablePermission = document.querySelector("[table-permissions]")
    const rows = tablePermission.querySelectorAll("tbody tr[data-name]")
    rows.forEach((row, index) => {
      const dataName = row.getAttribute("data-name")
      const inputs = row.querySelectorAll("input")
      if(dataName == "id"){
        inputs.forEach(input => {
          const id = input.value
          roles.push({
            id: id,
            permissions: []
          })
        })
      }else{
        inputs.forEach((input,index) => {
          const checkedInput = input.checked
          if(checkedInput){
            roles[index].permissions.push(dataName)
          }
        })
      }
    })
    if(roles.length > 0){
      const formChangePermissions = document.querySelector("[form-change-permissions]")
      const inputRoles = formChangePermissions.querySelector("input[name='roles']")
      inputRoles.value = JSON.stringify(roles)
      formChangePermissions.submit()
    }
  })
}
// Data default Table Permissionss
const  dataRecords = document.querySelector("[data-records]")
if(dataRecords){
  const tablePermissions = document.querySelector("[table-permissions]");
  console.log(tablePermissions)
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  records.forEach((record,index) => {
    const permissions = record.permissions
    permissions.forEach(permission => {
      const row = tablePermissions.querySelector(`tr[data-name="${permission}"]`)
      const input = row.querySelectorAll(`input`)[index]
      input.checked = true
    })
  })
}
//end Data default Table Permissions
//button change status account
const listBtnChangeStatusAccount = document.querySelectorAll("[button-change-status-account]")
if(listBtnChangeStatusAccount.length > 0){
  const formChangeStatusAccount = document.querySelector("[form-change-status-account]")
  listBtnChangeStatusAccount.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("data-status")
      const id = button.getAttribute("data-id")
      const dataPath = formChangeStatusAccount.getAttribute("data-path")
      const action = `${dataPath}/${id}/${status}?_method=PATCH`
      formChangeStatusAccount.action = action
      formChangeStatusAccount.submit()
    })
  })
}
//end button change status account
//button delete account
const listBtnDeleteAccount = document.querySelectorAll("[butonn-delete-account]")
if(listBtnDeleteAccount.length > 0){
  listBtnDeleteAccount.forEach(button => {
    const formDeleteAccount = document.querySelector("[form-delete-account]")
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const dataPath = formDeleteAccount.getAttribute("data-path")
      const action = `${dataPath}/${id}?_method=DELETE`
      formDeleteAccount.action = action
      const isConfirm = confirm("Bạn có chắc muốn xóa không!")
      if(isConfirm){
        formDeleteAccount.submit()
      }else{
        return
      }
    })
  })
}
//end button delete account


// Hàm thêm khung upload mới
function addUploadField() {
  // Tạo một div mới cho khung upload
  const uploadContainer = document.createElement("div");
  uploadContainer.className = "upload-wrapper";
  uploadContainer.innerHTML = `
    <input
      type="file"
      class="form-control-file"
      name="slideshow"
      accept="image/*"
      onchange="previewImage(this)"
    />
    <img
      class="image-preview"
      src=""
      style="max-width: 150px; display: none;"
    />
  `;

  // Thêm div mới vào slideshow container
  document.querySelector(".slideshow-container").appendChild(uploadContainer);
}

// Hàm preview ảnh khi chọn file
function previewImage(input) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = input.nextElementSibling; // Chọn phần tử img
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}