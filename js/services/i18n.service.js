var gCurrLang = 'en'
var gTrans = {
  'langLabel': {
    en: 'Language',
    he: 'שפה'
  },
  'enOption': {
    en: 'English',
    he: 'אנגלית'
  },
  'heOption': {
    en: 'Hebrew',
    he: 'עברית'
  },
  'newBookBtn': {
    en: 'Create a New Book',
    he: 'צור ספר חדש'
  },
  'searchByBook': {
    en: 'Search by Book Name',
    he: 'חפש ע"י שם ספר'
  },
  'maxPrice': {
    en: 'Max Price',
    he: 'מחיר מקסימלי'
  },
  'minRate': {
    en: 'Min Rate',
    he: 'דירוג מינימלי'
  },
  'id': {
    en: 'ID',
    he: 'מזהה'
  },
  'name': {
    en: 'Name',
    he: 'שם'
  },
  'price': {
    en: 'Price',
    he: 'מחיר'
  },
  'rate': {
    en: 'Rate',
    he: 'דירוג'
  },
  'actions': {
    en: 'tableActions',
    he: 'פעולות'
  },
  'read': {
    en: 'Read',
    he: 'קרא'
  },
  'update': {
    en: 'Update',
    he: 'עדכן'
  },
  'delete': {
    en: 'Delete',
    he: 'מחק'
  },
  'bookName': {
    en: 'Book Name',
    he: 'שם הספר'
  },
  'bookPrice': {
    en: 'Book Price',
    he: 'מחיר הספר'
  },
  'bookImg': {
    en: 'Book Image',
    he: 'תמונת (קישור) הספר'
  },
  'cancel': {
    en: 'Cancel',
    he: 'בטל'
  },
  'close': {
    en: 'Close',
    he: 'סגור'
  },
}
var gCurrencyMap = {
  en: {
    locale: 'en-EN',
    label: 'USD'
  },
  he: {
    locale: 'he-IL',
    label: 'ILS'
  }
}

function getTrans(transKey) {
  const transMap = gTrans[transKey]
  if (!transMap) return 'UNKNOWN'

  let trans = transMap[gCurrLang]
  if (!trans) trans = transMap.en
  return trans
}

function doTrans(el = null) {
  let els = document.querySelectorAll('[data-trans]')
  console.log(el);
  if (el) els = el.querySelectorAll('[data-trans]')
  els.forEach(el => {
      const transKey = el.dataset.trans
      const trans = getTrans(transKey)
      el.innerText = trans
      if (el.placeholder) el.placeholder = trans
  })
}

function setLang(lang) {
  gCurrLang = lang
  _setDirection(lang)
  updateQueryParam('lang', lang)
}

function formatCurrency(num) {
  const currency = gCurrencyMap[gCurrLang]
  return new Intl.NumberFormat(currency.locale,
    { style: 'currency', currency: currency.label }).format(num)
}

function _setDirection(lang) {
  if (lang === 'he') document.body.classList.add('rtl')
  else document.body.classList.remove('rtl')
}
