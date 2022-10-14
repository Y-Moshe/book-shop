function onAddBook() {
  setModalContent('ADD')
  openModal()
}

function onReadBook(id) {
  const book = getBook(id)
  if (!book) return

  setModalContent('READ', book)
  openModal()
}

function onUpdateBook(id) {
  const book = getBook(id)
  if (!book) return

  setModalContent('UPDATE', book)
  openModal()
}

function onDeleteBook(id) {
  const answer = confirm('Are you sure?')
  if (answer) {
    deleteBook(id)
    renderBooks()
  }
}

function onRateChange(id, rate) {
  setBookRate(id, rate)
  renderBooks()
}

function onModalSubmit(ev, actionType, bookId) {
  ev.preventDefault()

  const formData = new FormData(ev.target)
  const bookName = formData.get('bookName')
  const bookPrice = formData.get('bookPrice')

  if (actionType === 'ADD') addBook(bookName, bookPrice)
  else updateBook(bookId, bookName, bookPrice)

  closeModal()
  renderBooks()
}

function onFilterChange(filter, value) {
  setFilter(filter, value)
  renderBooks()
}
