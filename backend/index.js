if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}//se ejecuta solo si esta en develtoment sino no. 

const express = require('express');
const morgan = require('morgan')
const multer = require('multer');
const path = require('path');
const cors = require('cors');

//Inicialización.---------------------------
const app = express();
require('./database');

//configuraciones. ---------------------------
app.set('port', process.env.PORT || 3000)

//middlewares ----------------------------------
app.use(morgan('dev'));
const storage = multer.diskStorage({
  //ponemos el destino de donde queremos que vayan las imagenes 
  destination: path.join(__dirname,'public/uploads'),
  //indicamos cual es el nombre que queremos usar en cada imagen y cual extension (.jpg .png ect)
  filename(req,file,cb){
    cb(null, new Date().getTime() + path.extname(file.originalname));

  }
});
app.use(multer({storage}).single('image')); //single para q suba una sola imagen 
app.use(express.urlencoded({extended:false})); //nos ayuda a cuando nosotros tengamos un formulario desde el frontend vamos a poder intepretar los datos del formulario como si fuera un json
app.use(express.json());
app.use(cors());

//routes ---------------------------------------------
app.use('/api/books' ,require('./routes/books'));


//static files --------------------------------
app.use(express.static(path.join(__dirname, 'public')));


//Iniciar el sevidor. --------------------------
app.listen(app.get('port'), ()=>{
  console.log('Server on port', app.get('port'));
});