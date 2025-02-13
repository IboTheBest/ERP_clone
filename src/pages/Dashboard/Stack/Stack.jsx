import React from 'react'
import Caption from '../../../components/Caption'
import { CodeSandboxOutlined, EditFilled, MoreOutlined } from '@ant-design/icons'
import getRequest from "../../../service/getRequest"
import { Button, Card } from 'antd'
import { useNavigate } from 'react-router-dom'

function CardContent(navigate,id){
    return (
        <div className='flex items-center gap-5'>
            <Button onClick={() => navigate(`edit/${id}`)} className='!bg-green-600 w-full' type='primary'> <EditFilled className='text-[20px]'/> </Button>
            <Button onClick={() => navigate(`${id}`)} className='w-full' type='primary'> <MoreOutlined className='text-[20px]'/> </Button>
        </div>
    )
}

const Stack = () => {
    const stackList = getRequest("/stack")
    const navigate = useNavigate()

    return (
        <div className='p-5'>
            <Caption addLink={"add"} title={"Yo'nalishlar"} count={stackList.length} icon={<CodeSandboxOutlined />} />
            <ul className='flex mt-8 flex-wrap gap-5'>
                {stackList.map(item => (
                    <Card
                        className='w-[250px]'
                        key={item.id}
                        hoverable
                        cover={<img onClick={() => navigate(`${item.id}`)} className='h-[140px] object-cover' alt="example" src={item.image} />}
                    >
                        <Card.Meta title={item.name} description={CardContent(navigate, item.id)} />
                    </Card>
                ))}
            </ul>
        </div>
    )
}

export default Stack