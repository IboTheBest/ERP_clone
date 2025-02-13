import { useEffect, useState } from 'react'
import { instance } from '../hooks/instance'

const getRequest = (api, isObj) => {
    const [data, setData] = useState(isObj ? {} : [])

    useEffect(() => {
        instance().get(api).then(res => setData(res.data))
    }, [])

    return data
}

export default getRequest