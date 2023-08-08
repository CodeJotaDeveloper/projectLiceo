import { Promise } from "mongoose";
import Estados from "../models/Estados";
import Root from "../models/Root";
import Role from "../models/Role";

export const createRoles = async () => {

    try {
        const contadorRoles = await Role.estimatedDocumentCount()
        if (contadorRoles > 0) return;

        const values = await Promise.all([ //Ejecuta todas las promesas al mismo tiempo.
            new Role({
                name: 'Administrador',
                permissions: [
                    { name: 'Crear Noticias', has: true, path: '/write', icon: 'newspaper' },
                    { name: 'Crear Circulares', has: true, path: '/circulares', icon: 'assignment' },
                    { name: 'Crear Eventos', has: true, path: '/events', icon: 'event_note' },
                    { name: 'Consultar Asistencia', has: true, path: '/listControl', icon: 'data_info_alert' },
                    { name: 'Consultar prematricula', has: true, path: '/consultPrematricula', icon: 'recent_actors' },
                    { name: 'Control de asistencia', has: false, path: '/control', icon: 'report' },
                    { name: 'Lista de Contactos', has: true, path: '/listContacts', icon: 'patient_list' },
                    { name: 'Lista de Prematrícula', has: true, path: '/listPrematricula', icon: 'view_list' },
                    { name: 'Lista de usuarios', has: false, path: '/listUsers', icon: 'recent_actors' },
                    { name: 'Prematrícula', has: true, path: '/prematricula', icon: 'group_add' },


                ]
            }).save(),
            new Role({
                name: 'Encargado Legal',
                permissions: [
                    { name: 'Crear Noticias', has: false, path: '/write', icon: 'newspaper' },
                    { name: 'Crear Eventos', has: false, path: '/events', icon: 'event_note' },
                    { name: 'Crear Circulares', has: false, path: '/circulares', icon: 'assignment' },
                    { name: 'Control de asistencia', has: false, path: '/control', icon: 'report' },
                    { name: 'Consultar prematricula', has: true, path: '/consultPrematricula', icon: 'recent_actors' },

                    { name: 'Consultar Asistencia', has: true, path: '/listControl', icon: 'data_info_alert' },
                    { name: 'Lista de Contactos', has: false, path: '/listContacts', icon: 'patient_list' },
                    { name: 'Lista de Prematrícula', has: false, path: '/listPrematricula', icon: 'view_list' },
                    { name: 'Lista de usuarios', has: false, path: '/listUsers', icon: 'recent_actors' },
                    { name: 'Prematrícula', has: true, path: '/prematricula', icon: 'group_add' },

                ]

            }).save(),
            new Role({
                name: 'Estudiante',
                permissions: [
                    { name: 'Crear Noticias', has: false, path: '/write', icon: 'newspaper' },
                    { name: 'Crear Eventos', has: false, path: '/events', icon: 'event_note' },
                    { name: 'Crear Circulares', has: false, path: '/circulares', icon: 'assignment' },
                    { name: 'Consultar Asistencia', has: true, path: '/listControl', icon: 'data_info_alert' },
                    { name: 'Consultar prematricula', has: false, path: '/consultPrematricula', icon: 'recent_actors' },

                    { name: 'Lista de Contactos', has: false, path: '/listContacts', icon: 'patient_list' },
                    { name: 'Lista de Prematrícula', has: false, path: '/listPrematricula', icon: 'view_list' },
                    { name: 'Lista de usuarios', has: false, path: '/listUsers', icon: 'recent_actors' },
                    { name: 'Control de asistencia', has: false, path: '/control', icon: 'report' },
                    { name: 'Prematrícula', has: false, path: '/prematricula', icon: 'group_add' },

                ]
            }).save(),
            new Role({
                name: 'Profesor',
                permissions: [
                    { name: 'Crear Noticias', has: false, path: '/write', icon: 'newspaper' },
                    { name: 'Crear Eventos', has: false, path: '/events', icon: 'event_note' },
                    { name: 'Crear Circulares', has: false, path: '/circulares', icon: 'assignment' },
                    { name: 'Consultar Asistencia', has: false, path: '/listControl', icon: 'data_info_alert' },
                    { name: 'Consultar prematricula', has: true, path: '/consultPrematricula', icon: 'recent_actors' },
                    { name: 'Lista de Contactos', has: false, path: '/listContacts', icon: 'patient_list' },
                    { name: 'Lista de Prematrícula', has: false, path: '/listPrematricula', icon: 'view_list' },
                    { name: 'Lista de usuarios', has: false, path: '/listUsers', icon: 'recent_actors' },
                    { name: 'Control de asistencia', has: true, path: '/control', icon: 'report' },
                    { name: 'Prematrícula', has: true, path: '/prematricula', icon: 'group_add' },


                ]

            }).save(),
            new Role({
                name: 'Root', permissions: [
                    { name: 'Crear Noticias', has: true, path: '/write', icon: 'newspaper' },
                    { name: 'Crear Eventos', has: true, path: '/events', icon: 'event_note' },
                    { name: 'Crear Circulares', has: true, path: '/circulares', icon: 'assignment' },
                    { name: 'Control de asistencia', has: true, path: '/control', icon: 'report' },
                    { name: 'Consultar Asistencia', has: false, path: '/listControl', icon: 'data_info_alert' },// El usuario root no puede consultar la asistencia de otros estudiante.
                    { name: 'Consultar prematricula', has: true, path: '/consultPrematricula', icon: 'recent_actors' },
                    { name: 'Lista de Contactos', has: true, path: '/listContacts', icon: 'patient_list' },
                    { name: 'Lista de Prematrícula', has: true, path: '/listPrematricula', icon: 'view_list' },
                    { name: 'Lista de usuarios', has: true, path: '/listUsers', icon: 'recent_actors' },
                    { name: 'Prematrícula', has: true, path: '/prematricula', icon: 'group_add' },

                ]
            }).save(),

        ]);

        console.log(values);
    } catch (error) {
        console.error(error)
    }
};

export const createEstado = async () => { //Cambiar el nombre de este metodo a createState

    try {
        const contadorEstados = await Estados.estimatedDocumentCount()
        if (contadorEstados > 0) return;

        const values = await Promise.all([ //Ejecuta todas las promesas al mismo tiempo.
            new Estados({ estado: 'Creado' }).save(),
            new Estados({ estado: 'Completado' }).save(),
            new Estados({ estado: 'Pendiente' }).save(),
            new Estados({ estado: 'Rechazado' }).save(),
        ]);

        console.log(values);
    } catch (error) {
        console.error(error)
    }
};


export const createRoot = async () => {

    try {

        const contadorRoot = await Root.estimatedDocumentCount()
        if (contadorRoot > 0) return;

        const values = await Promise.all([ //Ejecuta todas las promesas al mismo tiempo.
            new Root({ email: 'jota@mep.go.cr' }).save()
        ]);

        console.log(values);
    } catch (error) {
        console.error(error)
    }
};