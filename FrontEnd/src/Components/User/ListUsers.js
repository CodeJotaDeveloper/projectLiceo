import React, { useState, useEffect, useContext } from "react"
import { Context } from '../../Context/Context'
import Axios from "axios"
import DataTable from 'react-data-table-component';
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import 'styled-components'

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/users'

export const ListUsers = () => {

    const { user } = useContext(Context)


    const [users, setUsers] = useState([])
    const [search, setSearch] = useState([])
    const [filter, setFilter] = useState('')
    const [username, setUsername] = useState('')

    useEffect(() => {

        const getData = async () => {
            const res = await Axios.get(url, {
                headers: {
                    'x-access-token': `${user.token}`
                }
            })
            setUsers(res.data.data)
            setSearch(res.data.data)
            setUsername(res.data.data)
        }
        getData()
    }, [])

    const columns = [
        {
            name: "Actualizar",
            selector: row => <Link to={`/statusrol/${row.id}`}>
                <button> <BiEdit /> </button>
            </Link>,
        },

        {
            name: "Nombre Usuario",
            selector: row => row.username,
            sortable: true
        },
        {
            name: "Correo",
            selector: row => row.email,
            sortable: true
        },
        {
            name: "Rol",
            selector: row => row.roles + ' ',
            sortable: true
        },
    ]

    const handleFilter = (e) => {
        if (e.target.value === '') {
            setUsers(search)
        } else {
            const filterResult = search.filter(item => item.username.toLowerCase().includes(e.target.value.toLowerCase()) || item.email.toLowerCase().includes(e.target.value.toLowerCase()))
            setUsers(filterResult)
        }
        setFilter(e.target.value)
    }


    return (
        <div className='boxTable'>
            <h1 className="textTable">Lista de Usuarios</h1>
            <div className="boxButtons">
                <input className="filter" placeholder="Buscar...."
                    value={filter}
                    onInput={(e) => handleFilter(e)}
                />
            </div>
            <div>
                <DataTable
                    columns={columns}
                    data={users}
                    fixedHeaderScrollHeight
                    pagination
                    selectableRows
                    selectableRowsHighlight
                    highlightOnHover
                ></DataTable>
            </div>
        </div>
    )
}
