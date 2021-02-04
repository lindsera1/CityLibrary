const { fromEvent } = rxjs;


const addButton = document.querySelector("#addbook");
const $watchaddbook = fromEvent(addButton, "click").subscribe(renderAddNewBook) //create said function
function renderAddNewBook(){
    location.href = "addnewbook.html"; //replace with url of addnewbook 
}

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

async function getBooks() {

    let counter = 1;
    const table = document.getElementById("booksavailable2");
    try {
        const response = await fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/list");
        const body = await response.json();
        body.forEach(book => {

            let bookNumber = counter++;
            let row = document.createElement("tr");
            row.id = book.bookId;
            let td1 = document.createElement("td");
            td1.innerHTML = bookNumber;
            let td2 = document.createElement("td");
            td2.innerHTML = book.isbn;
            let td3 = document.createElement("td");
            td3.innerHTML = book.title;
            let td4 = document.createElement("td");
            td4.innerHTML = book.overdueFee;
            let td5 = document.createElement("td");
            td5.innerHTML = book.publisher;
            let td6 = document.createElement("td");
            td6.innerHTML = book.datePublished;
            let td7 = document.createElement("td");
            td7.innerHTML = `<a href="../updatebook.html" onclick="fetchAndDisplayBookData()">Edit</a>`
            let td8 = document.createElement("td");
            td8.innerHTML =  `<a href="#" onclick="deletethatbook(${book.bookId})">Delete</a>`
            row.append(td1);
            row.append(td2);
            row.append(td3);
            row.append(td4);
            row.append(td5);
            row.append(td6);
            row.append(td7);
            row.append(td8);
            table.append(row);
        })
    } catch (error){
        console.log(error);
    }
}


getBooks();
