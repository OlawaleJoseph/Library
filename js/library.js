const library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  library.push(book);
}

const a = new Book('sss', 'ddd', 888, true);
const b = new Book('sss', 'ddd', 888, true);
const c = new Book('sss', 'ddd', 888, false);
addBookToLibrary(a);
addBookToLibrary(b);
addBookToLibrary(c);

function displayBooks() {
  const cardsDiv = document.querySelector('#books');
  library.forEach((book) => {
    const card = document.createElement('div');
    card.classList.add('card', 'm-2');
    card.innerHTML = `<div class="card-body">
        <h5 class="card-title">Title: ${book.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted pb-2 border-bottom">Author: ${book.author}</h6>
        <p class="card-text">Pages: ${book.pages}</p>
        <p class="card-text">${book.read ? 'Read' : 'Unread'}</p>
      </div>`;
    cardsDiv.appendChild(card);
  });
}
displayBooks();
