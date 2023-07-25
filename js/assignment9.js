var bookName =document.getElementById("bookmarkName");
var bookUrl =document.getElementById("bookmarkURL");
var bookContainer=[];
if (localStorage.getItem('books')!=null) {
    bookContainer=JSON.parse(localStorage.getItem('books'));
    displayBook(bookContainer);
}
//add
function addBook() {
    if (validationBookUrl() == true && validationBookName()==true ) {
        var books={
        Bname : bookName.value,
        Burl : bookUrl.value,
    }
    bookContainer.push(books);
    localStorage.setItem("books",JSON.stringify(bookContainer))
    displayBook();
    clearInput();
    }
    else{
        alert(`Site Name or Url is not valid, Please follow the rules below
        -Site name must contain at least 3 characters
        -Site URL must be a valid one`)
    }
    
}


//display
function displayBook() {
    var cartoona=``;
    for (let i = 0; i < bookContainer.length; i++) {
        var urlLink=bookContainer[i].Burl;
        cartoona +=` <tr>
    <td>${i}</td>
    <td>${bookContainer[i].Bname}</td>              
    <td>
      <button class="btn btn-visit" onclick=" window.open('${urlLink}')" data-index="0">
        <i class="fa-solid fa-eye pe-2 "></i><a>Visit</a>
      </button>
    </td>
    <td>
      <button onclick=" deleteInput(${i})" class="btn btn-delete pe-2" data-index="0">
        <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
    </td>
    </tr>`
    }
    
    document.getElementById("tableBody").innerHTML = cartoona;
}

//clear

function clearInput() {
    bookName.value="";
    bookUrl.value="";
    
}

//delete
function deleteInput(bookIndex) {
    bookContainer.splice(bookIndex,1);
    localStorage.setItem("books",JSON.stringify(bookContainer))
    displayBook(bookContainer);
    
}


//validation
function validationBookUrl() {
    var  urlRegex = /^(?:https?:\/\/)?(?:www\.)?[\w.-]+\.[a-z]{2,}(?:\/[\w.-]*)*\/?$/i;
     return urlRegex.test(bookUrl.value);
}

function validationBookName() {
    var nameRegex = /^[a-zA-Z]{3,}$/;
   return nameRegex.test(bookName.value);
}
