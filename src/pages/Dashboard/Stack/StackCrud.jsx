import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import CrudCaption from '../../../components/CrudCaption'
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from 'antd'
import { Create, Edit } from '../../../service/auth'
import getRequest from '../../../service/getRequest'

const StackCrud = () => {
    const { stackId } = useParams()
    const updateStack = stackId && getRequest(`/stack/${stackId}`, true)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)

    function handleAddStack(e) {
        setIsLoading(true)
        e.preventDefault()
        const data = {name, image}
        if(stackId){
            data.id = stackId
            Edit(data, `/stack/${stackId}`, setIsLoading, navigate, toast)
        }
        else{
            Create(data, "/stack", setIsLoading, navigate, toast)
        }
    }

    // Update 
    useEffect(() => {
        if(updateStack){
           setName(updateStack.name)
           setImage(updateStack.image)
        }
    },[updateStack])
    return (
        <form onSubmit={handleAddStack} autoComplete='off' className='p-5'>
            <Toaster position="top-center" reverseOrder={false} />
            <CrudCaption id={stackId} isLoading={isLoading} title={`Yo'nalish ${stackId ? "tahrirlash" : "qo'shish"}`} />
            <div className='w-[500px] mx-auto mt-5 space-y-2'>
                <Input value={name} onChange={(e) => setName(e.target.value)} size='large' className='w-full' allowClear placeholder='Nomini kiriting'/>
                <Input value={image} onChange={(e) => setImage(e.target.value)} size='large' className='w-full' allowClear placeholder='Rasm linkini kiriting'/>
            </div>
        </form>
    )
}

export default StackCrud