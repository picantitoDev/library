const formDialog = document.querySelector('#book-form-dialog');
const editFormDialog = document.querySelector('#edit-book-form-dialog');
const newButton = document.querySelector('#new-button');
const sumbitButton = document.querySelector('#sumbit');
const saveButton = document.querySelector('#save');
const cancelButton = document.querySelector('#cancel');
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
    const bookCards = bookContainer.querySelectorAll('.book-card');
    bookCards.forEach(card => card.remove());

    for (const book of myLibrary) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card', `book-idx-${myLibrary.indexOf(book)}`);

        bookCard.innerHTML = `
            <h2 class="book-title">${book.title}</h2>
            <p class="book-author">${book.author}</p>
            <p class="book-pages">${book.pages} pages</p>
            <div class="read-status">
                <label for="toggle" class="read-label">Read Status</label>
                <label class="toggle-switch">
                    <input type="checkbox" class="toggle" ${book.read ? "checked" : ""}>
                    <span class="slider"></span>
                </label>
            </div>
            <div class="card-buttons">
                <button class="edit-button">Edit</button>
                <button class="remove-button">Remove</button>
            </div>
        `;
        bookContainer.appendChild(bookCard);
    }
    deleteBook();
    readBook();
    editBook();
}

function deleteBook() {
    let removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach((removeButton) => {
        removeButton.addEventListener("click", function () {
            let index = removeButton.parentElement.parentElement.className.split(" ")[1].split("-")[2];
            removeButton.parentElement.parentElement.remove();
            myLibrary.splice(index, 1);
            console.log("Library elements: " + myLibrary.length);
        });
    });
}

function editBook() {
    let editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach((editButton) => {
        editButton.addEventListener("click", function () {
            let index = editButton.parentElement.parentElement.className.split(" ")[1].split("-")[2];
            let book = myLibrary[index];

            editFormDialog.showModal();
            document.getElementById('edit-title').value = book.title;
            document.getElementById('edit-author').value = book.author;
            document.getElementById('edit-pages').value = book.pages;
            document.getElementById('edit-read').checked = book.read;

            saveButton.addEventListener('click', function () {
                event.preventDefault();
                console.log("Save button clicked!");
                book.title = document.getElementById('edit-title').value;
                book.author = document.getElementById('edit-author').value;
                book.pages = document.getElementById('edit-pages').value;
                book.read = document.getElementById('edit-read').checked;
                display();
                editFormDialog.close();
            });
        });
    });
}


cancelButton.addEventListener('click', function () {
    event.preventDefault();
    console.log("Cancel button clicked!");
    editFormDialog.close();
});

function readBook() {
    let readInput = document.querySelectorAll('.toggle');
    readInput.forEach((input) => {
        input.addEventListener("click", function () {
            let word = input.closest('.book-card').className.split(" ")[1].split("-")[2];
            if (input.checked === true) {
                myLibrary[word].read = true;
                console.log(myLibrary[word].read);
            } else {
                myLibrary[word].read = false;
                console.log(myLibrary[word].read);
            }
        });
    });
}

newButton.addEventListener("click", function () {
    formDialog.showModal();
});


sumbitButton.addEventListener("click", function () {
    event.preventDefault();

    const form = document.querySelector('form');
    if (form.checkValidity()) {
        let title = document.getElementById('title').value;
        let author = document.getElementById('author').value;
        let pages = document.getElementById('pages').value;
        let read = document.getElementById('read').checked;

        formDialog.close();
        addBookToLibrary(title, author, pages, read);

        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('pages').value = "";
        document.getElementById('read').checked = false;
        display();

    } else {
        form.reportValidity();
    }
});