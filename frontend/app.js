import './styles/app.css'; 
import UI from './UI';


//para traer los datos del backend
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  ui.renderBooks();
})


//para capturar los datos del bookform (html)
document.getElementById('book-form')
  .addEventListener('submit', function(e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const image = document.getElementById('image').files;

    //para pasarle un objeto a la funcion post. 
    const formDate = new FormData();
    formDate.append('image', image[0]);
    formDate.append('title', title);
    formDate.append('author', author);
    formDate.append('isbn', isbn);

    const ui = new UI ();
    ui.addNewBook(formDate);
    
    ui.renderMessage('Nuevo libro agregado', 'success', 3000);

    e.preventDefault(); //para que no se reinicie. 
  });



document.getElementById('books-cards')
  .addEventListener('click', e =>{
    //escuchamos el evento click, si la clase es delete. 
    if(e.target.classList.contains('delete')){
      const ui = new UI();
      ui.deleteBook(e.target.getAttribute('_id'));

      ui.renderMessage('Libro eliminado', 'danger', 3000)
    }
    e.preventDefault();
  })