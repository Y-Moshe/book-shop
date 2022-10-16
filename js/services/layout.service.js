var gDisplayLayout = 'CARDS'

function getDisplayLayout() {
  return gDisplayLayout
}

function setLayoutDisplay(layout) {
  gDisplayLayout = layout
  saveLayout(layout)
  renderBooks()
}
