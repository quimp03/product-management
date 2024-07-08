module.exports = (req, countRecord) => {
    const objectPagination = {
        currentPage: 1,
        limitItems: 3
    }
    //Lay page tren router
    if(req.query.page){
            objectPagination.currentPage = parseInt(req.query.page)
    }
    //cong thuc skip theo so page
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems
    //lam tron so page
    objectPagination.totalPage = Math.ceil(countRecord/objectPagination.limitItems)
    return objectPagination
}
