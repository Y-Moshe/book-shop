function onInit() {
  useQueryParams()
  loadBooks()
  loadLayout()
  setActiveLayout()
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
    const elInput = document.querySelector('#' + key)
    elInput.setAttribute('value', filter[key])
  }
}

/*************** Books Render ***************/

function renderBooks() {
  const layout = getDisplayLayout()
  let books = getBooks()

  if (layout === 'TABLE') books = getTableBooks(books)
  else if (layout === 'CARDS') books = getCardsBooks(books)

  document.querySelector('.books-container').innerHTML = books
}

function getTableBooks(books) {
  const booksRows = books.map(book => `
    <tr>
      <td scope="row">${book.id}</td>
      <td>${book.name}</td>
      <td>$${book.price}</td>
      <td>${book.rate}</td>
      <td class="btn-group d-flex justify-content-center">
        <button class="btn btn-info"    onclick="onReadBook('${book.id}')">Read</button>
        <button class="btn btn-warning" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="btn btn-danger"  onclick="onDeleteBook('${book.id}')">Delete</button>
      </td>
    </tr>
  `)

  return `
    <table class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Rate</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${booksRows.join('')}
      </tbody>
    </table>
  `
}

function getCardsBooks(books) {
  const booksCards = books.map(book => `
    <div class="card m-1 p-1" style="width: 250px">
      <div class="card-title">${book.name}</div>
      <div class="card-body">
        <img src="${book.imgUrl}" alt="book photo" class="img-fluid" />
       </div>
       <p>$${book.price}</p>
       <div class="d-flex justify-content-between p-1">
        <button class="btn btn-info"    onclick="onReadBook('${book.id}')">Read</button>
        <button class="btn btn-warning" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="btn btn-danger"  onclick="onDeleteBook('${book.id}')">Delete</button>
      </div>
    </div>
  `)

  return booksCards.join('')
}

/*************** Pagination Render ***************/

function renderPagination() {
  const totalPages = Math.ceil(getTotalBooks() / PAGE_SIZE)
  const currPage = getCurrentPage()
  const items = []
  const disablePrevClass = currPage === 1 ? 'disabled' : ''
  const disableNextClass = currPage === totalPages ? 'disabled' : ''

  items.push(`<li class="page-item ${disablePrevClass}"
    onclick="paginate(${currPage}, -1, ${totalPages})"><span class="page-link">&laquo;</span></li>`)

  for (let i = 1; i <= totalPages; i++) {
    items.push(getPaginationItem(i, currPage, totalPages))
  }

  items.push(`<li class="page-item ${disableNextClass}"
    onclick="paginate(${currPage}, 1, ${totalPages})"><span class="page-link">&raquo;</span></li>`)

  document.querySelector('.pagination').innerHTML = items.join('')
}

function getPaginationItem(pageNumber, currPage, totalPages) {
  return `
    <li class="page-item ${pageNumber === currPage ? 'active' : ''}"
      onclick="paginate(${pageNumber}, 0, ${totalPages})"><span class="page-link">${pageNumber}</span></li>
  `
}

/*************** onLayoutChange ***************/

function onLayoutChange(elCurr) {
  const buttons = document.querySelector('.layout-buttons').children
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    btn.classList.remove('active')
    if (btn === elCurr) {
      btn.classList.add('active')
      setLayoutDisplay(btn.dataset.layout)
    }
  }
}

function setActiveLayout() {
  const layout = getDisplayLayout()
  const activeLayout = document.querySelector(`.layout-buttons button[data-layout="${layout}"]`)
  activeLayout.classList.add('active')
}
