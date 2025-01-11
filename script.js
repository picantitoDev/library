const formDialog = document.querySelector('#book-form-dialog');
const editFormDialog = document.querySelector('#edit-book-form-dialog');
const newButton = document.querySelector('#new-button');
const sumbitButton = document.querySelector('#sumbit');
const saveButton = document.querySelector('#save');
const cancelButton = document.querySelector('#cancel');
const bookContainer = document.querySelector('.book-container');

const myLibrary = [];

let currentEditIndex = null;

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

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
function openEditDialog(book) {
    editFormDialog.showModal();
    document.getElementById('edit-title').value = book.title;
    document.getElementById('edit-author').value = book.author;
    document.getElementById('edit-pages').value = book.pages;
    document.getElementById('edit-read').checked = book.read;
}

function isBookExisting(title, author, excludeIndex = -1) {
    return myLibrary.some((book, index) => 
        index !== excludeIndex && book.title === title && book.author === author
    );
}

function handleSave(currentEditIndex) {
    event.preventDefault();
    const newTitle = document.getElementById('edit-title').value;
    const newAuthor = document.getElementById('edit-author').value;
    const newPages = document.getElementById('edit-pages').value;
    const newReadStatus = document.getElementById('edit-read').checked;
    const errorMessage = document.getElementById('error-message');



    if (isBookExisting(newTitle, newAuthor, currentEditIndex)) {
        errorMessage.textContent = "This book already exists.";
        errorMessage.style.display = "block";
        return; 
    }

    errorMessage.style.display = "none";

    const currentBook = myLibrary[currentEditIndex];
    currentBook.title = newTitle;
    currentBook.author = newAuthor;
    currentBook.pages = newPages;
    currentBook.read = newReadStatus;

    display();
    editFormDialog.close();
}

function setupErrorHiding() {
    const errorMessage = document.getElementById('error-message');
    const inputs = [
        document.getElementById('edit-title'),
        document.getElementById('edit-author'),
        document.getElementById('edit-pages'),
    ];

    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (errorMessage.style.display === "block") {
                errorMessage.style.display = "none"; 
            }
        });
    });
}

function setupCreateErrorHiding() {
    const errorMessage = document.getElementById('create-error-message');
    const inputs = [
        document.getElementById('title'),
        document.getElementById('author'),
        document.getElementById('pages'),
    ];

    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (errorMessage.style.display === "block") {
                errorMessage.style.display = "none"; 
            }
        });
    });
}


function editBook() {
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach((editButton) => {
        editButton.addEventListener("click", function () {
            const currentEditIndex = parseInt(editButton.parentElement.parentElement.className.split(" ")[1].split("-")[2]);
            const book = myLibrary[currentEditIndex];
            const editForm = document.querySelector('#edit-form');
            openEditDialog(book);
            setupErrorHiding();

            const newSaveButton = saveButton.cloneNode(true);
            saveButton.replaceWith(newSaveButton);

            newSaveButton.addEventListener('click', function () {
                if (!editForm.checkValidity()) {
                    editForm.reportValidity();
                    return;
                }
                handleSave(currentEditIndex);
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

        if(isBookExisting(title, author)){
            console.log("book already exists");
            const errorMessage = document.getElementById('create-error-message');
            errorMessage.textContent = "This book already exists!";
            errorMessage.style.display = "block";
            return;
        }
        setupCreateErrorHiding();
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