const currentPage = location.pathname
const menuItems = document.querySelectorAll("header.links a")

for(item of menuItems) {
    if(currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}


function paginate(totalPages, selectedPage) { 
    let pages = [], oldPage
    
    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
        
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if(firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
            if(oldPage && currentPage - oldPage > 2) {
                pages.push("...") 
            }

            if(oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }
            
            pages.push(currentPage)

            oldPage = currentPage
        }
        console.log(pages)
    }

    return pages
}

const pagination = document.querySelector(".pagination")
const page = +pagination.dataset.page
const total = +pagination.dataset.total
