import BookService from './services/BookService'
const bookService = new BookService();

import { format } from 'timeago.js';

class UI {
  
  async renderBooks(){
    const books = await bookService.getBooks();
    const booksCardCont = document.getElementById('books-cards');
    booksCardCont.innerHTML = ''; //para que este vacio
    books.forEach(book => {
      const div = document.createElement('div');
      div.className = ''; //limpiamos 
      div.innerHTML = `
        <div class="card m-2">
          <div class="row">
            <div class="col-md-4">
              <img src="http://localhost:3000${book.imagePath}" alt="" class="img-fluid"/>
            </div>
            <div class="col-md-8">
              <div class="card-block px-2">
                <h4 class="card-title">${book.title}</h4>
                <p class="card-text">${book.author}</p>
                <div class="position-absolute top-0 end-0">
                  <a href="#" class="btn btn-danger delete m-2" _id="${book._id}">x</a>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            ${format(book.created_at)}
          </div>
        </div>
      `;
      booksCardCont.appendChild(div);
    });
  }

  async addNewBook(book){
    await bookService.postBook(book);
    this.clearBookForm(); //limpio formulario
    this.renderBooks();//renderizo devuelta la lista de libros. 
  }

  clearBookForm(){
    document.getElementById('book-form').reset();
  }

  
  renderMessage(message, colorMessage, secondsToRemove){
    //creamos div con su color y msj
    const div = document.createElement('div');
    div.className = `alert alert-${colorMessage} message`;
    div.appendChild(document.createTextNode(message));

    //Donde queremos que vaya, ponemos el msj entre el contenedor con clase col-md-4 y el form con id book-form. 
    const container = document.querySelector('.col-md-4');
    const bookForm = document.querySelector('#book-form');
    //ponemos que queremos ponerlo antes de que elemento queremos q lo inserte. 
    container.insertBefore(div, bookForm)

    //le establecemos un tiempo para removerlo. 
    setTimeout(() => { 
      document.querySelector('.message').remove();
    }, secondsToRemove);//para que aparezca el msj por algunos segundos. 
  }

  async deleteBook(bookId){
    await bookService.deleteBook(bookId);
    this.renderBooks();
  }
}

export default UI;