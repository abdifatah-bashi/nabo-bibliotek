import { useState, useEffect } from "react";

async function getBooks() {
  const repsonse = await fetch("/api/books");
  const data = await repsonse.json();

  return data;
}

async function deleteBook(id) {
  return fetch(`/api/books/${id}`, { method: "DELETE" });
}

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);

  async function onDelete(id) {
    await deleteBook(id);
    getBooks().then((data) => {
      console.log("UPDATED BOOKS: ", books);
      setBooks(data);
    });
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand">Nabo Bibliotek</a>
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Skriv book tittel her"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Søk
          </button>
        </form>
      </nav>
      <div className="container">
        {books.length === 0 && (
          <h4 className="h4 mt-5 text-center alert alert-danger">
            <i
              className="fa fa-exclamation-triangle mr-2"
              aria-hidden="true"
            ></i>
            Bibliotekt er tomt. Alle bøkene er utsolgt!
          </h4>
        )}

        {books.length > 0 && <h4 className="h4 mt-5 ">Bestselgere! </h4>}
        <div className="d-flex">
          {books.map((book) => (
            <div
              key={book.id}
              className="card text-center mr-2 bg-light rounded"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <h5 className="card-title h5">{book.title}</h5>
                <p className="card-text text-secondary">{book.author}</p>
                <button className="btn btn-outline-success flex-0 align-items-center">
                  <i className="fa fa-cart-plus mx-2" aria-hidden="true"></i>
                  {book.price} kr
                </button>

                <button
                  onClick={() => onDelete(book.id)}
                  className="btn btn-outline-danger ml-3 flex-0 align-items-center"
                >
                  <i className="fa fa-trash mx-2" aria-hidden="true"></i>
                  Slett
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
