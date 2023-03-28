var container = document.createElement("div");
container.className = "container";
container.style.padding = "10px 5px";

var searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Search Books";
searchInput.className = "form-control mb-3";
searchInput.style.width = "400px";
container.appendChild(searchInput);

var searchBtn = document.createElement("button");
searchBtn.type = "button";
searchBtn.innerText = "Search";
searchBtn.className = "btn btn-primary";
searchBtn.style.alignContent = "center"
searchBtn.style.backgroundColor = "#4681f4";
container.appendChild(searchBtn);

var row = document.createElement("div");
row.classList.add("row", "m-3");


async function getBooks() {
  try {
    let books = [];
    const res1 = await fetch("https://www.anapioficeandfire.com/api/books");
    const data = await res1.json();
        for (let b of data) {
      const book = { 
        Name: b.name, 
        ISBN: b.isbn, 
        Authors: b.authors, 
        Pages: b.numberOfPages, 
        Publisher: b.publisher, 
        Released: b.released 
      };
      
      let characters = [];
      let char_length = Math.min(b.characters.length, 5);
      
      for (let i = 0; i < char_length; i++) {
        const res2 = await fetch(b.characters[i]);
        const char = await res2.json();
        characters.push(char.name);
      }
      book.Characters = characters;
      books.push(book);
    }
    
    foo(books);
  } catch (error) {
    console.log(error);
  }
}

  
function foo(data) {
  console.log(data);
  var filteredData = data;
  searchBtn.addEventListener("click", function () {
    var searchBook = searchInput.value.toLowerCase();
    filteredData = data.filter(function (book) {
      return book.Name.toLowerCase().includes(searchBook);
    });
    displayBooks(filteredData);
  });
  displayBooks(filteredData);
}

function displayBooks(data) {
  row.innerHTML = "";
  for (var i = 0; i < 10; i++) {
    row.innerHTML +=
      `<div class="col-lg-4 col-sm-6 mb-4">
          <div class="card border-dark mb-4" style="width: 300px;">
            <div class="card-body text-dark">
              <p class="card-text"><strong>Book Name: </strong>${data[i].Name}</p>
              <p class="card-text"><strong>ISBN: </strong>${data[i].ISBN}</p>
              <p class="card-text"><strong>Number of Pages: </strong>${data[i].Pages}</p>
              <p class="card-text"><strong> Authors: </strong>${data[i].Authors}</p>
              <p class="card-text"><strong>Publisher Name: </strong>${data[i].Publisher}</p>
              <p class="card-text"><strong> Released Date: </strong>${data[i].Released}</p>
              <p class="card-text"><strong> Characters: </strong>${data[i].Characters.join(", ")}</p>
            </div>
          </div>
        </div>`;
  }
  container.appendChild(row);
  document.body.appendChild(container);
  
}

getBooks();
