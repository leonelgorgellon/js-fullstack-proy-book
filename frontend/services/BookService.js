class BookService {
  constructor(){
    this.URI = "http://localhost:3000/api/books";
  }

  //hace petición a nuestra api-rest
  async getBooks(){
    const response = await fetch(this.URI);
    const books = await response.json();
    return books;
  }

  //para guardar libros. 
  async postBook(book){
    const res = await fetch(this.URI,{
      method: 'POST',
      body: book,
    });
    const date = await res.json();

    console.log(date);
    
  }

  //elimina libro
  async deleteBook(bookId){
    const res = await fetch(`${this.URI}/${bookId}`,{
      headers: {
        'Content-Type': 'application/json'
      },
      method:'Delete'
    });
    const date = await res.json();
    console.log(date);
  }

}

export default BookService;