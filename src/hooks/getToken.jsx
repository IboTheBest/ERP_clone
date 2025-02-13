import { useContext } from 'react'
import {Context} from "../context/context"

const getToken = () => {
    const {token, setToken, hideMenu, setHideMenu} = useContext(Context)

    return {token, setToken, hideMenu, setHideMenu}
}

export default getToken