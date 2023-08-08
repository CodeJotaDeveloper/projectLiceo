import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
const path = require("path");
const bodyParser = require('body-parser');


import { createRoles, createEstado, createRoot } from './libs/initialsSetup'

import contactsRoutes from './routes/contacts.routes'// Importar ruta de contacto
import newPostRoutes from './routes/newPost.routes'// Importar ruta de contacto
import prematricula from './routes/prematricula.routes'// Importar ruta de prematricula
import authRoutes from './routes/auth.routes'
import userRoutes from "./routes/root.routes";
import eventRoutes from "./routes/events.routes"
import account from './routes/account.routes'
import circulares from './routes/circulares.routes'
import root from './routes/root.routes'
import estado from './routes/estado.routes'
import user from './routes/user.routes'
import reset from './routes/resetpassword.routes'
import teacherattendance from './routes/teacherAttendance.routes';

const app = express();

app.set("view engine", "ejs");

//Setting o configuraciones
app.set('port', process.env.PORT || process.env.APP_PORT);

//Acciones para poder crear data en mongo necesaria para futuros
createRoles();
createEstado();
createRoot();
const cors = require('cors');

//middlewares
app.set('pkg', pkg);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());// Para que se entienda datos en formato JSON es para poderlo leer o mostrar en este formato
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })

})

//Rutas a crear
app.use('/api/contacts/', contactsRoutes); //Importar ruta de contactos
app.use('/api/newPost', newPostRoutes); //Importar ruta de crear Post
app.use('/api/prematricula', prematricula); //Importar ruta de crear prematricula
app.use('/api/eventos', eventRoutes);
app.use('/api/account', account);
app.use('/api/circulares', circulares);
app.use('/api/root', root);// Rutas para el root
app.use('/api/auth/', authRoutes); //Importar ruta de crear usuario
app.use('/api/users', userRoutes);
app.use('/api/estado', estado)
app.use('/api/user', user)
app.use('/api/reset', reset)
app.use('/api/teacherattendance', teacherattendance)


//Static archivos
app.use(express.static(path.join(__dirname, 'public')));//carpetas que puede acceder desde el navegador


//Control de error del back-end en rutas
app.use((req, res, next) => {
  return res.status(404).json({ message: "Error 404" });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: "Error 404", Error: error });
});
export default app;