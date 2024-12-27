// 1. Buat sebuah class Book : title, author, isAvailable
// 2. Buat class Library untuk manage Book
// 3. Di dalam class Library, buat method addBook, lendBook, returnBook
// 4. untuk menambah item, gunakan push

class Book {
  constructor(title, author, isAvailable = true) {
    this.title = title;
    this.author = author;
    this.isAvailable = isAvailable;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    console.log(`buku ${book.title} berhasil ditambahkan`);
  }

  lendBook(book) {
    console.log("buku berhasil dipinjam");
  }

  returnBook(book) {
    console.log("buku berhasil dibalikkan");
  }
}

let myLibrary = new Library();

let book1 = new Book("Politik", "2000");
myLibrary.addBook(book1);

// class Book {
//   constructor(title, author, isAvailable = true) {
//     this.title = title;
//     this.author = author;
//     this.isAvailable = isAvailable;
//   }
// }

// class Library {
//   constructor() {
//     this.books = [];
//   }

//   addBook(book) {
//     this.books.push(book);
//     console.log(
//       `Book titled "${book.title}" by ${book.author} has been added to the library.`
//     );
//   }

//   lendBook(title) {
//     const book = this.books.find((b) => b.title === title);

//     if (book && book.isAvailable) {
//       book.isAvailable = false;
//       console.log(`You have successfully borrowed "${book.title}".`);
//     } else if (book) {
//       console.log(`Sorry, the book "${title}" is currently not available.`);
//     } else {
//       console.log(`Sorry, the book "${title}" does not exist in the library.`);
//     }
//   }

//   returnBook(title) {
//     const book = this.books.find((b) => b.title === title);

//     if (book && !book.isAvailable) {
//       book.isAvailable = true;
//       console.log(`Thank you for returning "${book.title}".`);
//     } else if (book) {
//       console.log(`The book "${title}" was not borrowed.`);
//     } else {
//       console.log(`Sorry, the book "${title}" does not exist in the library.`);
//     }
//   }
// }

// const myLibrary = new Library();

// const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald");
// const book2 = new Book("1984", "George Orwell");
// const book3 = new Book("To Kill a Mockingbird", "Harper Lee");

// myLibrary.addBook(book1);
// myLibrary.addBook(book2);
// myLibrary.addBook(book3);

// myLibrary.lendBook("1984");
// myLibrary.lendBook("1984");

// myLibrary.returnBook("1984");
// myLibrary.returnBook("1984");
