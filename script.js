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
    updateBook();
}

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

function updateBook() {
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

    const form = document.querySelector('form'); // Get the form element
    if (form.checkValidity()) { // Check if the form is valid
        let title = document.getElementById('title').value;
        let author = document.getElementById('author').value;
        let pages = document.getElementById('pages').value;
        let read = document.getElementById('read').checked;

        formDialog.close(); // Close the form dialog

        // Add book to library
        addBookToLibrary(title, author, pages, read);

        // Reset form fields after submission
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('pages').value = "";
        document.getElementById('read').checked = false;

        // Display updated library
        display();
    } else {
        form.reportValidity(); // Show validation error messages if the form is invalid
    }
});