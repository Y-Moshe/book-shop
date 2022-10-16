function openModal() {
  const $modal = $('#modal')
  $modal.modal('show')
  doTrans($modal[0])
}

function closeModal() {
  $('#modal').modal('hide')
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
      template = getTemplate(actionType, book)
      break;
    default:
      template = `
        <div class="container">
          <h3 class="text-center">${book.name}</h3>
          <img src="${book.imgUrl}" alt="book image" class="img-thumbnail" />

          <hr />

          <p>${book.desc}</p>
          <label for="rate"><span data-trans="rate">Rate<span>(${book.rate}):</label>
          <input id="rate" type="number" min="0" max="10" oninput="onRateChange('${book.id}', this.value)" />
          <button type="button" onclick="closeModal()" class="btn btn-danger" data-trans"close">Close</button>
        </div>
      `
      break;
  }

  document.querySelector('.modal-title')
    .innerHTML = `${actionType} ${book && `<span class="badge badge-secondary">${book.id}</span>`}`
  document.querySelector('.modal-body').innerHTML = template
}

function getTemplate(actionType, book = null) {
  const btnClass = actionType === 'ADD' ? 'btn-success' : 'btn-warning'
  const transBtn = actionType === 'ADD' ? 'newBookBtn' : 'update'
  return `
    <form onsubmit="onModalSubmit(event, '${actionType}', '${book?.id}')">
      <div class="form-group">
        <label for="bookName" data-trans="bookName">Book Name</label>
        <input name="bookName" id="bookName" class="form-control w-100" value="${book?.name || ''}" />
      </div>

      <div class="form-group">
        <label for="bookPrice" data-trans="bookPrice">Book Price</label>
        <input name="bookPrice" id="bookPrice" class="form-control w-100" value="${book?.price || ''}" />
      </div>

      <div class="form-group">
        <label for="bookImg" data-trans="bookImg">Book Image</label>
        <input name="bookImg" id="bookImg" class="form-control w-100" value="${book?.imgUrl || ''}" />
      </div>

      <hr />

      <div class="d-flex justify-content-around">
        <button class="btn ${btnClass} w-25" data-trans="${transBtn}">${actionType}</button>
        <button type="button" class="btn btn-secondary w-25" data-dismiss="modal" data-trans="cancel">Cancel</button>
      </div>
    </form>
  `
}
