const {Router} = require('express');
const router = Router();
const {unlink} = require('fs-extra'); //elimina archivos, ver si existen moverlos y demas. 
const path = require('path');

const Book = require('../models/Book'); //guardo el modelo en una costante para utilizarla en la ruta. 

router.get('/', async (req, res) => {
  const books = await Book.find().lean(); //consulto a la base de datos los libros y lo guardo en una const. 
  await res.json(books);
});

router.post('/', async (req, res) => {
  const {title,author, isbn} = req.body;
  const imagePath = '/uploads/' + req.file.filename;
  const newBook = new Book({title, author, isbn, imagePath});
  await newBook.save();
  res.json({message: 'Libro guardado'});
});

router.delete('/:id', async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  //elimina la imagen dandole una dirección
  unlink(path.resolve('./backend/public' + book.imagePath))
  res.json({message: 'Libro eliminado'});
})


module.exports = router;