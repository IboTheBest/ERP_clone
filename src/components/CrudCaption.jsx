import { ArrowLeftOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CrudCaption = ({title, isLoading, id}) => {
    const navigate = useNavigate()
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-5'>
                <button className='cursor-pointer' type='button' onClick={() => navigate(-1)}> <ArrowLeftOutlined className='text-[25px]' /> </button>
                <h2 className='font-bold text-[25px]'>{title}</h2>
            </div>
            <Button loading={isLoading} htmlType='submit' icon={<PlusCircleOutlined/>} type='primary' size='large'>{id ? "Tahrirlash" :"Qo'shish"} </Button>
        </div>
    )
}

export default CrudCaption