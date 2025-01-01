const bookTable = document.querySelector('#book-table tbody');
const formDialog = document.querySelector('#book-form-dialog');
const newButton = document.querySelector('#new-button');

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

addBookToLibrary("Test", "Test", 12, true);
addBookToLibrary("Test", "Test", 12, true);
addBookToLibrary("Test", "Test", 12, false);
addBookToLibrary("Test", "Test", 12, false);


function display(){
    myLibrary.forEach( book => {
        const newRow = document.createElement("tr");
        const titleCell = document.createElement("td");
        const authorCell = document.createElement("td");
        const pagesCell = document.createElement("td");
        const readCell = document.createElement("td");
    
        titleCell.textContent = book.title;
        authorCell.textContent = book.author;
        pagesCell.textContent = book.pages;
        readCell.textContent = book.read;
    
        newRow.appendChild(titleCell);
        newRow.appendChild(authorCell);
        newRow.appendChild(pagesCell);
        newRow.appendChild(readCell); 

        bookTable.appendChild(newRow);
    });
};

newButton.addEventListener("click", function(){
    formDialog.showModal();
});




display();