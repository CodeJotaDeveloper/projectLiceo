import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios"
import DataTable from 'react-data-table-component';

import { Context } from '../../Context/Context';
import 'styled-components'

/**
 * 
 * @returns 
 * 
 * 
 *  Este metodo solo el encargado legal lo puede usar, para consultar la asistencia
 * del estudiante que tiene matrículados.
 * 
 * 
 */



export const ListControl = () => {

    const { user } = useContext(Context)


    const [arrayStudent, setArrayStudent] = useState([]);

    const dataFetchedRef = useRef(false);

    const obtenerEstudiantesDelEncargado = async (Cedula_Encargado) => {
        try {
            const estudiantes = (await axios.get('' + Cedula_Encargado + '/dependantStudents',

                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                })).data.data;


            return estudiantes;
        } catch (error) {
            console.log(error);
            return [];
        }


    }

    const obtenerAusenciasDelEstudiante = async (Cedula_Student) => {

        var urlAusencias = ``
        try {
            const ausencias = (await axios.get(urlAusencias)).data;
            return ausencias
        } catch (error) {
            console.error(error);
        }
    }



    const columns = [

        {
            name: "Grupo",
            selector: row => row.group,
            sortable: true
        },
        {
            name: "Asignatura",
            selector: row => row.subject,
            sortable: true
        },
        {
            name: "Fecha",
            selector: row => row.date,
            sortable: true
        },
        {
            name: "Tipo de ausencia",
            selector: row => row.type,
            sortable: true
        },
        {
            name: "Cantidad de ausencias",
            selector: row => row.amount,
            sortable: true
        }
    ]


    const init = async () => {
        setArrayStudent([])
        const estudiantesTemproral = await obtenerEstudiantesDelEncargado(user.cedula)
        console.log(estudiantesTemproral)


        // let arreglo = [];

        estudiantesTemproral.forEach(async (estudiante, index) => {
            console.log(estudiante)
            const ausenciasTemporal = await (obtenerAusenciasDelEstudiante(estudiante.id))
            console.log('Ausencias ' + index)
            const nuevoEstudiante = {
                id: estudiante.id, name: estudiante.name, ausencias: ausenciasTemporal.data
            }
            setArrayStudent(previo => [...previo, nuevoEstudiante])

        });

    }

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        init()


    }, [])


    return (
        <div className="contentConsult">
            <h1 className="titleConsult">Consultar Asistencia del Estudiante</h1>
            <div style={{ width: '100%' }}>
                {
                    arrayStudent.map((estudiante, key) => {
                        return (
                            <div key={key}>
                                <div className="Students" >

                                    <p >{estudiante.id}</p>
                                    <h1 className="titleStudent">Estudiante: {estudiante.name}</h1>
                                    <h2 className="titleStudent">Cédula: {estudiante.id}</h2>

                                </div>
                                <div>
                                    {
                                        Object.entries(estudiante.ausencias).length !== 0 ?

                                            <DataTable
                                                columns={columns}
                                                data={estudiante.ausencias}
                                                fixedHeaderScrollHeight
                                                pagination
                                            ></DataTable>
                                            :
                                            <p>Sin ausencia</p>
                                    }
                                </div>
                            </div>
                        )
                    })}
            </div>


        </div>
    )

}