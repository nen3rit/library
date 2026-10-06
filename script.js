const myLibrary = [];

// 1. Constructor Function
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); // Requirement 2: Unique ID
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// 2. Prototype Method to toggle read status (Requirement 6)
Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
};

// 3. Helper function to create & add a book to array
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// 4. Render Library to DOM (Requirement 3)
function displayBooks() {
  const container = document.getElementById("library-container");
  container.innerHTML = ""; // Clear existing grid to avoid duplicates

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.setAttribute("data-id", book.id); // Requirement 5: data-attribute for ID

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "Read" : "Not Read Yet"}</p>
      <div class="card-actions">
        <button class="toggle-read-btn">${book.read ? "Mark Unread" : "Mark Read"}</button>
        <button class="remove-btn">Remove</button>
      </div>
    `;

    // Toggle Read Status Listener
    card.querySelector(".toggle-read-btn").addEventListener("click", () => {
      book.toggleReadStatus();
      displayBooks(); // Re-render to reflect state changes
    });

    // Remove Book Listener (Requirement 5)
    card.querySelector(".remove-btn").addEventListener("click", () => {
      removeBook(book.id);
    });

    container.appendChild(card);
  });
}

// Function to remove a book by ID
function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

// 5. Form & Modal Dialog Logic (Requirement 4)
const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const cancelBtn = document.getElementById("cancel-btn");
const bookForm = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  bookForm.reset();
  dialog.close();
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents page reload/server submission

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = Number(document.getElementById("pages").value);
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();

  bookForm.reset();
  dialog.close();
});

// Seed data to test display initially
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
displayBooks();