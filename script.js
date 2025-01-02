const formDialog = document.querySelector('#book-form-dialog');
const newButton = document.querySelector('#new-button');
const sumbitButton = document.querySelector('#sumbit');
const bookContainer = document.querySelector('.book-container');

const myLibrary = [];

function Book(title, author, pages, read) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary(title, author, pages, read) {
    // do stuff here
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
};

function display() {
    let bookCard = "";
    for (const book of myLibrary) {
        bookCard += `<div class="book-card book-idx-${myLibrary.indexOf(book)}">
                <h2 class="book-title">${book.title}</h2>
                <p class="book-author">${book.author}</p>
                <p class="book-pages">${book.pages} pages</p>
                <div class="read-status">
                    <label for="toggle" class="read-label">Read Status</label>
                    <label class="toggle-switch">
                        <input type="checkbox" id="toggle" ${book.read ? "checked" : ""}>
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="card-buttons">
                    <button class="edit-button">Edit</button>
                    <button class="remove-button">Remove</button>
                </div>
            </div>`;
    }

    bookContainer.innerHTML = bookCard;
    deleteBook();
};

function deleteBook() {
    let removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach((removeButton) => {
        removeButton.addEventListener("click", function () {
            let word = removeButton.parentElement.parentElement.className.split(" ")[1].split("-")[2];
            removeButton.parentElement.parentElement.remove();
            myLibrary.splice(word, 1);
            console.log("Library elements: " + myLibrary.length);     
        });
    });
}

newButton.addEventListener("click", function () {
    formDialog.showModal();
});

sumbitButton.addEventListener("click", function () {
    event.preventDefault();

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;

    formDialog.close();
    addBookToLibrary(title, author, pages, read);
    display();
});