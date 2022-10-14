function openModal() {
  const elContainer = document.querySelector('.modal-container')
  const elModal = elContainer.querySelector('.modal')
  elContainer.style.display = 'flex'
  setTimeout(() => elModal.classList.add('animate-modal'), 10)
}

function closeModal() {
  const elContainer = document.querySelector('.modal-container')
  const elModal = elContainer.querySelector('.modal')
  elModal.classList.remove('animate-modal')
  setTimeout(() => elContainer.style.display = 'none', 300)
}

/**
 * Set modal content base on the required action
 * @param actionType 'READ' | 'UPDATE' | 'ADD'
 * @param book book object (opional on 'ADD' only)
 */
function setModalContent(actionType, book = null) {
  let template = ''
  switch (actionType) {
    case 'ADD':
      template = getTemplate(actionType)
      break;
    case 'UPDATE':
      template = getTemplate(actionType, book.id)
      break;
    default:
      template = `
        <div class="read-section">
          <h3>${book.name}</h3>
          <p>${book.price}</p>
          ${book.imgUrl ? `<img src="${book.imgUrl}" alt="book image" />` : ''}
          <label for="rate">Rate(${book.rate}):</label>
          <input id="rate" type="number" min="0" max="10" oninput="onRateChange('${book.id}', this.value)" />
          <button type="button" onclick="closeModal()">Close</button>
        </div>
      `
      break;
  }

  document.querySelector('.modal-title').innerHTML = `${actionType} ${book && `<p>${book.id}</p>`}`
  document.querySelector('.modal-content').innerHTML = template
}

function getTemplate(actionType, bookId = null) {
  return `
    <form onsubmit="onModalSubmit(event, '${actionType}', '${bookId}')">
      <div class="inputs-container">
        <label>
          Book Name
          <input name="bookName" class="w-100" />
        </label>

        <label>
          Book Price
          <input name="bookPrice" class="w-100" />
        </label>

        <label>
          Book Image
          <input name="bookImg" class="w-100" />
        </label>
      </div>

      <hr />

      <div class="d-flex justify-content-around">
        <button class="btn btn-${actionType.toLowerCase()} w-25">${actionType}</button>
        <button type="button" onclick="closeModal()" class="btn btn-secondary w-25">Cancel</button>
      </div>
    </form>
  `
}
