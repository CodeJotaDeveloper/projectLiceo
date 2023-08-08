import mongoose from 'mongoose'

mongoose.set('strictQuery', false);
const { DB_HOST, DB_NAME } = process.env; //EXPORTAMOS LAS VARIABLES DE ENTORNO
const ruta_URL = `mongodb://${DB_HOST}/${DB_NAME}`;

mongoose.connect(ruta_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: true
    //useCreateIndex: true
})
    .then(db => console.log("Db is connected"))
    .catch(error => console.log(error))  