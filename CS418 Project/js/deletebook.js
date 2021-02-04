
async function deletethatbook(bookId){ //modify code to delete book instead
    try {
        const response = await fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/delete/" + bookId,
        {
            method: 'DELETE',

        })
        alert("You have successfully deleted the book!");
    } catch(error){
        console.log(error);
    }
}

