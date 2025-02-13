import { UserAddOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useState } from 'react'
import CustomTable from './CustomTable'
import { getStudents } from '../service/getStudents'
import { useNavigate } from 'react-router-dom'
import {PATH} from "../hooks/path"
const StudentDash = ({ groupId, removeAddBtn }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [students, setStudents] = useState([])
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()

    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
        },
        {
            title: "O'quvchi ID",
            dataIndex: 'studentId',
        },
        {
            title: 'Ismi',
            dataIndex: 'name',
        },
        {
            title: 'Familiya',
            dataIndex: 'surname',
        },
        {
            title: 'Yoshi',
            dataIndex: 'age',
        },
        {
            title: 'Telefon raqam',
            dataIndex: 'phone',
        },
        {
            title: 'Holati',
            dataIndex: 'status',
        },
        {
            title: 'Batafsil',
            dataIndex: 'action',
        },
    ]
    // Search 
    function handleSearchByName(e) {
        setIsLoading(true)
        const filterByName = students.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.studentId.includes(e.target.value))
        if (e.target.value) {
            setTimeout(() => {
                setIsLoading(false)
                setStudents(filterByName)
            }, 1000)
        }
        else {
            setTimeout(() => {
                setIsLoading(false)
                setRefresh(!refresh)
            }, 1000)
        }
    }
    // Search Name start

    getStudents(groupId,refresh,setStudents)
    return (
        <>
            <div className='my-5 flex justify-between'>
                <Input onChange={handleSearchByName} size='large' className='!w-[350px]' placeholder='Qidirish...' />
                {!removeAddBtn && <Button onClick={() => navigate(`${PATH.studentsAdd}`)} icon={<UserAddOutlined />} size='large' type='primary'>O'quvchi qo'shish</Button>}
            </div>
            <CustomTable isLoading={isLoading} columns={columns} data={students} />
        </>
    )
}

export default StudentDash