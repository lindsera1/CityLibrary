const { fromEvent } = rxjs;


let bookId;
let buttons = document.querySelectorAll('button');
const updateButton = document.querySelector("#updatebook");
const resetButton = document.querySelector("#resetfields");
const isbnfield = document.querySelector("#isbn");
const booktitlefield = document.querySelector("#booktitle");
const pastduefield = document.querySelector("#pastdue");
const publisherfield = document.querySelector("#publisher");
const datepublishedfield = document.querySelector("#datepublished");

function fetchAndDisplayBookData() {
    const params = new URLSearchParams(window.location.search);
    bookId = params.get("bookId");
    
    fetch('https://elibraryrestapi.herokuapp.com/elibrary/api/book/get/' + bookId)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject({ status: response.status, statusText: response.statusText });
            }
        })
        .then(book => {
            txtBookId.value = book.bookId;
            isbnfield.value = book.isbn;
            booktitlefield.value = book.title;
            pastduefield.value = book.overdueFee.toFixed(2);
            publisherfield.value = book.publisher;
            datepublishedfield.value = book.datePublished;
        })
        .catch(err => {
            console.log('Error message:', err.statusText);
            //document.getElementById("divBooksList").innerHTML = '<p style="color:#ff0000;">We are sorry. The elibrary books data service is unavailable. Please try again later</p>';
        });
}

const $watchupdatebutton = fromEvent(updateButton, "click").subscribe(updatethatbook);
const $watchresetbutton = fromEvent(resetButton, "click").subscribe(clearFields);

async function updatethatbook(bookId) { //modify this code to update
    if (isbnfield.value.length !== 0 && booktitlefield.value.length !== 0 && pastduefield.value.length !== 0 && publisherfield.value.length !== 0 && datepublishedfield.value.length !== 0) {

        try {
            const response = await fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/update/" + bookId,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isbn: isbnfield.value, title: booktitlefield.value, pastdueFee: pastduefield.value, publisher: publisherfield.value, datePublished: datepublishedfield.value })
                })
            alert("You have successfully updated the book!");
            clearFields();
        } catch (error) {
            console.log(error);
        }
    } else {
        alert("Please enter a valid value into all required fields!");
    }
}

function clearFields() {
    isbnfield.value = "";
    booktitlefield.value = "";
    pastduefield.value = "";
    publisherfield.value = "";
    datepublishedfield.value = "";

}