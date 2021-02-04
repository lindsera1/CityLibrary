const { fromEvent } = rxjs;

//Create functions to add book, and then display success message to user, or failure message if missing a field.

const addButton = document.querySelector("#addbook");
const resetButton = document.querySelector("#resetfields");
const isbnfield = document.querySelector("#isbn");
const booktitlefield = document.querySelector("#booktitle");
const pastduefield = document.querySelector("#pastdue");
const publisherfield = document.querySelector("#publisher");
const datepublishedfield = document.querySelector("#datepublished");


$watchaddbutton = fromEvent(addButton, "click").subscribe(addthatbook);
$watchresetbutton = fromEvent(resetButton, "click").subscribe(clearFields);

async function addthatbook(){
    if(isbnfield.value.length !== 0 && booktitlefield.value.length !== 0 && pastduefield.value.length !== 0  && publisherfield.value.length !== 0 && datepublishedfield.value.length !== 0){
        
        try {
            const response = await fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/add",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isbn: isbnfield.value, title: booktitlefield.value, pastdueFee: pastduefield.value, publisher: publisherfield.value, datePublished: datepublishedfield.value })
            })
            alert("You have successfully added the book!");
            clearFields();
        } catch(error){
            console.log(error);
        }
    } else {
        alert("Please enter a valid value into all required fields!");
    }
}

function clearFields(){
    isbnfield.value = "";
    booktitlefield.value = "";
    pastduefield.value = "";
    publisherfield.value = "";
    datepublishedfield.value = "";

}


