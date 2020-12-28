// BOOK CONSTRUCTOR
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI CONSTRUCTOR
function UI(){}

// STORE CONSTRUCTOR
function Store(){}


// Add to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
    `;
    list.appendChild(row);
}
// Show alert for error
UI.prototype.showAlert = function(message, className){
    const div = document.createElement('div');
    div.className = ` alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}
// Delete book
UI.prototype.deleteBook = function(target){
    if(target.className = 'delete'){
        target.parentElement.parentElement.remove();
    }
}
// Clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}
// Get books from store
Store.prototype.getBooks = function(){
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books
}

// Display books from store
Store.prototype.displayBooks = function(){
    const books = Store.prototype.getBooks();
    books.forEach(function(book){
        const ui = new UI;
        ui.addBookToList(book);
    });
}

// Add book
Store.prototype.addBook = function(book){
    const books = Store.prototype.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}
// Remove book
Store.prototype.removeBook = function(isbn){
    const books = Store.prototype.getBooks();
    books.forEach(function(book, index){
        if(book.isbn === isbn){
            books.splice(index, 1);
        }
        localStorage.setItem('books', JSON.stringify(books));       
    });
}
// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.prototype.displayBooks);
// EVENT LISTENER FOR ADDING BOOK
document.getElementById('book-form').addEventListener('submit', function(e){
    // Get the details
    const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;
    // Instantiate  book constructor
    const book = new Book(title, author, isbn);
    // Instantiate UI
    const ui = new UI();
    // Validation
    if(title === '' || author === '' || isbn === ''){
        // Error alert
        ui.showAlert('Please fill in all fields', 'error')
    } else {
        // Add book
        ui.addBookToList(book);
        // Add book to ls
        Store.prototype.addBook(book)
        ui.showAlert('Book Added!', 'success')
        ui.clearFields();
    }
    e.preventDefault();
});
// EVENT LISTENER FOR DELETE
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    // Remove from LS
    Store.prototype.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Book removed!', 'success');
    e.preventDefault()
})