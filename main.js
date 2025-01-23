// Do your work here...
// Insialisasi localStorage
const storageKey = "STORAGE-KEY";
const sessionKey = "SESSION-KEY";
const bookForm = document.getElementById("bookForm");

if (localStorage.getItem(storageKey) == null) {
  let objBooks = [];
  let objBooksReady = JSON.stringify(objBooks);

  localStorage.setItem(storageKey, objBooksReady);
}

if (sessionStorage.getItem(sessionKey) == null) {
  let objekBookNew = {};
  let objekBookNewReady = JSON.stringify(objekBookNew);

  sessionStorage.setItem(sessionKey, objekBookNewReady);
}

// Fitur preventive refresh
const bookFormTitle = document.getElementById("bookFormTitle");
const bookFormAuthor = document.getElementById("bookFormAuthor");
const bookFormYear = document.getElementById("bookFormYear");

const saveDataToSession = () => {
  let currentNewBooks = JSON.parse(sessionStorage.getItem(sessionKey));

  currentNewBooks.title = bookFormTitle.value;
  currentNewBooks.author = bookFormAuthor.value;
  currentNewBooks.year = bookFormYear.value;

  sessionStorage.setItem(sessionKey, JSON.stringify(currentNewBooks));
};

const setDataFromSession = () => {
  let dataFromSession = JSON.parse(sessionStorage.getItem(sessionKey));

  bookFormTitle.value = dataFromSession.title || "";
  bookFormAuthor.value = dataFromSession.author || "";
  bookFormYear.value = dataFromSession.year || "";
};

bookFormTitle.addEventListener("input", saveDataToSession);
bookFormAuthor.addEventListener("input", saveDataToSession);
bookFormYear.addEventListener("input", saveDataToSession);

window.addEventListener("DOMContentLoaded", setDataFromSession);

if (sessionStorage.getItem(sessionKey) !== null) {
  console.log(sessionStorage.getItem(sessionKey));

  let newBooks = JSON.parse(sessionStorage.getItem(sessionKey));
  if (bookFormTitle.value || bookFormAuthor.value || bookFormYear.value) {
    newBooks.title = bookFormTitle.value;
    newBooks.author = bookFormAuthor.value;
    newBooks.year = bookFormYear.value;

    let newBooksReady = JSON.stringify(newBooks);
    sessionStorage.setItem(sessionKey, newBooksReady);

    let newObjBooks = JSON.parse(sessionStorage.getItem(sessionKey));

    bookFormYear.innerText = newObjBooks.year;
    bookFormAuthor.innerText = newObjBooks.author;
    bookFormTitle.innerText = newObjBooks.title;

    console.log(`${newObjBooks}`);
  }
}

function createID() {
  const minNumb = 1000000000;
  const maxNumb = 9999999999;

  return Math.floor(Math.random() * (minNumb - maxNumb + 1) + maxNumb);
}

function displayListBook() {
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  const arrayObjBook = JSON.parse(localStorage.getItem(storageKey));

  let listIncompleteBook = "";
  let listCompleteBook = "";

  arrayObjBook.forEach((objBook, index) => {
    if (objBook.isComplete == true) {
      listCompleteBook += `
      <div data-bookid="${objBook.id}" data-testid="bookItem">
            <h3 data-testid="bookItemTitle">${objBook.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${objBook.author}</p>
            <p data-testid="bookItemYear">Tahun: ${objBook.year}</p>
            <div>
              <button data-testid="bookItemIsCompleteButton">Belum 
                Selesai dibaca
              </button>
              <button data-testid="bookItemDeleteButton">Hapus Buku</button>
              <button data-testid="bookItemEditButton">Edit Buku</button>
            </div>
      </div>
      `;
    } else {
      listIncompleteBook += `
      <div data-bookid="${objBook.id}" data-testid="bookItem">
            <h3 data-testid="bookItemTitle">${objBook.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${objBook.author}</p>
            <p data-testid="bookItemYear">Tahun: ${objBook.year}</p>
            <div>
              <button data-testid="bookItemIsCompleteButton">
                Selesai dibaca
              </button>
              <button data-testid="bookItemDeleteButton">Hapus Buku</button>
              <button data-testid="bookItemEditButton">Edit Buku</button>
            </div>
      </div>`;
    }
  });

  incompleteBookList.innerHTML = listIncompleteBook;
  completeBookList.innerHTML = listCompleteBook;
}

function updateListBook(DataBookList) {
  let arrayObjBook = JSON.parse(localStorage.getItem(storageKey));
  arrayObjBook.push(DataBookList);

  const arrayObjBookReady = JSON.stringify(arrayObjBook);
  localStorage.setItem(storageKey, arrayObjBookReady);
}

function checkStorage() {
  return typeof Storage !== "undefined";
}

bookForm.addEventListener("submit", (event) => {
  sessionStorage.clear();

  event.preventDefault();

  const bookFormTitleValue = document.getElementById("bookFormTitle").value;
  const bookFormAuthorValue = document.getElementById("bookFormAuthor").value;
  const bookFormYearValue = document.getElementById("bookFormYear").value;
  const bookFormIsCompleteValue =
    document.getElementById("bookFormIsComplete").checked;

  const objBookListValue = {
    id: createID(),
    title: bookFormTitleValue,
    author: bookFormAuthorValue,
    year: Number(bookFormYearValue),
    isComplete: bookFormIsCompleteValue,
  };

  updateListBook(objBookListValue);
  displayListBook();
});

window.addEventListener("DOMContentLoaded", () => {
  if (checkStorage) {
    if (localStorage.getItem(storageKey) !== null) {
      displayListBook();
    }
  } else {
    alert("Maaf browser tidak mendukung web-storage");
  }
});

// Fitur Selesai Dibaca (section Belum)
function updateIsCompleteBook(idBook) {
  let objBooks = JSON.parse(localStorage.getItem(storageKey));

  objBooks.forEach((objBook) => {
    if (objBook.id == idBook) {
      if (objBook.isComplete == false) {
        objBook.isComplete = true;
        localStorage.setItem(storageKey, JSON.stringify(objBooks));
      } else {
        objBook.isComplete = false;
        localStorage.setItem(storageKey, JSON.stringify(objBooks));
      }
    }
  });
}

function deleteBook(idBook) {
  let objBooks = JSON.parse(localStorage.getItem(storageKey));
  objBooks.forEach((objBook, index) => {
    if (objBook.id == idBook) {
      // splice(index, jumlahDihapus)
      objBooks.splice(index, 1);
      localStorage.setItem(storageKey, JSON.stringify(objBooks));
    }
  });
}

function editDataBook(idBook) {
  let objBooks = JSON.parse(localStorage.getItem(storageKey));

  objBooks.forEach(function (objBook) {
    if (objBook.id == idBook) {
      const titleBookInput = document.getElementById("titleBook");
      const authorBookInput = document.getElementById("authorBook");
      const yearBookInput = document.getElementById("yearBook");

      const sectionLastChild = document.querySelector("section:nth-child(5)");

      titleBookInput.value = objBook.title;
      authorBookInput.value = objBook.author;
      yearBookInput.value = objBook.year;

      sectionLastChild.classList.add("active");

      document.addEventListener("click", function (event) {
        const kindBtn = event.target.getAttribute("data-testid");
        const sectionLastChild = document.querySelector("section:nth-child(5)");

        if (
          kindBtn == "bookItemCancelEdit" ||
          event.target.contains(sectionLastChild)
        ) {
          sectionLastChild.classList.remove("active");
        }
        if (kindBtn == "bookItemEditSave") {
          const titleBookValue = document.getElementById("titleBook").value;
          const authorBookValue = document.getElementById("authorBook").value;
          const yearBookValue = document.getElementById("yearBook").value;

          objBook.title = titleBookValue;
          objBook.author = authorBookValue;
          objBook.year = Number(yearBookValue);

          localStorage.setItem(storageKey, JSON.stringify(objBooks));
          displayListBook();

          sectionLastChild.classList.remove("active");
        }
      });
    }
  });
}

function searchBook(searchValue) {
  const bookTitles = document.querySelectorAll("[data-testid='bookItemTitle']");
  const bookItems = document.querySelectorAll("[data-testid='bookItem']");

  bookTitles.forEach((bookTitle, index) => {
    if (bookTitle.innerText.toLowerCase().includes(searchValue.toLowerCase())) {
      bookItems[index].style.borderColor = "#d8520f";
    }
  });
}

window.addEventListener("load", () => {
  document.addEventListener("click", (event) => {
    const buttonItem = event.target;

    const idBook =
      buttonItem.parentElement.parentElement.getAttribute("data-bookid");

    if (buttonItem.getAttribute("data-testid") == "bookItemIsCompleteButton") {
      updateIsCompleteBook(idBook);
    }
    if (buttonItem.getAttribute("data-testid") == "bookItemDeleteButton") {
      deleteBook(idBook);
    }
    if (buttonItem.getAttribute("data-testid") == "bookItemEditButton") {
      editDataBook(idBook);
    }
    if (
      buttonItem.getAttribute("data-testid") == "searchBookFormSubmitButton"
    ) {
      searchBook();
    }
    // updateListBook();
    displayListBook();
  });
});

// Fitur Cari
const searchBookForm = document.getElementById("searchBook");

searchBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchBookTitle = document.getElementById("searchBookTitle");

  searchBook(searchBookTitle.value);
  searchBookTitle.value = "";
});
