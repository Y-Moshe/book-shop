const PAGE_SIZE = 5

var gCurrPage = 1

function getPageSize() {
  return PAGE_SIZE
}

function getCurrentPage() {
  return gCurrPage
}

function setCurrentPage(page) {
  gCurrPage = page
  updateQueryParam('page', page)
}

function renderPagination() {
  const totalPages = Math.ceil(getTotalBooks() / PAGE_SIZE)
  const items = []
  const disablePrevClass = gCurrPage === 1 ? 'disable-page' : ''
  const disableNextClass = gCurrPage === totalPages ? 'disable-page' : ''

  items.push(`<div class="pagination-item previous-page ${disablePrevClass}" onclick="paginate(${gCurrPage}, -1, ${totalPages})">\<</div>`)
  for (let i = 1; i <= totalPages; i++) {
    items.push(getPaginationItem(i, totalPages))
  }
  items.push(`<div class="pagination-item next-page ${disableNextClass}" onclick="paginate(${gCurrPage}, 1, ${totalPages})">\></div>`)

  document.querySelector('.pagination').innerHTML = items.join('')
}

function getPaginationItem(pageNumber, totalPages) {
  return `
    <div class="pagination-item ${pageNumber === gCurrPage ? 'active-page' : ''}"
    onclick="paginate(${pageNumber}, 0, ${totalPages})">${pageNumber}</div>
  `
}

function paginate(page, step, totalPages) {
  const nextPage = page + step
  if (nextPage < 1 || nextPage > totalPages) return

  setCurrentPage(nextPage)
  renderPagination()
  renderBooks()
}
