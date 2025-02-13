import React, { useState } from 'react'
import {Logo} from "../../assets/icons"
import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import getToken from "../../hooks/getToken" 
import toast, { Toaster } from 'react-hot-toast'
import getRequest from '../../service/getRequest'

const Login = () => {
    const {setToken} = getToken()
    const [isLoading, setIsLoading] = useState(false)
    const allUsers = getRequest("/users")
    
    function handleSubmitLogin(data){
        setIsLoading(true)
        const isUser = allUsers.some(item => item.username == data.username && item.password == data.password)
        setTimeout(() => {
            if(isUser) toast.success("Xush kelibsiz " + data.username)
        }, 500)
        setTimeout(() => {
            if(isUser){
                setToken(data)
            }
            else{
                toast.error("Xatolik bor!")
            }
            setIsLoading(false)
        },1000)
    }   
  return (
    <div className='flex items-center justify-center h-[100vh]'>
        <Toaster position="top-center" reverseOrder={false}/>
        <div className='w-[360px] text-center mx-auto'>
            <div className='flex items-center justify-center gap-[10px] main-color mb-[25px]'>
                <Logo/>
                <span className='text-black text-[30px] font-medium'>Admin paneli</span>
            </div>
            <Form onFinish={handleSubmitLogin} className='w-full text-start' autoComplete='off' >
                <Form.Item name="username"
                    rules={[
                    {
                        required: true,
                        message: "Bo'sh qolmasligi kerak!",
                    },
                    ]}>
                    <Input size='large' prefix={<UserOutlined />} placeholder="Login" />
                </Form.Item>
                <Form.Item name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Parol kiritish majburiy!',
                    },
                    ]}>
                    <Input.Password size='large' prefix={<LockOutlined />} type="password" placeholder="Parol" />
                </Form.Item>
                <Button loading={isLoading} htmlType='submit' className='w-full' size='large' type='primary'>Kirish</Button>
            </Form>
        </div>
    </div>
  )
}

export default Login