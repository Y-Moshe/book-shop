const BOOKS_STORAGE_KEY = 'books'
const LAYOUT_STORAGE_KEY = 'layout'

function saveBooks(books) {
  localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books))
}

function loadBooks() {
  const books = JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY)) || []
  setBooks(books)
}

function saveLayout(layout) {
  localStorage.setItem(LAYOUT_STORAGE_KEY, layout)
}

function loadLayout() {
  const layout = localStorage.getItem(LAYOUT_STORAGE_KEY) || 'CARDS'
  setLayoutDisplay(layout)
}
