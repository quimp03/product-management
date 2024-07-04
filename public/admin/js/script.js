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
//end filter status