const bookTitle = document.querySelector('#bookTitle');
const bookAuthor = document.querySelector('#bookAuthor');
const bookPages = document.querySelector('#bookPages');
const submitBtn = document.querySelector('.submit_btn');
const booksContainer = document.querySelector('#books');

const library = [];
const bookStorage = window.localStorage;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  library.push(book);
}

// function addBookToLocalStorage(book) {

// }

function displayBooks() {
  const cardsDiv = document.querySelector('#books');
  cardsDiv.innerHTML = '';
  library.forEach((book, index) => {
    const card = document.createElement('div');
    card.classList.add('card', 'm-2');
    card.innerHTML = `<div class="card-body">
        <h5 class="card-title">Title: ${book.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted pb-2 border-bottom">Author: ${book.author}</h6>
        <p class="card-text">Pages: ${book.pages} <button class="text-success ml-3 pl-2 pr-2 rounded" data-read=${index}>${book.read ? 'Read' : 'Unread'}</button></p>
        
        <br><button class="btn btn-danger" data-id=${index} class="delete">Delete</button>
        </div>`;
    cardsDiv.appendChild(card);
  });
}

function removeBookfromLibrary(index) {
  library.splice(index, 1);
  displayBooks();
}

function updateReadStatus(index) {
  library[index].read = !library[index].read;
  displayBooks();
}

function validateForm() {
  const errors = [];
  if (!bookTitle.value) {
    errors.push('Book title is reqiduired');
  } else if (!bookAuthor.value) {
    errors.push('Book author is required');
  } else if (!bookPages.value) {
    errors.push('Number of pages is required');
  }
  return errors;
}

displayBooks();

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = bookTitle.value;
  const author = bookAuthor.value;
  const pages = bookPages.value;
  const read = document.querySelector('input[name=bookRead]:checked').value;
  const errorsDiv = document.querySelector('.errors');

  const validationErrors = validateForm();
  if (validationErrors.length > 0) {
    errorsDiv.innerHTML = '';
    for (let i = 0; i < validationErrors.length; i += 1) {
      const p = document.createElement('p');
      p.textContent = validationErrors[i];
      p.classList.add('text-danger');
      errorsDiv.appendChild(p);
    }
    return;
  }

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  displayBooks();
  document.querySelector('form').reset();
});

booksContainer.addEventListener('click', (e) => {
  const bookId = e.target.getAttribute('data-id');
  const bookRead = e.target.getAttribute('data-read');
  if (bookId !== null) {
    removeBookfromLibrary(bookId);
  }

  if (bookRead !== null) {
    updateReadStatus(bookRead);
  }
});
