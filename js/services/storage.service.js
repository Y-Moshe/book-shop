const STORAGE_KEY = 'books'

function loadBooks() {
  const books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  setBooks(books)
}

function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}
