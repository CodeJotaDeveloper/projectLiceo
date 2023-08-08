import { useState, useContext } from "react"
import Axios from 'axios';

import { Link } from "react-router-dom"
import { Context } from "../../../Context/Context"
import { BiLogOut } from "react-icons/bi"
import { BiUserCircle } from "react-icons/bi"
import { useHistory } from "react-router-dom"
import { ItemSidebar } from "./ItemSidebar"


import './User.css'


const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/auth/signout/'

export const User = () => {
    const { user, dispatch } = useContext(Context)

    /**
     * En la const user se guarda lo que esta en el Context
     * con el useEffect, podemos acceder a los datos de la sesión usuario.
     */
    const [email, setEmail] = useState("");



    const handleLogout = async () => {

        setEmail(user.email)
        dispatch({ type: "LOGOUT" })
        history.push('/')
    }
    const [profileOpen, setProfileOpen] = useState(false)
    const close = () => {
        setProfileOpen(false)
    }


    let history = useHistory();

    return (
        <>

            <div className='profile'>
                {user ? (

                    <>

                        <button className='profileImg' onClick={() => setProfileOpen(!profileOpen)}>
                            <div className="centerprofile">
                                <BiUserCircle className='iconProfile' />
                                <p className="profileName">{user.username}</p>
                            </div>
                        </button>
                        {profileOpen && (
                            <div className='openProfile boxItems' onClick={close}>
                                <Link to={'/account'}>
                                    <div className='image'>
                                        <BiUserCircle className='iconProfile' />
                                        <div className='profileName'>
                                            <h4>{user.username}</h4>
                                        </div>
                                    </div>
                                </Link>



                                {

                                    user.roles[0].permissions.map((item) => {
                                        if (item.has) {
                                            return <ItemSidebar label={item.name} path={item.path} icon={item.icon} />
                                        }
                                    })

                                }
                                <button className='box' onClick={handleLogout}>
                                    <BiLogOut className='icon' />
                                    {user && <h4>Salir</h4>}
                                </button>

                            </div>
                        )}
                    </>
                ) : (
                    <Link to='/login'>
                        <button>Mi Cuenta</button>
                    </Link>
                )}
            </div>
        </>
    )
}