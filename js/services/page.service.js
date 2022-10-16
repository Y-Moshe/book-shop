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

function paginate(page, step, totalPages) {
  const nextPage = page + step
  if (nextPage < 1 || nextPage > totalPages) return

  setCurrentPage(nextPage)
  renderPagination()
  renderBooks()
}
