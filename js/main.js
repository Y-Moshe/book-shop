function onInit() {
  useQueryParams()
  loadBooks()
  renderBooks()
  renderPagination()
}

function useQueryParams() {
  const queryParams = new URLSearchParams(window.location.search);
  for (const [key, value] of queryParams.entries()) {
    if (key === 'page') continue
    setFilter(key, isNumberInString(value) ? +value : value)
  }
  setDefaultValues()
  setCurrentPage(+queryParams.get('page') || 1)
}

function setDefaultValues() {
  const filter = getFilter()
  for (const key in filter) {
    const elInput = document.querySelector(`body input[name=${key}]`)
    elInput.setAttribute('value', filter[key])
  }
}

function renderBooks() {
  const layout = getDisplayLayout()
  let books = getBooks()

  if (layout === 'TABLE') books = getTableBooks(books)
  else if (layout === 'CARDS') books = getCardsBooks(books)

  const elBooksContainer = document.querySelector('.books-container')
  elBooksContainer.innerHTML = books
}

function getTableBooks(books) {
  const booksRows = books.map(book => `
    <tr>
      <td class="cell">${book.id}</td>
      <td class="cell">${book.name}</td>
      <td class="cell">$${book.price}</td>
      <td class="cell">
        <button class="btn btn-read"   onclick="onReadBook('${book.id}')">Read</button>
        <button class="btn btn-update" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="btn btn-delete" onclick="onDeleteBook('${book.id}')">Delete</button>
      </td>
    </tr>
  `)

  booksRows.unshift(`
    <tr>
      <th class="cell">ID</th>
      <th class="cell">Name</th>
      <th class="cell">Price</th>
      <th class="cell">Actions</th>
    </tr>
  `)

  return `
    <table border="1">
      <tbody>
        ${booksRows.join('')}
      </tbody>
    </table>
  `
}

function getCardsBooks(books) {
  const booksCards = books.map(book => `
    <div class="card">
      <div class="card-title">${book.id}, ${book.name}</div>
      <div class="card-content">
       <img src="${book.imgUrl}" alt="book photo" class="card-image" />
       <p>${book.price}</p>
      </div>
      <div class="card-actions">
        <button class="btn btn-read"   onclick="onReadBook('${book.id}')">Read</button>
        <button class="btn btn-update" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="btn btn-delete" onclick="onDeleteBook('${book.id}')">Delete</button>
      </div>
    </div>
  `)

  booksCards.unshift(`<div class="card">+</div>`)
  return booksCards.join('')
}
