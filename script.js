const myDialog = document.getElementById('my-dialog');


const openDialogButton = document.getElementById('open-dialog');
openDialogButton.addEventListener('click', () => {
    myDialog.showModal(); 
});

const cancelButton = document.getElementById('cancel');
cancelButton.addEventListener('click', () => {
    myDialog.close(); 
    document.getElementById('book-form').reset();
});


const myLibrary = [];

class Book{
    constructor(title, author, pages, isRead){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.isRead=isRead;
    }
}

//sample books
const book1 = new Book('To Kill a Mockingbird', 'Harper Lee', 1000, false);
const book2 = new Book('1984', 'George Orwell', 500, false);
const book3 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 800, false);
const book4 = new Book('The Catcher in the Rye', 'J.D. Salinger', 277, true);
const book5 = new Book('Pride and Prejudice', 'Jane Austen', 432, true);
const book6 = new Book('Brave New World', 'Aldous Huxley', 311, true);
const book7 = new Book('The Hobbit', 'J.R.R. Tolkien', 310, false);

myLibrary.push(book1, book2, book3, book4, book5, book6, book7);


document.getElementById("book-form").addEventListener("submit",function(event){
    event.preventDefault();

    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const pages = document.getElementById('book-pages').value;
    const isRead = document.getElementById('book-read-status').checked;
    const book = new Book(title, author, pages, isRead);

    myLibrary.push(book);
    displayBooks();

    document.getElementById('book-form').reset(); 
    myDialog.close();
})

function displayBooks(){
    const booksContainer = document.getElementById('booksContainer');
    booksContainer.innerHTML='';

    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h3');
        title.textContent = book.title;

        const authorLabel = document.createElement('label');
        authorLabel.textContent = 'Author: ';
        const author = document.createElement('h4');
        author.textContent = book.author;
        authorLabel.appendChild(author);

        const pages = document.createElement('h4');
        pages.textContent = `${book.pages} pages`;

        const isReadLabel = document.createElement('label');
        isReadLabel.textContent = 'Read: ';
        const isRead = document.createElement('input');
        isRead.type = 'checkbox';
        isRead.checked = book.isRead;
        isRead.addEventListener('change', () => {
            book.isRead = isRead.checked;
        });
        isReadLabel.appendChild(isRead);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = '✖';
        deleteButton.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBooks();
        });

        card.appendChild(deleteButton);
        card.appendChild(title);
        card.appendChild(authorLabel);
        card.appendChild(pages);
        card.appendChild(isReadLabel);

        booksContainer.appendChild(card);
    });
}
displayBooks();
