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