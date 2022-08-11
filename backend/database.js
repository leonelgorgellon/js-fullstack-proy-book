const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true, //es para que no tire error mongo, es por configuracion. 
})
  //para ver si esta conectado o para ver si hay un error.
  .then(db => console.log('DB esta conectado'))
  .catch(err => console.error(err));

