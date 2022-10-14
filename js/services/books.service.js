var gBooks = []
var gFilterBy = {
  maxPrice: Infinity,
  minRate: 0,
  search: ''
}
var gFilteredLength = 0

function getTotalBooks() {
  return gFilteredLength
}

function getBook(id) {
  return gBooks.find(b => b.id === id)
}

function getBooks() {
  const pageCut = (getCurrentPage() - 1) * getPageSize()
  const books = gBooks.filter(book =>
    book.price < gFilterBy.maxPrice &&
    book.rate >= gFilterBy.minRate &&
    book.name.includes(gFilterBy.search)
  )
  gFilteredLength = books.length
  renderPagination()

  return books.slice(pageCut, pageCut + getPageSize())
}

function setBooks(books) {
  gBooks = books
}

function updateBook(id, name, price, imgUrl) {
  const book = gBooks.find(b => b.id === id)
  if (!book) return null

  book.name = name
  book.price = price
  book.imgUrl = imgUrl
  saveBooks(gBooks)
  return book
}

function setBookRate(id, rate) {
  const book = gBooks.find(b => b.id === id)
  if (!book) return null

  book.rate = rate
  saveBooks(gBooks)
}

function addBook(name, price, imgUrl) {
  gBooks.push(_createBook(name, price, imgUrl))
  saveBooks(gBooks)
}

function deleteBook(id) {
  const idx = gBooks.findIndex(book => book.id === id)
  if (idx === -1) return null

  gBooks.splice(idx, 1)[0]
  saveBooks(gBooks)
}

function setFilter(filter, value) {
  gFilterBy[filter] = value
  updateQueryParam(filter, value)
}

function getFilter() {
  return gFilterBy
}

function _createBook(name, price, imgUrl) {
  return {
    id: makeId(),
    name,
    price,
    rate: 0,
    imgUrl,
    desc: makeLorem()
  }
}